// features/inventory/hooks/useMedicineBatches.ts
import { useState, useMemo } from "react";
import type { BatchRow } from "../AddMedicine/BatchTable";

export const initialBatchesState: BatchRow[] = [
  {
    id: "initial-batch-1",
    batchNumber: "B-00000-X",
    quantity: 1,
    expiryDate: "yyyy-dd-mm",
  },
];

export const useMedicineBatches = () => {
  const [batches, setBatches] = useState<BatchRow[]>(initialBatchesState);

  const addNewBatchRow = () => {
    const uniqueId = `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const defaultBatchNumber = "B-00000-X";

    setBatches((prev) => [
      ...prev,
      {
        id: uniqueId,
        batchNumber: defaultBatchNumber,
        quantity: "",
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