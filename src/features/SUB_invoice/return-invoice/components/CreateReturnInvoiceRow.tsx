import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import type { SaleInvoiceItem } from "../../Types/saleInvoiceDetailsTypes";
import { Add, Remove } from "@mui/icons-material";
import { format } from "date-fns";

interface Props {
  item: SaleInvoiceItem & { checked: boolean };
  onToggleCheck: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const CreateReturnInvoiceRow = ({
  item,
  onToggleCheck,
  onUpdateQuantity,
}: Props) => {
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
          sx={{
            color: "#cbd5e1",
            "&.Mui-checked": { color: "#e11d48" },
          }}
        />
      </Box>

      {/* اسم الدواء */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", fontWeight: 500 }}
      >
        {item.pharmacyDrug?.drug.generalDrug?.tradeName || "cetamol"}
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
        {item.finalUnitPrice.toLocaleString()}
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
            onClick={() => onUpdateQuantity(item.saleInvoiceItemId, 1)}
            sx={{
              border: "1px solid #fca5a5",
              color: "#ef4444",
              borderRadius: 1,
              p: 0.5,
            }}
          >
            <Add fontSize="small" />
          </IconButton>
          <Typography sx={{ mx: 1, fontWeight: "bold", minWidth: 20 }}>
            {item.displayQuantity?.toString().padStart(2, "0") || "01"}
          </Typography>
          <IconButton
            size="small"
            onClick={() => onUpdateQuantity(item.saleInvoiceItemId, -1)}
            disabled={
              item.displayQuantity === undefined || item.displayQuantity <= 1
            }
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
      </Box>

      {/* السعر الإجمالي للمادة */}
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
        <Typography
          variant="body2"
          sx={{ fontSize: 15, fontWeight: "500", color: "text.primary" }}
        >
          {item.totalPrice}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 12, fontWeight: "400", color: "text.secondary" }}
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
        <Typography
          variant="body2"
          sx={{ fontSize: 15, fontWeight: "500", color: "text.primary" }}
        >
          {item.totalPrice}u
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 12, fontWeight: "400", color: "text.secondary" }}
        >
          ل.س
        </Typography>
      </Box>

      {/* الدفعة / تاريخ الاستلام */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          fontWeight: 400,
          color: "#0F172A",
        }}
      >
        {format(
          new Date(
            item.batchAllocations?.at(0)?.batch.receivedDate ?? new Date(),
          ),
          "dd MMM yyyy",
        )}
      </Box>
    </Box>
  );
};

export default CreateReturnInvoiceRow;
