import {
  Box,
  Checkbox,
  IconButton,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { format } from "date-fns";

interface Props {
  item: any;
  onToggleCheck: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onSelectBatch: (itemId: number, batchId: number) => void; // دالة اختيار الدفعة
}

const CreateReturnInvoiceRow = ({
  item,
  onToggleCheck,
  onUpdateQuantity,
  onSelectBatch,
}: Props) => {
  const batchesList = item.batches || [];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 2fr 2fr 3fr 2fr 3fr 3fr",
        p: 1.2,
        borderBottom: "1px solid #F1F5F9",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      {/* Checkbox */}
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Checkbox
          checked={item.checked}
          onChange={() => onToggleCheck(item.saleInvoiceItemId)}
          sx={{ color: "#cbd5e1", "&.Mui-checked": { color: "#e11d48" } }}
        />
      </Box>

      {/* اسم الدواء */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", fontWeight: 500 }}
      >
        {item.tradeName ||
          item.pharmacyDrug?.drug.generalDrug?.tradeName ||
          "دواء"}
      </Box>

      {/* نوع الوحدة */}
      <Box sx={{ textAlign: "center", color: "#64748B", fontSize: 13 }}>
        <Box
          sx={{
            display: "inline-block",
            px: 1.5,
            py: 0.5,
            borderRadius: "4px",
            backgroundColor: "#ebebeb",
            color: "primary.main",
          }}
        >
          {item.unitType}
        </Box>
      </Box>

      {/* السعر الفردي */}
      <Box sx={{ textAlign: "center", fontWeight: 600 }}>
        {Number(item.finalUnitPrice || 0).toLocaleString()}
      </Box>

      {/* الكمية (Counter) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.8,
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(item.saleInvoiceItemId, 1)}
          disabled={item.selectedQuantity >= item.displayQuantity}
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
          sx={{ mx: 1, fontWeight: "bold", minWidth: 20, textAlign: "center" }}
        >
          {item.selectedQuantity.toString().padStart(2, "0")}
        </Typography>
        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(item.saleInvoiceItemId, -1)}
          disabled={item.selectedQuantity <= 1}
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

      {/* السعر الإجمالي */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: 15, fontWeight: "500" }}>
          {item.totalPrice}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 12, color: "text.secondary" }}
        >
          ل.س
        </Typography>
      </Box>

      {/* السعر بعد الخصم */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: 15, fontWeight: "500" }}>
          {item.netTotalPrice}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 12, color: "text.secondary" }}
        >
          ل.س
        </Typography>
      </Box>

      {/* إدارة اختيار الدفعة (تلقائي لوحدة، أو Select لوجود أكثر من دفعة) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 1,
        }}
      >
        {batchesList.length <= 1 ? (
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "#0F172A" }}
          >
            {batchesList[0]?.batch?.receivedDate
              ? format(
                  new Date(batchesList[0].batch.receivedDate),
                  "dd MMM yyyy",
                )
              : "دفعة افتراضية"}
          </Typography>
        ) : (
          <TextField
            select
            size="small"
            fullWidth
            value={item.selectedBatchId || ""}
            onChange={(e) =>
              onSelectBatch(item.saleInvoiceItemId, Number(e.target.value))
            }
            sx={{
              bgcolor: "#fff",
              borderRadius: "6px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px",
                fontSize: "13px",
              },
            }}
          >
            {batchesList.map((b: any) => {
              const bId = b.saleInvoiceItemBatchId || b.batchId;
              const dateStr = b.batch?.receivedDate
                ? format(new Date(b.batch.receivedDate), "dd MMM yyyy")
                : `دفعة #${bId}`;
              return (
                <MenuItem key={bId} value={bId} sx={{ fontSize: "13px" }}>
                  {dateStr} (الكمية:{" "}
                  {b.soldDisplayQuantity || b.soldBaseQuantity})
                </MenuItem>
              );
            })}
          </TextField>
        )}
      </Box>
    </Box>
  );
};

export default CreateReturnInvoiceRow;
