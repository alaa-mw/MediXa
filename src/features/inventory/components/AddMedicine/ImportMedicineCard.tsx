// features/inventory/components/AddMedicine/ImportMedicineCard.tsx
import React from "react";
import { Box, Card, Chip, Typography, Stack, Button } from "@mui/material";

// تعيين الـ Props لتستقبل بيانات الدواء والحدث ديناميكياً
interface ImportMedicineCardProps {
  medicineName: string;
  scientificName: string;
  category: string;
  requiresRx: boolean;
  type: string;
  purchasePrice: number;
  consumerPrice: number;
  onAddClick: () => void;
}

export const ImportMedicineCard: React.FC<ImportMedicineCardProps> = ({
  medicineName,
  scientificName,
  category,
  requiresRx,
  type,
  purchasePrice,
  consumerPrice,
  onAddClick,
}) => {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "20px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
        border: "1px solid #e2e8f0",
        backgroundColor: "#ffffff",
        height: "100%", // لضمان تساوي الارتفاعات داخل الـ Grid
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {/* تصنيفات الدواء والشارات */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Chip
            label={category}
            size="small"
            sx={{
              backgroundColor: "#e0f2fe",
              color: "#0369a1",
              fontWeight: "700",
              borderRadius: "6px",
            }}
          />
          {requiresRx && (
            <Chip
              label="RX REQUIRED"
              size="small"
              sx={{
                backgroundColor: "#fee2e2",
                color: "#ef4444",
                fontWeight: "700",
                borderRadius: "6px",
                fontSize: "10px",
              }}
            />
          )}
        </Box>

        {/* أسماء الأدوية */}
        <Box sx={{ mb: 3, textAlign: "right" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "#1e293b" }}
          >
            {medicineName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#94a3b8", mb: 2.5 }}
          >
            {scientificName}
          </Typography>

          {/* تفاصيل الأسعار والنوع */}
          <Stack
            spacing={1.5}
            sx={{ borderTop: "1px dashed #e2e8f0", pt: 2 }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                النوع:
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#334155" }}
              >
                {type}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                سعر الشراء:
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#334155" }}
              >
                {purchasePrice} ل.س
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                سعر المستهلك:
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#334155" }}
              >
                {consumerPrice} ل.س
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={onAddClick}
        sx={{
          backgroundColor: "#0f172a",
          "&:hover": { backgroundColor: "#1e293b" },
          borderRadius: "12px",
          fontWeight: "bold",
          py: 1.2,
          boxSizing: "border-box",
          boxShadow: "none",
          mt: 2,
        }}
      >
        + إضافة للمخزون
      </Button>
    </Card>
  );
};