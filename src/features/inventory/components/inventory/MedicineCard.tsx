// // features/inventory/components/MedicineCard.tsx
// import React from "react";
// import { Card, Box, Typography, Button } from "@mui/material";
// import { CardBadges } from "./CardBadges";
// import { MedicineDetailsInfo } from "./MedicineDetailsInfo";
// import { PriceBox } from "./PriceBox";
// import type { Medicine } from "../../apis/inventory.types";

// interface MedicineCardProps {
//   medicine: Medicine;
// }

// const actionButtonStyles = {
//   backgroundColor: "#f0f4f8",
//   color: "#5a6369",
//   borderRadius: "10px",
//   boxShadow: "none",
//   fontWeight: "bold",
//   whiteSpace: "nowrap",
//   "&:hover": { backgroundColor: "#e2ecf5" }
// };

// export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
//   const isLowStock = medicine.quantity <= medicine.alert_limit;

//   return (
//     <Card
//       sx={{
//         borderRadius: "16px",
//         p: 3,
//         boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
//         backgroundColor: "#ffffff",
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//         border: "1px solid #eef2f5",
//         borderRight: isLowStock ? "5px solid #ff9695" : "1px solid #eef2f5",

//         transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//         "&:hover": {
//           transform: "translateY(-5px)",
//           boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.08)",
//         },
//       }}
//     >
//       <CardBadges category={medicine.category} isLowStock={isLowStock} />

//       <Box sx={{ textAlign: "start", my: 1 }}>
//         <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e2524" }}>
//           {medicine.trade_name}
//         </Typography>
//         <Typography variant="caption" sx={{ color: "#7a868f", display: "block" }}>
//           {medicine.scientific_name}
//         </Typography>
//       </Box>

//       <MedicineDetailsInfo
//         type={medicine.type}
//         quantity={medicine.quantity}
//         alertLimit={medicine.alert_limit}
//         isLowStock={isLowStock}
//       />

//       <Box sx={{ display: "flex", gap: 2 }}>
//         <PriceBox label="سعر الشراء" price={medicine.purchase_price} />
//         <PriceBox label="سعر المستهلك" price={medicine.consumer_price} isConsumer />
//       </Box>

//       <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
//         <Button fullWidth variant="contained" sx={actionButtonStyles}>
//           عرض الدفعات
//         </Button>

//         <Button fullWidth variant="contained" sx={actionButtonStyles}>
//           المعلومات الطبية
//         </Button>
//       </Box>
//     </Card>
//   );
// };
// features/inventory/components/MedicineCard.tsx

// features/inventory/components/MedicineCard.tsx



// import React, { useState } from "react";
// import {
//   Card,
//   Box,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
//   ListItemText,
// } from "@mui/material";

// import { CardBadges } from "./CardBadges";
// import { MedicineDetailsInfo } from "./MedicineDetailsInfo";
// import { PriceBox } from "./PriceBox";
// import type { Medicine } from "../../apis/inventory.types";
// import { EditMedicineDialog } from "./EditMedicineDialog"; // 👈 استيراد نافذة التعديل الجديدة

// interface MedicineCardProps {
//   medicine: Medicine;
// }

// const actionButtonStyles = {
//   backgroundColor: "#f0f4f8",
//   color: "#5a6369",
//   borderRadius: "10px",
//   boxShadow: "none",
//   fontWeight: "bold",
//   whiteSpace: "nowrap",
//   "&:hover": {
//     backgroundColor: "#e2ecf5",
//   },
// };

