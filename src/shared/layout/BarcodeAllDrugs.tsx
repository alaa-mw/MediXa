import React, { useEffect } from "react";
import { useBarcodeScanner } from "../services/useBarcodeScanner";
import useGetItem from "../hooks/useGetItem";
import { BarcodeReader } from "@mui/icons-material";
import { useSnackbar } from "../providers/useSnackbar";

interface DrugResult {
  pharmacyDrug: {
    pharmacyDrugId: string;
    drugId: string;
    source: "GENERAL" | "PRIVATE";
    sourceDrugId: string;
    tradeName: string;
    barcode: string;
    unitsPerBox: number;
    availableQuantity: number;
    availableBoxCount: number;
  };
  generalDrug: {
    generalDrugId: string;
    drugId: string;
    tradeName: string;
    barcode: string;
  };
}

interface sentResult {
  id: string;
  tradeName: string;
  type: "GENERAL" | "PHARMACY";
}

const BarcodeAllDrugs = ({
  onFindResult,
}: {
  onFindResult: (result: sentResult) => void;
}) => {
  const { showSnackbar } = useSnackbar();
  const [scannedCode, setScannedCode] = React.useState<string | undefined>(
    undefined,
  );
  const lastScannedCodeRef = React.useRef<string | undefined>(undefined);

  const { data } = useGetItem<DrugResult>(
    `/pharmacy-drugs/search-in-stock-and-cdb/by-barcode/${scannedCode}`,
    scannedCode,
    {
      retries: 1,
    },
  );
  useBarcodeScanner({
    onScan: (code) => {
      console.log("تم تلقي الباركود من القارئ الإلكتروني:", code);
      setScannedCode(code);
    },
  });

  useEffect(() => {
    let result: sentResult | undefined = undefined;
    if (data?.data.pharmacyDrug) {
      result = {
        id: data.data.pharmacyDrug.pharmacyDrugId,
        tradeName: data.data.pharmacyDrug.tradeName,
        type: "PHARMACY" as sentResult["type"],
      };
    } else if (data?.data.generalDrug) {
      result = {
        id: data.data.generalDrug.generalDrugId,
        tradeName: data.data.generalDrug.tradeName,
        type: "GENERAL" as sentResult["type"],
      };
    }

    if (result) {
      // add a check to avoid multiple calls to onFindResult if the scannedCode hasn't changed
      if (lastScannedCodeRef.current !== scannedCode) {
        onFindResult(result);
        lastScannedCodeRef.current = scannedCode;
      }
    } else if (scannedCode && !result) {
      lastScannedCodeRef.current = scannedCode;
      showSnackbar("لم يتم العثور على دواء مطابق للباركود الممسوح", "error");
    }
  }, [scannedCode]);

  return (
    <>
      <BarcodeReader
        sx={{ color: "#1e2524", fontSize: 30, cursor: "pointer" }}
      />
    </>
  );
};

export default BarcodeAllDrugs;
