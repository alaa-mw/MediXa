import { Box } from "@mui/material";
import { RETURN_COLUMN } from "./InvoiceTableRow";

interface Props {
  isReturn: boolean;
}

const InvoiceTableHeader = ({ isReturn }: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        // توزيع الأعمدة بنسب مئوية دقيقة لتغطية 100% من العرض دون تمدد تلقائي مفاجئ
        gridTemplateColumns: RETURN_COLUMN,
        p: 1.2,
        bgcolor: "#F8FAFC",
        borderBottom: "1px solid #E2E8F0",
        fontWeight: 700,
        fontSize: 14,
        alignItems: "center",
        direction: "rtl",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>#</Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        اسم الدواء
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>الوحدة</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>الكمية</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>سعر المفرد</Box>
      {isReturn ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          إعادة تخزين
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          النسبة المضافة
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        السعر الإجمالي
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        السعر بعد الخصم
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        الدفعات المرجعية
      </Box>
    </Box>
  );
};

export default InvoiceTableHeader;
