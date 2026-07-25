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
} from "@mui/material";
import { CardBadges } from "./CardBadges";
import { MedicineDetailsInfo } from "./MedicineDetailsInfo";
import { PriceBox } from "./PriceBox";
import type { PharmacyDrug } from "../../types/inventory";
import { MedicalDetailsDialog } from "./MedicalDetailsDialog";

import { EditGlobalMedicineDialog } from "../EditMedicine/EditGlobalMedicineDialog";
import { EditPrivateMedicineDialog } from "../EditMedicine/EditPrivateMedicineDialog";
import { useNavigate } from "react-router-dom";

export const MedicineCard: React.FC<{ medicine: PharmacyDrug }> = ({
  medicine,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // نافذة تفاصيل أخرى
  const [isEditOpen, setIsEditOpen] = useState(false); // نافذة التعديل الشرطية

  const categoryName = medicine.categories[0]?.categoryName || "عام";
  const isLowStock = medicine.stock.isLowStock || medicine.stock.isOutOfStock;
  const storageLoc = medicine.locations[0]?.storageLocation || "غير محدد";

  // الفحص الشرطي لمصدر الدواء (تعديل "GLOBAL" إذا كان الباكند يرسلها بصيغة أخرى)
  const isGlobalMedicine = medicine.source === "GENERAL";
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        borderRadius: "16px",
        p: 2.5,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid #eef2f5",
        borderRight: isLowStock ? "4px solid #f43f5e" : "1px solid #eef2f5",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      {/* القسم العلوي المبسط */}
      <CardBadges
        category={categoryName}
        isLowStock={isLowStock}
        notes={medicine.pharmacyDrugDetails.notes}
        onMenuClick={(e) => setAnchorEl(e.currentTarget)}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setIsEditOpen(true);
            setAnchorEl(null);
          }}
        >
          <ListItemText>تعديل</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemText>أرشفة</ListItemText>
        </MenuItem>
      </Menu>

      {/* الأسماء والعناوين مع إضافة شارة "وصفة طبية" بالجهة المقابلة لاسم الدواء */}
      <Box sx={{ textAlign: "start" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", color: "#1e293b", fontSize: "1.05rem" }}
          >
            {medicine.tradeName}
          </Typography>

          {/* شارة "وصفة طبية" الهادئة تظهر في الجهة الأخرى لاسم الدواء مباشرة */}
          {medicine.isRx && (
            <Chip
              label="وصفة طبية"
              size="small"
              sx={{
                backgroundColor: "#f8cf7688",
                color: "#475569",
                fontWeight: "600",
                borderRadius: "6px",
                fontSize: "0.725rem",
              }}
            />
          )}
        </Box>
        <Typography
          variant="caption"
          sx={{ color: "#94a3b8", display: "block", mt: 0.5 }}
        >
          {medicine.subtitle || "لم يتم إضافة أي مادة فعالة"}
        </Typography>
      </Box>

      {/* تفاصيل المخزون والموقع */}
      <MedicineDetailsInfo
        type={medicine.dosageForm.displayText}
        quantityText={medicine.stock.availableQuantityText}
        isLowStock={isLowStock}
        location={storageLoc}
      />

      {/* الأسعار */}
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <PriceBox
          label="سعر الشراء"
          price={medicine.pharmacyDrugDetails.netPrice}
        />
        <PriceBox
          label="سعر المستهلك"
          price={medicine.pharmacyDrugDetails.consumerPrice}
          isConsumer
        />
      </Box>

      {/* الأزرار السفلية */}
      <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
        <Button
          fullWidth
          variant="outlined"
          sx={actionButtonStyles}
          onClick={()=> { 
            navigate(`batches/${medicine.pharmacyDrugId}`, {
              state: {
                drugName: medicine.tradeName,
                activeIngredient:
                  medicine.subtitle || "لم يتم إضافة أي مادة فعالة",
              },
            })}
           
          }
        >
          عرض الدفعات ({medicine.stock.batchesCount})
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={actionButtonStyles}
          onClick={() => setIsDetailsOpen(true)}
        >
          تفاصيل آخرى
        </Button>
      </Box>

      {/* نافذة التفاصيل الاحترافية */}
      <MedicalDetailsDialog
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        medicine={medicine}
      />

      {/* التوجيه الذكي والمبني على معمارية فصل الواجهات والـ APIs */}
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

const actionButtonStyles = {
  backgroundColor: "#f8fafc",
  color: "",
  borderRadius: "10px",
  boxShadow: "none",
  fontWeight: "600",
  fontSize: "0.8rem",
  border: "1px solid #e2e8f0",
  textTransform: "none",
  "&:hover": { backgroundColor: "#f1f5f9", borderColor: "#cbd5e1" },
};