// export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
//   const isLowStock = medicine.quantity <= medicine.alert_limit;

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // 👈 حالة التحكم بفتح نافذة التعديل

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleEdit = () => {
//     handleMenuClose();
//     setIsEditDialogOpen(true); // 👈 فتح الـ Dialog عند الضغط على تعديل
//   };

//   const handleArchive = () => {
//     handleMenuClose();
//     console.log("Archive");
//   };

//   // دالة تُستدعى بعد الضغط على حفظ التغييرات لمعالجة البيانات المعدلة
//   const handleSaveMedicineUpdate = (updatedFields: Partial<Medicine>) => {
//     console.log("البيانات الجديدة المحدثة للدواء:", updatedFields);
//     // هنا يمكنك استدعاء دالة الـ API مثل mutate من RTK Query أو Axios لتحديث البيانات بالـ Backend
//   };

//   return (
//     <Card
//       sx={{
//         borderRadius: "16px",
//         p: 3,
//         boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
//         backgroundColor: "#ffffff",
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//         border: "1px solid #eef2f5",
//         borderRight: isLowStock ? "5px solid #ff9695" : "1px solid #eef2f5",
//         transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//         "&:hover": {
//           transform: "translateY(-5px)",
//           boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.08)",
//         },
//       }}
//     >
//       <CardBadges
//         category={medicine.category}
//         isLowStock={isLowStock}
//         onMenuClick={handleMenuOpen}
//       />

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem onClick={handleEdit}>
//           <ListItemText>تعديل</ListItemText>
//         </MenuItem>

//         <MenuItem onClick={handleArchive}>
//           <ListItemText>أرشفة</ListItemText>
//         </MenuItem>
//       </Menu>

//       <Box sx={{ textAlign: "start", my: 1 }}>
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: "bold",
//             color: "#1e2524",
//           }}
//         >
//           {medicine.trade_name}
//         </Typography>

//         <Typography
//           variant="caption"
//           sx={{
//             color: "#7a868f",
//             display: "block",
//           }}
//         >
//           {medicine.scientific_name}
//         </Typography>
//       </Box>

//       <MedicineDetailsInfo
//         type={medicine.type}
//         quantity={medicine.quantity}
//         alertLimit={medicine.alert_limit}
//         isLowStock={isLowStock}
//       />

//       <Box sx={{ display: "flex", gap: 2 }}>
//         <PriceBox label="سعر الشراء" price={medicine.purchase_price} />

//         <PriceBox
//           label="سعر المستهلك"
//           price={medicine.consumer_price}
//           isConsumer
//         />
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           gap: 1.5,
//           mt: "auto",
//         }}
//       >
//         <Button fullWidth variant="contained" sx={actionButtonStyles}>
//           عرض الدفعات
//         </Button>

//         <Button fullWidth variant="contained" sx={actionButtonStyles}>
//           المعلومات الطبية
//         </Button>
//       </Box>

//       {/* 👈 دمج واستدعاء المكون الجديد هنا ليعمل في الخلفية */}
//       <EditMedicineDialog
//         open={isEditDialogOpen}
//         onClose={() => setIsEditDialogOpen(false)}
//         medicine={medicine}
//         onSave={handleSaveMedicineUpdate}
//       />
//     </Card>
//   );
// };





import React, { useState } from "react";
import {
  Card,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";

import { CardBadges } from "./CardBadges";
import { MedicineDetailsInfo } from "./MedicineDetailsInfo";
import { PriceBox } from "./PriceBox";
// import { EditMedicineDialog } from "./EditMedicineDialog"; 
import type { PharmacyDrug } from "../../types/inventory.types";

interface MedicineCardProps {
  medicine: PharmacyDrug; // 🟢 الاعتماد على الهيكل الحقيقي الجديد
}

const actionButtonStyles = {
  backgroundColor: "#f0f4f8",
  color: "#5a6369",
  borderRadius: "10px",
  boxShadow: "none",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: "#e2ecf5",
  },
};

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  // 🟢 استخراج الكمية والحد الأدنى (بشكل مرن وافتراضي لحين اكتمال الـ Populate)
  const currentQuantity = medicine.quantity ?? 12; // كمية افتراضية مؤقتة
  const isLowStock = currentQuantity <= medicine.minStockAlert;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); 

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    setIsEditDialogOpen(true); 
  };

  const handleArchive = () => {
    handleMenuClose();
    console.log("Archive ID:", medicine.pharmacyDrugId);
  };

  const handleSaveMedicineUpdate = (updatedFields: Partial<PharmacyDrug>) => {
    console.log("البيانات الجديدة المحدثة للدواء:", updatedFields);
  };

  return (
    <Card
      sx={{
        borderRadius: "16px",
        p: 3,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid #eef2f5",
        borderRight: isLowStock ? "5px solid #ff9695" : "1px solid #eef2f5",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <CardBadges
        category={medicine.category || "الكل"}
        isLowStock={isLowStock}
        onMenuClick={handleMenuOpen}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemText>تعديل</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleArchive}>
          <ListItemText>أرشفة</ListItemText>
        </MenuItem>
      </Menu>

      <Box sx={{ textAlign: "start", my: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#1e2524",
          }}
        >
          {/* 🟢 عرض الملاحظات أو الاسم التجاري المتاح */}
          {medicine.trade_name || medicine.notes || "دواء بدون اسم تجاري"}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: "#7a868f",
            display: "block",
          }}
        >
          {medicine.scientific_name || "المادة الفعالة"}
        </Typography>
      </Box>

      <MedicineDetailsInfo
        type={medicine.type || (medicine.sellPart ? "أقراص (جزئي)" : "عبوة كاملة")}
        quantity={currentQuantity}
        alertLimit={medicine.minStockAlert}
        isLowStock={isLowStock}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* 🟢 تحويل نصوص الأسعار الجاية من الباك إند إلى أرقام parseFloat بشكل آمن */}
        <PriceBox label="سعر الشراء" price={parseFloat(medicine.netPrice || "0")} />

        <PriceBox
          label="سعر المستهلك"
          price={parseFloat(medicine.consumerPrice || "0")}
          isConsumer
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          mt: "auto",
        }}
      >
        <Button fullWidth variant="contained" sx={actionButtonStyles}>
          عرض الدفعات
        </Button>

        <Button fullWidth variant="contained" sx={actionButtonStyles}>
          المعلومات الطبية
        </Button>
      </Box>

      {/* <EditMedicineDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        medicine={medicine as any}
        onSave={handleSaveMedicineUpdate}
      /> */}
    </Card>
  );
};