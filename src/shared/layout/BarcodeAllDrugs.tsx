import React, { useEffect, useState } from "react";
import { useBarcodeScanner } from "../services/useBarcodeScanner";
import useGetItem from "../hooks/useGetItem";
import { BarcodeReader } from "@mui/icons-material";
import { useSnackbar } from "../providers/useSnackbar";
import { set } from "date-fns";

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
  } | null ;

  generalDrug: {
    generalDrugId: string;
    drugId: string;
    tradeName: string;
    barcode: string;
  } | null;
}

interface SentResult {
  id: string;
  tradeName: string;
  type: "GENERAL" | "PHARMACY";
}

const BarcodeAllDrugs = ({
  onFindResult,
}: {
  onFindResult: (result: SentResult) => void;
}) => {
  const { showSnackbar } = useSnackbar();
  const [scannedCode, setScannedCode] = React.useState<string | undefined>(
    undefined,
  );

  const { data, error,isSuccess, isFetching } = useGetItem<DrugResult>(
    `/pharmacy-drugs/search-in-stock-and-cdb/by-barcode/${scannedCode}`,
    scannedCode,
    {
      retries: 1,
    },
  );

  useBarcodeScanner({
      onScan: (code) => {
        console.log("تم تلقي الباركود من القارئ الإلكتروني:", code);
        // 💡 لتفعيل إعادة المسح بنفس الكود، نُصفر القيمة لحظياً أولاً ثم نضع الكود الجديد
        setScannedCode(undefined);
        setTimeout(() => {
          setScannedCode(code);
        }, 50);
      },
    });

    useEffect(() => {
    // Don't do anything while there is no barcode
    if (!scannedCode) {
      return;
    }

    // VERY IMPORTANT:
    // Don't process data before the request finishes
    if (isFetching) {
      return;
    }
    // Request hasn't succeeded yet
    if (!isSuccess) {
      return;
    }

    console.log("API response:", data);

    const pharmacyDrug = data?.data?.pharmacyDrug;
    const generalDrug = data?.data?.generalDrug;

    if (pharmacyDrug) {
      const result: SentResult = {
        id: pharmacyDrug.pharmacyDrugId,
        tradeName: pharmacyDrug.tradeName,
        type: "PHARMACY",
      };

      console.log("Pharmacy result:", result);

      onFindResult(result);
      setScannedCode(undefined);

      return;
    }

    if (generalDrug) {
      const result: SentResult = {
        id: generalDrug.generalDrugId,
        tradeName: generalDrug.tradeName,
        type: "GENERAL",
      };

      console.log("General result:", result);

      onFindResult(result);
      setScannedCode(undefined);

      return;
    }

    // Request succeeded but both are null
    console.log("No drug found");

    showSnackbar(
      "لم يتم العثور على دواء مطابق للباركود الممسوح",
      "error",
    );

    setScannedCode(undefined);

  }, [
    data,
    scannedCode,
    isSuccess,
    isFetching,
    onFindResult,
    showSnackbar,
  ]);

  useEffect(() => {
      if (error && scannedCode) {
        showSnackbar("لم يتم العثور على دواء مطابق للباركود الممسوح", "error");
        setScannedCode(undefined); // 💡 إعادة الضبط عند الخطأ أيضاً
      }
  }, [error, scannedCode]);


  return (
    <>
      <BarcodeReader
        sx={{ color: "#1e2524", fontSize: 30, cursor: "pointer" }}
      />
    </>
  );
};

export default BarcodeAllDrugs;
