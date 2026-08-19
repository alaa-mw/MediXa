
import React from "react";
import {
  Card,
  Box,
  Typography,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import { BarcodeReader, } from "@mui/icons-material";
import type { CentralDrugData } from "../../../../shared/layout/BarcodeCentralDatabase";

interface CentralDrugCardProps {
  drug: CentralDrugData;
  onAddClick: (drug: CentralDrugData) => void;
}

export const CentralDrugCard: React.FC<CentralDrugCardProps> = ({ drug, onAddClick }) => {

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        p: 2.25,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid #e2e8f0",
        height: "100%",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 12px 24px -4px rgba(30, 16, 60, 0.08)",
          borderColor: "#cbd5e1",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {/* Badges: Barcode & Rx */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Chip
            icon={<BarcodeReader sx={{ fontSize: "16px !important" }} />}
            label={drug.barcode}
            size="small"
            sx={{
              backgroundColor: "#f1f5f9",
              color: "#475569",
              fontWeight: 600,
              fontSize: "0.75rem",
              borderRadius: "6px",
            }}
          />
          {drug.isRx && (
            <Chip
              label="وصفة طبية"
              size="small"
              sx={{
                backgroundColor: "#fef2f2",
                color: "#ef4444",
                fontWeight: 600,
                fontSize: "0.7rem",
                borderRadius: "6px",
              }}
            />
          )}
        </Box>

        {/* Trade Name */}
        <Box sx={{ mt: 0.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1e103c",
              fontSize: "1.1rem",
              lineHeight: 1.3,
            }}
          >
            {drug.tradeName}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
            p: 1.5,
            backgroundColor: "#f8fafc",
            borderRadius: "10px",
            mb: 1.5, 
          }}
        >

          {/* الوحدات */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.85rem" }}>
              الوحدات بالعبوة:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a" }}>
              {drug.unitsPerBox} وحدة
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          {/* صندوق سعر الشراء */}
          <Box
            sx={{
              flex: 1,
              p: 1,
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.68rem", display: "block" }}>
              سعر الشراء
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155" }}>
              {parseFloat(drug.netPrice).toFixed(2)} ل.س
            </Typography>
          </Box>

          {/* صندوق سعر المستهلك */}
          <Box
            sx={{
              flex: 1,
              p: 1,
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.68rem", display: "block" }}>
              سعر المستهلك
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155" }}>
              {parseFloat(drug.consumerPrice).toFixed(2)} ل.س
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Button to Open Dialog */}
      <Box sx={{ mt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onAddClick(drug)}
          sx={{
            borderRadius: "10px",
            py: 1,
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "none",
            backgroundColor: "secondary.main",
           
          }}
        >
          إضافة للمخزون
        </Button>
      </Box>
    </Card>
  );
};