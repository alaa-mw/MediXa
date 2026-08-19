// import React from "react";
// import { Box, Paper, Typography, Switch, Grid } from "@mui/material";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";
// import { useAppDispatch, useAppSelector } from "../../../../shared/store/hooks";
// import {  selectGeneralDrugState, updateFormField } from "../../store/generalDrugSlice";
// import { CustomCounterField } from "../../../../shared/layout/CustomCounterField";
// import { CustomTextField } from "../CustomTextField";



// export const Step1PricingAndStorage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const state = useAppSelector(selectGeneralDrugState);

//   const handleChange = (field: keyof typeof state, value: any) => {
//     dispatch(updateFormField({ field, value }));
//   };

//   return (
//     <Box sx={{ maxWidth: "800px", mx: "auto" }}>
//       {/* Banner */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 2.5,
//           mb: 3,
//           borderRadius: 3,
//           bgcolor: "#EFF6FF",
//           border: "1px solid #BFDBFE",
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         <Box
//           sx={{
//             width: 42,
//             height: 42,
//             borderRadius: 2.5,
//             bgcolor: "#2563EB",
//             color: "#FFF",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <LocalPharmacyOutlinedIcon />
//         </Box>
//         <Box>
//           <Typography variant="caption" sx={{ color: "#1D4ED8", fontWeight: 600 }}>
//             الدواء العام المحدد
//           </Typography>
//           <Typography variant="h6" sx={{ color: "#1E3A8A", fontWeight: 700 }}>
//             {state.generalDrugName || `دواء عام رقم #${state.generalDrugId}`}
//           </Typography>
//         </Box>
//       </Paper>

//       {/* Pricing Form */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3.5,
//           mb: 3,
//           borderRadius: 3.5,
//           bgcolor: "#FFFFFF",
//           border: "1px solid #E2E8F0",
//         }}
//       >
//         <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2.5, color: "#0F172A" }}>
//           أسعار الدواء وشروط البيع
//         </Typography>

//         <Grid container spacing={2.5}>
//           <Grid size={{ xs: 12, sm: 6 }}>
//             <CustomTextField
//               label="سعر التكلفة / الشراء (Net Price)"
//               value={state.netPrice}
//               onChange={(val) => handleChange("netPrice", val)}
//               type="number"
//               fullWidth
//             />
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6 }}>
//             <CustomTextField
//               label="سعر المبيع للمستهلك (Consumer Price)"
//               value={state.consumerPrice}
//               onChange={(val) => handleChange("consumerPrice", val)}
//               type="number"
//               fullWidth
//             />
//           </Grid>

//           <Grid size={{ xs: 12 }}>
//             <Box
//               sx={{
//                 bgcolor: "#F8FAFC",
//                 p: 2,
//                 px: 2.5,
//                 borderRadius: 2.5,
//                 border: "1px solid #F1F5F9",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Box>
//                 <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155" }}>
//                   السماح ببيع أجزاء من العلبة (Sell Part)
//                 </Typography>
//                 <Typography variant="caption" sx={{ color: "#64748B" }}>
//                   تفعيل الخيار يتيح للصيدلي تجزئة العلبة وبيع الشريحة أو القرص.
//                 </Typography>
//               </Box>
//               <Switch
//                 checked={state.sellPart}
//                 onChange={(e) => handleChange("sellPart", e.target.checked)}
//                 color="primary"
//               />
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Storage and Alerts */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3.5,
//           borderRadius: 3.5,
//           bgcolor: "#FFFFFF",
//           border: "1px solid #E2E8F0",
//         }}
//       >
//         <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2.5, color: "#0F172A" }}>
//           أماكن التخزين وحدود التنبيه
//         </Typography>

//         <Grid container spacing={2.5}>
//           <Grid size={{ xs: 12, sm: 6 }}>
//             <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.8 }}>
//               <LocationOnOutlinedIcon sx={{ color: "#2563EB", fontSize: 20 }} />
//               <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155" }}>
//                 موقع الرف (Storage Location)
//               </Typography>
//             </Box>
//             <CustomTextField
//             label="الموقع"
//               placeholder="مثال: Shelf A-3"
//               value={state.storageLocation}
//               onChange={(val) => handleChange("storageLocation", val)}
//               fullWidth
//             />
//           </Grid>

//           <Grid size={{ xs: 12, sm: 6 }}>
//             <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.8 }}>
//               <NotificationsNoneOutlinedIcon sx={{ color: "#F59E0B", fontSize: 20 }} />
//               <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155" }}>
//                 حد التنبيه الأدنى للمخزون
//               </Typography>
//             </Box>
//             <CustomCounterField
//               value={state.minStockAlert}
//               onChange={(val) => handleChange("minStockAlert", val)}
//               height="44px"
//             />
//           </Grid>

//           <Grid size={{ xs: 12 }}>
//             <CustomTextField
//               label="ملاحظات إضافية"
//               value={state.notes}
//               onChange={(val) => handleChange("notes", val)}
//               placeholder="أي تعليمات أو ملاحظات خاصة بالدواء..."
//               fullWidth
            
