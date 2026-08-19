import React, { useEffect } from "react";
import { useBarcodeScanner } from "../services/useBarcodeScanner";
import useGetItem from "../hooks/useGetItem";
import { BarcodeReader } from "@mui/icons-material";
import { useSnackbar } from "../providers/useSnackbar";

export interface CentralDosageForm {
  dosageFormId: number;
  dosageFormName: string;
  formCategory: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CentralIngredientDetail {
  ingredientId: number;
  ingredientName: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CentralIngredient {
  drugIngredientId: number;
  ingredientId: number;
  generalDrugId: number;
  strengthValue: string;
  unit: string;
  createdAt?: string;
  updatedAt?: string;
  ingredient: CentralIngredientDetail;
}

export interface CentralCategoryDetail {
  categoryId: number;
  categoryName: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CentralCategory {
  uniqueId: number;
  generalDrugId: number;
  categoryId: number;
  createdAt?: string;
  category: CentralCategoryDetail;
}

export interface CentralDrugData {
  generalDrugId: number;
  drugId: number;
  dosageFormId: number;
  tradeName: string;
  barcode: string;
  unitsPerBox: number;
  netPrice: string;
  consumerPrice: string;
  isRx: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  dosageForm?: CentralDosageForm;
  ingredients?: CentralIngredient[];
  categories?: CentralCategory[];
}

interface BarcodeCentralDatabaseProps {
  onFindResult: (result: CentralDrugData) => void;
  onNotFound?: (barcode: string) => void;
}

export const BarcodeCentralDatabase: React.FC<BarcodeCentralDatabaseProps> = ({
  onFindResult,
  onNotFound,
}) => {
  const { showSnackbar } = useSnackbar();
  const [scannedCode, setScannedCode] = React.useState<string | undefined>(
    undefined
  );

  const { data, error } = useGetItem<CentralDrugData>(
    `/general-drugs/barcode/${scannedCode}`,
    scannedCode,
    {
      retries: 1,
    }
  );

  useBarcodeScanner({
    onScan: (code) => {
      console.log("تم تلقي الباركود:", code);
      setScannedCode(undefined);
      setTimeout(() => {
        setScannedCode(code);
      }, 50);
    },
  });

  // 🟢 عند العثور على الدواء بالباركود
  useEffect(() => {
    if (data?.data && scannedCode) {
      onFindResult(data.data);
      setScannedCode(undefined);
    }
  }, [data, scannedCode, onFindResult]);

  // 🔴 عند عدم العثور عليه بالباركود
  useEffect(() => {
    if (error && scannedCode) {
      showSnackbar("لم يتم العثور على دواء مطابق للباركود الممسوح", "error");
      if (onNotFound) {
        onNotFound(scannedCode);
      }
      setScannedCode(undefined);
    }
  }, [error, scannedCode, showSnackbar, onNotFound]);

  return (
    <BarcodeReader
      sx={{
        color: "#1e2524",
        fontSize: 26,
        cursor: "pointer",
        marginTop: "4px",
        mx: 1,
      }}
    />
  );
};

export default BarcodeCentralDatabase;