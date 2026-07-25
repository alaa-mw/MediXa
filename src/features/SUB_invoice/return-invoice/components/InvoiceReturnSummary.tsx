import { InfoOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface ReturnSummaryProps {
  totalReturnValues: number;
  totalDiscount: number;
  finalRefundAmount: number;
  onConfirm: (notes: string) => void;
  onCancel: () => void;
}

const InvoiceReturnSummary: React.FC<ReturnSummaryProps> = ({
  totalReturnValues,
  totalDiscount,
  finalRefundAmount,
  onConfirm,
  onCancel,
}) => {
  const [notes, setNotes] = useState("");

  const handleConfirmClick = () => {
    onConfirm(notes);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* جزء المحتوى العلوي */}
      <CardContent
        sx={{
          p: 3,
          pb: 1,
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        {" "}
        {/* ضبط البادينغ ليكون متناسقاً وعميقاً */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#0f172a",
            justifyContent: "center",
            display: "flex",
          }}
        >
          ملخص عملية الارجاع
        </Typography>
        <Stack spacing={2.5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              إجمالي قيمة المرتجعات
            </Typography>
            <Typography sx={{ fontWeight: "bold", color: "#0F172A" }}>
              {totalReturnValues.toLocaleString()}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#fffbeb",
              p: 1.5,
              borderRadius: 2,
              border: "1px solid #fef3c7",
            }}
          >
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              <InfoOutlined sx={{ fontSize: 16, color: "#d97706" }} />
              <Typography
                variant="caption"
                color="#d97706"
                sx={{ fontWeight: "500" }}
              >
                الخصم المطبق على الفاتورة
              </Typography>
            </Stack>
            <Typography sx={{ fontWeight: "bold", color: "#d97706" }}>
              {/* - {totalDiscount.toLocaleString()} */}
              10
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "#634A7B", // استخدام نفس لون الصيدلية الأساسي لتوحيد الهوية البصرية
              color: "white",
              p: 1,
              borderRadius: 3,
              textAlign: "center",
              boxShadow: "0px 6px 12px rgba(99, 74, 123, 0.2)",
            }}
          >
            <Typography
              variant="caption"
              sx={{ opacity: 0.8, display: "block", mb: 0.5 }}
            >
              المبلغ المسترد للعميل
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {finalRefundAmount.toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      {/* جزء المدخلات والأزرار السفلي متناسق الحواف تماماً */}
      <Box
        sx={{
          p: 3, // بادينغ متناسق مع الجزء العلوي
          mt: "auto",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="أضف ملاحظاتك"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              fontSize: "0.85rem",
              backgroundColor: "#f8fafc",
              "& fieldset": {
                borderColor: "#cbd5e1",
              },
              "&:hover fieldset": {
                borderColor: "#94a3b8",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#634A7B",
              },
            },
            mb: 2,
          }}
        />

        <Stack
          direction="row"
          sx={{
            width: "100%",
            gap: 1.5,
          }}
        >
          <Button
            variant="contained"
            onClick={handleConfirmClick}
            sx={{
              flex: 1,
              bgcolor: "#634A7B",
              color: "white",
              fontWeight: "bold",
              py: 1.2,
              borderRadius: 2,
              "&:hover": { bgcolor: "#4A355E" },
            }}
          >
            تأكيد الارجاع
          </Button>

          <Button
            variant="text"
            onClick={onCancel}
            sx={{
              flex: 1,
              color: "#634A7B",
              fontWeight: "bold",
              py: 1.2,
              borderRadius: 2,
              "&:hover": { bgcolor: "#f5f3f7" },
              border: "1px solid #634A7B",
            }}
          >
            إلغاء العملية
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default InvoiceReturnSummary;
