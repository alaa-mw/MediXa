import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";

interface ReturnsProps {
  returns: any[];
}

const InvoiceReturnsTable: React.FC<ReturnsProps> = ({ returns }) => {
  if (!returns || returns.length === 0) return null;

  <Box
    sx={{
      border: "1px solid #1f5fb3",
      borderRadius: 2,
      overflow: "hidden",
    }}
  >
    hello
  </Box>;
};

export default InvoiceReturnsTable;