//             />
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

import React from "react";
import { Box, Paper, Typography, Switch, Grid, useTheme } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import { CustomCounterField } from "../../../../shared/layout/CustomCounterField";
import { CustomTextField } from "../CustomTextField";
import { useDrugForm } from "../../hooks/useDrugForm";

interface Step1PricingAndStorageProps {
  isPrivate?: boolean;
}

export const StepPricingAndStorage: React.FC<Step1PricingAndStorageProps> = ({
  isPrivate = false,
}) => {
  const theme = useTheme();

  // جلب الـ State ودالة التحديث المناسبة تلقائياً حسب نوع الدواء
  const { state, updateField } = useDrugForm(isPrivate);

  const handleChange = (field: string, value: any) => {
    updateField(field, value);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
      {/* Banner - Compact Header (يظهر معلومات الدواء العام فقط في حال لم يكن دواءً خاصاً) */}
      {!isPrivate && (
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            px: 2.5,
            mb: 2.5,
            borderRadius: 3,
            bgcolor: theme.palette.primary.light || "#EFF6FF",
            border: `1px solid ${theme.palette.primary.main}30`,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              bgcolor: theme.palette.primary.main,
              color: "#FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LocalPharmacyOutlinedIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
              الدواء العام المحدد
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.primary.dark || "#1E3A8A",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {(state as any).generalDrugName || `دواء عام رقم #${(state as any).generalDrugId || ""}`}
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Main Grid Container */}
      <Grid container spacing={2.5} sx={{ alignItems: "stretch" }}>
        {/* Left Card: Pricing & Sales Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              height: "100%",
              borderRadius: 3,
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: "#0F172A" }}>
                أسعار الدواء وشروط البيع
              </Typography>

              <Grid container spacing={2}>
                {/* سعر المبيع أولاً */}
                <Grid size={{ xs: 12 }}>
                  <CustomTextField
                    label="سعر المبيع (Consumer Price)"
                    value={state.consumerPrice}
                    onChange={(val) => handleChange("consumerPrice", val)}
                    type="number"
                    fullWidth
                  />
                </Grid>

                {/* سعر الشراء تحت سعر المبيع */}
                <Grid size={{ xs: 12 }}>
                  <CustomTextField
                    label="سعر الشراء (Net Price)"
                    value={state.netPrice}
                    onChange={(val) => handleChange("netPrice", val)}
                    type="number"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Sell Part Toggle */}
            <Box
              sx={{
                bgcolor: "#F8FAFC",
                p: 1.5,
                px: 2,
                mt: 2,
                borderRadius: 2.5,
                border: "1px solid #F1F5F9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155" }}>
                  تجزئة العلبة (Sell Part)
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748B" }}>
                  السماح ببيع أجزاء/شرائح من العلبة
                </Typography>
              </Box>
              <Switch
                checked={state.sellPart}
                onChange={(e) => handleChange("sellPart", e.target.checked)}
                color="primary"
                size="small"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Right Card: Storage, Stock & Expiry Alerts */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              height: "100%",
              borderRadius: 3,
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: "#0F172A" }}>
                التخزين والتنبيهات
              </Typography>

              <Grid container spacing={2}>
                {/* Storage Location */}
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mb: 0.8, display: "flex", alignItems: "center", gap: 0.8 }}>
                    <LocationOnOutlinedIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155" }}>
                      موقع الرف (Storage Location)
                    </Typography>
                  </Box>
                  <CustomTextField
                    label="الموقع"
                    placeholder="مثال: Shelf A-3"
                    value={state.storageLocation}
                    onChange={(val) => handleChange("storageLocation", val)}
                    fullWidth
                  />
                </Grid>

                {/* Minimum Stock Alert Counter */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 0.8, display: "flex", alignItems: "center", gap: 0.8 }}>
                    <NotificationsNoneOutlinedIcon sx={{ color: "#F59E0B", fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155" }}>
                      حد أدنى المخزون
                    </Typography>
                  </Box>
                  <CustomCounterField
                    value={state.minStockAlert}
                    onChange={(val) => handleChange("minStockAlert", val)}
                    height="40px"
                  />
                </Grid>

                {/* Expiry Date Alarm Counter (in Days) */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 0.8, display: "flex", alignItems: "center", gap: 0.8 }}>
                    <EventRepeatOutlinedIcon sx={{ color: "#EF4444", fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155" }}>
                      تنبيه الصلاحية (بالأيام)
                    </Typography>
                  </Box>
                  <CustomCounterField
                    value={state.expiryDateAlarm}
                    onChange={(val) => handleChange("expiryDateAlarm", val)}
                    height="40px"
                  />
                </Grid>

                {/* Additional Notes */}
                <Grid size={{ xs: 12 }}>
                  <CustomTextField
                    label="ملاحظات إضافية"
                    value={state.notes}
                    onChange={(val) => handleChange("notes", val)}
                    placeholder="أي تعليمات أو ملاحظات..."
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};