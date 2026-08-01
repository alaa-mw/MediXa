import {
  Box,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { CriticalStockItem } from "../../types/analysisInventory.types";
import AnalysisPanel from "./AnalysisPanel";

type CriticalStockCardProps = {
  title: string;
  rows: CriticalStockItem[];
};

const statusStyles = {
  danger: {
    color: "#CF424E",
    backgroundColor: "#FFF1F3",
  },
  warning: {
    color: "#9C7A2C",
    backgroundColor: "#FFF8E8",
  },
};

const CriticalStockCard = ({ title, rows }: CriticalStockCardProps) => {
  return (
    <AnalysisPanel title={title}>
      <Table size="small" sx={{ minWidth: 360 }}>
        <TableHead>
          <TableRow>
            <TableCell align="right">اسم الدواء</TableCell>
            <TableCell align="right">الكمية الحالية</TableCell>
            <TableCell align="right">الحد الأدنى</TableCell>
            <TableCell align="right">الحالة</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow key={item.id}>
              <TableCell align="right">
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#283850" }}
                >
                  {item.medicineName}
                </Typography>
              </TableCell>
              <TableCell align="right">{item.currentQuantity}</TableCell>
              <TableCell align="right">{item.minimumThreshold}</TableCell>
              <TableCell align="right">
                <Chip
                  size="small"
                  label={item.status}
                  sx={{
                    fontWeight: 700,
                    ...statusStyles[item.statusTone],
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 1.25, justifyContent: "flex-end", flexWrap: "wrap" }}
      >
        <Box
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: 12,
            fontWeight: 700,
            color: "#9C7A2C",
            backgroundColor: "#FFF8E8",
          }}
        >
          منخفض
        </Box>
        <Box
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: 12,
            fontWeight: 700,
            color: "#CF424E",
            backgroundColor: "#FFF1F3",
          }}
        >
          نفذ
        </Box>
      </Stack>
    </AnalysisPanel>
  );
};

export default CriticalStockCard;
