
import React, { useState } from "react";
import {
  Card,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  WarningAmberRounded as WarningIcon,
  NotesRounded as NotesIcon,
  Inventory2Outlined as InventoryIcon,
  PlaceOutlined as LocationIcon,
  MedicationOutlined as FormIcon,
  LayersOutlined as LayersIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { PharmacyDrug } from "../../types/pharnacyDrug";
import { MedicalDetailsDialog } from "./MedicalDetailsDialog";
import { EditGlobalMedicineDialog } from "../EditMedicine/EditGlobalMedicineDialog";
import { EditPrivateMedicineDialog } from "../EditMedicine/EditPrivateMedicineDialog";

interface MedicineCardProps {
  medicine: PharmacyDrug;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();

  // استخراج البيانات الأساسية
  const categoryName = medicine.categories[0]?.categoryName || "عام";
  const isLowStock = medicine.stock.isLowStock || medicine.stock.isOutOfStock;
  const storageLoc = medicine.locations[0]?.storageLocation || "غير محدد";
  const isGlobalMedicine = medicine.source === "GENERAL";

  // 🟢 المتغير الوهمي المطلوب للوحدات الفردية المتاحة
  const availableIndividualUnits = 12;

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
        position: "relative",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 12px 24px -4px rgba(30, 16, 60, 0.08)",
          borderColor: "#cbd5e1",
        },
      }}
    >
      {/* 1. Header Badges & Actions */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={categoryName}
            size="small"
            sx={{
              backgroundColor: "#f1f5f9",
              color: "#475569",
              fontWeight: "600",
              fontSize: "0.725rem",
              borderRadius: "6px",
            }}
          />
          {medicine.isRx && (
            <Chip
              label="وصفة"
              size="small"
              sx={{
                backgroundColor: "#fff7ed",
                color: "#c2410c",
                border: "1px solid #ffedd5",
                fontWeight: "700",
                fontSize: "0.675rem",
                borderRadius: "6px",
                height: 22,
              }}
            />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {isLowStock && (
            <Tooltip title="المخزون منخفض" arrow placement="top">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#fef2f2",
                  color: "#ef4444",
                  p: 0.5,
                  borderRadius: "6px",
                }}
              >
                <WarningIcon sx={{ fontSize: 18 }} />
              </Box>
            </Tooltip>
          )}

          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ color: "#64748b", "&:hover": { backgroundColor: "#f8fafc" } }}
          >
            <MoreVertIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            elevation: 2,
            sx: { borderRadius: "10px", minWidth: 120 },
          },
        }}
      >
       <MenuItem
  onClick={() => {
    setIsEditOpen(true);
    setAnchorEl(null);
  }}
>
  <Typography sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
    تعديل
  </Typography>
</MenuItem>
       <MenuItem onClick={() => setAnchorEl(null)}>
  <Typography sx={{ fontSize: "0.85rem", color: "#ef4444", fontWeight: 500 }}>
    أرشفة
  </Typography>
</MenuItem>
      </Menu>

      {/* 2. Title & Active Ingredient */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            color: "#0f172a",
            fontSize: "1rem",
            lineHeight: 1.3,
            mb: 0.5,
          }}
        >
          {medicine.tradeName}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#64748b",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: "0.775rem",
          }}
        >
          {medicine.subtitle || "لا يوجد مادة فعالة مضافة"}
        </Typography>
      </Box>

      {/* 3. Info Items List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 1.5,
          backgroundColor: "#f8fafc",
          borderRadius: "10px",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#64748b" }}>
            <FormIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              الشكل:
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155" }}>
            {medicine.dosageForm.displayText}
          </Typography>
        </Box>

        {/* الكمية والوحدات الفردية */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#64748b" }}>
            <InventoryIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              الكمية المتاحة:
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: isLowStock ? "#dc2626" : "#16a34a",
            }}
          >
            {medicine.stock.availableQuantityText}{" "}
            <Box component="span" sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.7rem" }}>
              ({availableIndividualUnits} وحدة)
            </Box>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#64748b" }}>
            <LocationIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              الموقع:
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155" }}>
            {storageLoc}
          </Typography>
        </Box>
      </Box>

      {/* 4. Price Boxes */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
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
            {medicine.pharmacyDrugDetails.netPrice.toFixed(2)}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 1,
            borderRadius: "8px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            textAlign: "center",
          }}
        >
          <Typography variant="caption" sx={{ color: "#166534", fontSize: "0.68rem", display: "block" }}>
            سعر المستهلك
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "#15803d" }}>
            {medicine.pharmacyDrugDetails.consumerPrice.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {/* 5. Footer Action Buttons */}
      <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
        <Button
          fullWidth
          size="small"
          variant="contained"
          disableElevation
          startIcon={<LayersIcon sx={{ fontSize: "16px !important" }} />}
          onClick={() =>
            navigate(`batches/${medicine.pharmacyDrugId}`, {
              state: {
                drugName: medicine.tradeName,
                activeIngredient: medicine.subtitle || "لم يتم إضافة أي مادة فعالة",
              },
            })
          }
          sx={{
            backgroundColor: "secondary.main",
            color: "#ffffff",
            borderRadius: "8px",
            fontSize: "0.75rem",
            fontWeight: 600,
            py: 0.8,
            textTransform: "none",
          }}
        >
          الدفعات ({medicine.stock.batchesCount})
        </Button>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          onClick={() => setIsDetailsOpen(true)}
          sx={{
            borderColor: "#cbd5e1",
            color: "#475569",
            borderRadius: "8px",
            fontSize: "0.75rem",
            fontWeight: 600,
            py: 0.8,
            textTransform: "none",
            "&:hover": { borderColor: "#94a3b8", backgroundColor: "#f8fafc" },
          }}
        >
          التفاصيل
        </Button>
      </Box>

      {/* Dialogs */}
      <MedicalDetailsDialog
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        medicine={medicine}
      />

      {isGlobalMedicine ? (
        <EditGlobalMedicineDialog
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          medicine={medicine}
        />
      ) : (
        <EditPrivateMedicineDialog
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          medicine={medicine}
        />
      )}
    </Card>
  );
};