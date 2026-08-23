// import {
//   Stack,
//   Typography,
//   Button,
//   CircularProgress,
//   Box,
//   TextField,
// } from "@mui/material";
// import CheckIcon from "@mui/icons-material/Check";
// import textfieldStyle from "../../../shared/constants/textFieldStyle";

// interface PricingHeroProps {
//   selectedPlanName?: string;
//   isSubmitting: boolean;
//   startsAt: string;
//   onDateChange: (date: string) => void;
//   onConfirm: () => void;
// }

// export default function PricingHero({
//   selectedPlanName,
//   isSubmitting,
//   startsAt,
//   onDateChange,
//   onConfirm,
// }: PricingHeroProps) {
//   const isDateSelected = Boolean(startsAt);

//   return (
//     <Stack
//       sx={{
//         width: "100%",
//         mb: 6,
//         mt: 2,
//         direction: "rtl",
//       }}
//     >
//       {selectedPlanName ? (
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             gap: 2,
//             bgcolor: "primary.50",
//             p: 3,
//             borderRadius: "16px",
//             border: "1px dashed",
//             borderColor: "primary.main",
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: 700, color: "text.primary" }}
//           >
//             الخطة المختارة للتجديد:{" "}
//             <Typography
//               component="span"
//               variant="h6"
//               sx={{ fontWeight: 800, color: "primary.main" }}
//             >
//               {selectedPlanName}
//             </Typography>
//           </Typography>

//           <Stack
//             direction="row"
//             spacing={2}
//             sx={{ alignItems: "center", gap: 2 }}
//           >
//             <TextField
//               label="تاريخ بدء الاشتراك"
//               type="date"
//               size="small"
//               value={startsAt ? startsAt.split("T")[0] : ""}
//               onChange={(e) => {
//                 if (e.target.value) {
//                   // استخراج السنة والشهر واليوم من القيمة المدخلة لمنع مشاكل فروق التوقيت
//                   const [year, month, day] = e.target.value
//                     .split("-")
//                     .map(Number);

//                   // إنشاء كاريخ جديد بالوقت المحلي الحالي للساعة والدقيقة والثانية
//                   const now = new Date();
//                   const selectedDate = new Date(
//                     year,
//                     month - 1,
//                     day,
//                     now.getHours(),
//                     now.getMinutes() + 1,
//                     now.getSeconds(),
//                   );
//                   onDateChange(selectedDate.toISOString());
//                 } else {
//                   onDateChange("");
//                 }
//               }}
//               slotProps={{
//                 inputLabel: {
//                   shrink: true,
//                   sx: {
//                     right: 29, // ضبط محاذاة الـ Label نحو اليمين ليتناسب مع الـ RTL
//                     left: "auto",
//                     transformOrigin: "right",
//                   },
//                 },
//               }}
//               sx={{
//                 width: { xs: "100%", sm: "auto" },
//                 minWidth: "220px",
//                 direction: "rtl", // ضمان أن الحقل يعمل باتجاه صحيح
//                 "& input": {
//                   color: startsAt ? "text.primary" : "text.disabled",
//                 },
//                 "& input[type='date']::-webkit-calendar-picker-indicator": {
//                   filter: "invert(0.5)",
//                   cursor: "pointer",
//                 },
//               }}
//             />
//             {/* زر التأكيد المعطل حتى يتم اختيار التاريخ */}
//             <Button
//               variant="contained"
//               color="primary"
//               size="large"
//               onClick={onConfirm}
//               disabled={isSubmitting || !isDateSelected}
//               startIcon={
//                 isSubmitting ? (
//                   <CircularProgress size={20} color="inherit" />
//                 ) : (
//                   <CheckIcon />
//                 )
//               }
//               sx={{
//                 borderRadius: "10px",
//                 px: 4,
//                 py: 1,

//                 fontWeight: 700,
//                 fontSize: "15px",
//               }}
//             >
//               {isSubmitting ? "جاري التجديد..." : "تأكيد تجديد الاشتراك"}
//             </Button>
//           </Stack>
//         </Box>
//       ) : (
//         <Stack sx={{ alignItems: "center", textAlign: "center" }} spacing={2}>
//           <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
//             اختر الخطة المناسبة لصيدليتك
//           </Typography>
//           <Typography sx={{ maxWidth: 800, color: "text.secondary" }}>
//             خطط مرنة تناسب جميع أحجام الصيدليات مع أدوات ذكية تدعم نمو عملك.
//           </Typography>
//         </Stack>
//       )}
//     </Stack>
//   );
// }
import {
  Stack,
  Typography,
  Button,
  CircularProgress,
  Box,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface PricingHeroProps {
  selectedPlanName?: string;
  isSubmitting: boolean;
  startsAt: string;
  onDateChange: (date: string) => void;
  onConfirm: () => void;
}

export default function PricingHero({
  selectedPlanName,
  isSubmitting,
  startsAt,
  onDateChange,
  onConfirm,
}: PricingHeroProps) {
  const isDateSelected = Boolean(startsAt);

  return (
    <Stack
      sx={{
        width: "100%",
        mb: 6,
        mt: 2,
        direction: "rtl",
      }}
    >
      {selectedPlanName ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            bgcolor: "primary.50",
            p: 3,
            borderRadius: "16px",
            border: "1px dashed",
            borderColor: "primary.main",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            الخطة المختارة للتجديد:{" "}
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: 800, color: "primary.main" }}
            >
              {selectedPlanName}
            </Typography>
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", gap: 2 }}
          >
            <TextField
              label="تاريخ بدء الاشتراك"
              type="date"
              size="small"
              value={startsAt}
              onChange={(e) => {
                // input[type="date"] يعيد القيمة أصلاً بصيغة YYYY-MM-DD.
                // نحفظها ونرسلها كما هي دون تحويلها إلى Date أو ISO string،
                // لأن منطق الاشتراكات يعتمد على اليوم فقط وليس الساعة/timezone.
                onDateChange(e.target.value);
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                  sx: {
                    right: 29, // ضبط محاذاة الـ Label نحو اليمين ليتناسب مع الـ RTL
                    left: "auto",
                    transformOrigin: "right",
                  },
                },
              }}
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: "220px",
                direction: "rtl", // ضمان أن الحقل يعمل باتجاه صحيح
                "& input": {
                  color: startsAt ? "text.primary" : "text.disabled",
                },
                "& input[type='date']::-webkit-calendar-picker-indicator": {
                  filter: "invert(0.5)",
                  cursor: "pointer",
                },
              }}
            />
            {/* زر التأكيد المعطل حتى يتم اختيار التاريخ */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onConfirm}
              disabled={isSubmitting || !isDateSelected}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <CheckIcon />
                )
              }
              sx={{
                borderRadius: "10px",
                px: 4,
                py: 1,

                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              {isSubmitting ? "جاري التجديد..." : "تأكيد تجديد الاشتراك"}
            </Button>
          </Stack>
        </Box>
      ) : (
        <Stack sx={{ alignItems: "center", textAlign: "center" }} spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
            اختر الخطة المناسبة لصيدليتك
          </Typography>
          <Typography sx={{ maxWidth: 800, color: "text.secondary" }}>
            خطط مرنة تناسب جميع أحجام الصيدليات مع أدوات ذكية تدعم نمو عملك.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}