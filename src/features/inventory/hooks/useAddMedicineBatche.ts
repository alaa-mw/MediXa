// features/inventory/hooks/useMedicineBatches.ts
import { useState, useMemo } from "react";
import type { BatchRow } from "../types/batchRow";

export const initialBatchesState: BatchRow[] = [
  {
    id: "initial-batch-1",
    quantity: 1,
    receivingDate: "yyyy-mm-dd", // القيمة الابتدائية لتاريخ الاستلام
    expiryDate: "yyyy-mm-dd",
  },
];

export const useMedicineBatches = () => {
  const [batches, setBatches] = useState<BatchRow[]>(initialBatchesState);

  const addNewBatchRow = () => {
    const uniqueId = `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    setBatches((prev) => [
      ...prev,
      {
        id: uniqueId,
        quantity: "",
        receivingDate: "",
        expiryDate: "",
      },
    ]);
  };

  const deleteBatchRow = (id: string) => {
    if (batches.length === 1) return;
    setBatches((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBatchField = (id: string, field: keyof BatchRow, value: string | number) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const totalQuantity = useMemo(() => {
    return batches.reduce((sum, b) => sum + Number(b.quantity || 0), 0);
  }, [batches]);

  const resetBatches = () => setBatches(initialBatchesState);

  return {
    batches,
    addNewBatchRow,
    deleteBatchRow,
    updateBatchField,
    totalQuantity,
    resetBatches,
  };
};