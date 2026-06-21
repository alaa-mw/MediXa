// features/inventory/components/BatchesTable.tsx
import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// features/inventory/types/inventory.types.ts
export interface BatchRow {
  id: string;
  batchNumber: string;
  quantity: number | string;
  expiryDate: string;
}
interface BatchesTableProps {
  batches: BatchRow[];
  onUpdateField: (
    id: string,
    field: keyof BatchRow,
    value: string | number,
  ) => void;
  onDeleteRow: (id: string) => void;
}

export const BatchesTable: React.FC<BatchesTableProps> = ({
  batches,
  onUpdateField,
  onDeleteRow,
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#f8fafc" }}>
          <TableRow>
            <TableCell align="center">رقم التشغيلة (Batch)</TableCell>
            <TableCell align="center">الكمية (علبة)</TableCell>
            <TableCell align="center">تاريخ الانتهاء</TableCell>
            <TableCell align="center">الإجراءات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batches.map((batch) => (
            <TableRow
              key={batch.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { backgroundColor: "#f8fafc" },
              }}
            >
              <TableCell align="center" sx={{ py: 1 }}>
                <TextField
                  size="small"
                  value={batch.batchNumber}
                  onChange={(e) =>
                    onUpdateField(batch.id, "batchNumber", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#ffffff",
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#cbd5e1" },
                    },
                    width: "150px",
                  }}
                />
              </TableCell>
              <TableCell align="center" sx={{ py: 1 }}>
                <TextField
                  size="small"
                  type="number"
                  placeholder="0"
                  value={batch.quantity}
                  onChange={(e) =>
                    onUpdateField(batch.id, "quantity", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#ffffff",
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#cbd5e1" },
                    },
                    width: "100px",
                  }}
                />
              </TableCell>
              <TableCell align="center" sx={{ py: 1 }}>
                <TextField
                  size="small"
                  type="date"
                  value={batch.expiryDate}
                  onChange={(e) =>
                    onUpdateField(batch.id, "expiryDate", e.target.value)
                  }
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#ffffff",
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#cbd5e1" },
                    },
                    width: "160px",
                  }}
                />
              </TableCell>
              <TableCell align="center" sx={{ py: 1 }}>
                <IconButton
                  onClick={() => onDeleteRow(batch.id)}
                  disabled={batches.length === 1}
                  sx={{
                    color: "#ef4444",
                    backgroundColor: "#fef2f2",
                    "&:hover": { backgroundColor: "#fee2e2" },
                    p: 1,
                    borderRadius: "10px",
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
