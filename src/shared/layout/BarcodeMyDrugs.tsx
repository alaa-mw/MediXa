import React, { useEffect } from "react";
import { useBarcodeScanner } from "../services/useBarcodeScanner";
import useGetItem from "../hooks/useGetItem";
import { BarcodeReader } from "@mui/icons-material";
import { useSnackbar } from "../providers/useSnackbar";

interface DrugResult {
  pharmacyDrugId: string;
  tradeName: string;
}

interface sentResult {
  id: string;
  tradeName: string;
}

const BarcodeMyDrugs = ({
  onFindResult,
}: {
  onFindResult: (result: sentResult) => void;
}) => {
  const { showSnackbar } = useSnackbar();
  const [scannedCode, setScannedCode] = React.useState<string | undefined>(
    undefined,
  );
  const lastScannedCodeRef = React.useRef<string | undefined>(undefined);

  const { data, error , } = useGetItem<DrugResult>(
    `/pharmacy-drugs/get-my-drug-by-barcode/${scannedCode}`,
    scannedCode,
    {
      retries: 1,
    }
  );
  useBarcodeScanner({
    onScan: (code) => {
      console.log("تم تلقي الباركود من القارئ الإلكتروني:", code);
      setScannedCode(code);
    },
  });

  useEffect(() => {
    console.log(lastScannedCodeRef.current, scannedCode);
    let result: sentResult | undefined = undefined;
    if (data?.data) {
      result = {
        id: data.data.pharmacyDrugId,
        tradeName: data.data.tradeName,
      };
    }
    if (result ) {
        onFindResult(result);
        // lastScannedCodeRef.current = scannedCode;
    }
  }, [scannedCode, data]);

  useEffect(() => {
    console.log(error, scannedCode);
    if (error) {
      showSnackbar("لم يتم العثور على دواء مطابق للباركود الممسوح", "error");
    //   lastScannedCodeRef.current = scannedCode;
    }
  }, [error]);

  return (
    <>
      <BarcodeReader
        sx={{
          color: "#1e2524",
          fontSize: 26,
          cursor: "pointer",
          marginTop: "4px",
          mx: 1,
        }}
      />
    </>
  );
};

export default BarcodeMyDrugs;
