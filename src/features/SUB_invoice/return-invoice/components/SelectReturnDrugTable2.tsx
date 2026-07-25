import { Add, Remove } from "@mui/icons-material";
import {
  Typography,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Checkbox,
  Box,
  Table,
} from "@mui/material";
import React from "react";

interface Props {
  items: any[];
  onToggleCheck: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}
const SelectReturnDrugTable2: React.FC<Props> = ({
  items,
  onToggleCheck,
  onUpdateQuantity,
}) => {
  return (
    <Box sx={{ width: "100%", direction: "rtl" }}>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", borderRadius: 2, border: "1px solid #e2e8f0" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f8fafc" }}>
            <TableRow>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "#64748b" }}
              >
                اسم الدواء
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#64748b" }}
              >
                نوع الوحدة
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#64748b" }}
              >
                السعر الفردي
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#64748b" }}
              >
                الكمية
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#64748b" }}
              >
                السعر الإجمالي
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#64748b" }}
              >
                السعر بعد الخصم
              </TableCell>
              <TableCell align="center" width={50}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              const totalPrice = item.unitPrice * item.quantity;
              const priceAfterDiscount = totalPrice * (1 - item.discountRate);

              return (
                <TableRow key={item.id} hover>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "600", color: "#334155" }}
                  >
                    {item.name}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        px: 1,
                        py: 0.5,
                        bgcolor: "#f1f5f9",
                        borderRadius: 1,
                        display: "inline-block",
                        fontSize: "0.85rem",
                      }}
                    >
                      {item.unitType}
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "500" }}>
                    {item.unitPrice.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        sx={{
                          border: "1px solid #fca5a5",
                          color: "#ef4444",
                          borderRadius: 1,
                          p: 0.5,
                        }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{ mx: 1, fontWeight: "bold", minWidth: 20 }}
                      >
                        {item.quantity.toString().padStart(2, "0")}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        sx={{
                          border: "1px solid #fca5a5",
                          color: "#ef4444",
                          borderRadius: 1,
                          p: 0.5,
                        }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#dc2626" }}
                  >
                    {totalPrice.toLocaleString()}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#dc2626" }}
                  >
                    {priceAfterDiscount.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={item.checked}
                      onChange={() => onToggleCheck(item.id)}
                      sx={{
                        color: "#cbd5e1",
                        "&.Mui-checked": { color: "#e11d48" },
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SelectReturnDrugTable2;
