import { CheckCircle } from "@mui/icons-material";
import { Box, Chip, Stack } from "@mui/material";
import type { GeneralDrug } from "../types/allGeneralDrugType";
import type { DosageForm } from "../types/dosageFormType";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import useGetData from "../../../shared/hooks/useGetData";

interface Props {
  generalDrug: GeneralDrug;
}

const GeneralDrugTableRow = ({ generalDrug }: Props) => {
  const { data } = useGetData<DosageForm>(
    "/dosage-forms/" + generalDrug.dosageFormId,
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "2.5fr 2.5fr 2fr 1.5fr 1.5fr 1fr",
        p: 1.5,
        borderTop: "1px solid #E2E8F0",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "right",
          color: "#475569",
          fontWeight: 500,
          fontSize: 16,
        }}
      >
        {generalDrug.barcode}
      </Box>

      {/* 1. الاسم التجاري */}
      <Box
        sx={{ textAlign: "center", fontWeight: 700, color: "#1E293B", pr: 1 }}
      >
        {generalDrug.tradeName}
      </Box>
      <Box
        sx={{ textAlign: "center", fontWeight: 600, color: "#1E293B", pr: 1 }}
      >
        {data?.data.dosageFormName}
      </Box>

      {/* 2. المواد الفعالة (تم فصلها لتظهر في العمود الثاني الصحيح) */}
      {/* <Box>
        <ActiveIngredientsColumn
          activeIngredientsList={generalDrug.activeIngredient}
        />
      </Box> */}

      {/* 3. التركيب والشكل */}
      {/* <Box sx={{ color: "#475569", fontWeight: 500, fontSize: 16 }}>
        {generalDrug.dosageForm.dosageFormName}
      </Box> */}

      {/* 4. التصنيف الدوائي */}
      {/* <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
          justifyContent: "center",
        }}
      >
        {generalDrug.drugCategory.map((item) => (
          <Box
            key={item.categoryId}
            sx={{ fontSize: 16, fontWeight: 500, color: "#475569" }}
          >
            {item.categoryName}
          </Box>
        ))}
      </Box> */}

      {/* 5. سعر النت */}
      <Box sx={{ fontWeight: 500, color: "#334155" }}>
        {generalDrug.netPrice} ل.س
      </Box>

      {/* 6. السعر للمستهلك */}
      <Box sx={{ fontWeight: 500, color: "#334155" }}>
        {generalDrug.consumerPrice} ل.س
      </Box>

      {/* 7. IsRx */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckCircle
          sx={{
            color: generalDrug.isRx ? "#DC2626" : "#CBD5E1",
            fontSize: 22,
            transition: "color 0.2s ease",
          }}
        />
      </Box>
    </Box>
  );
};

// interface ActiveIngredientsColumnProps {
//   activeIngredientsList: ActiveIngredientItem[];
// }

// const ActiveIngredientsColumn = ({
//   activeIngredientsList,
// }: ActiveIngredientsColumnProps) => {
//   return (
//     <Stack
//       direction="column"
//       spacing={0.8}
//       sx={{ width: "100%", alignItems: "center" }}
//     >
//       {activeIngredientsList.map((item) => (
//         <Box
//           key={item.ingredientId}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             width: "100%",
//             maxWidth: "180px", // يمنع تمدد المكون بشكل مفرط
//             gap: 4,
//           }}
//         >
//           {/* اسم المادة الفعالة */}
//           <Box
//             sx={{
//               fontSize: 15,
//               fontWeight: 500,
//               color: "#334155",
//               textAlign: "right",
//             }}
//           >
//             {item.ingredientName}
//           </Box>

//           {/* الـ Chip الخاص بالتركيز والوحدة */}
//           <Chip
//             label={`${item.strength} ${item.unit}`}
//             size="small"
//             sx={{
//               fontWeight: 600,
//               fontSize: 11,
//               backgroundColor: "#F1F5F9",
//               color: "#475569",
//               borderRadius: "6px",
//               height: 20,
//             }}
//           />
//         </Box>
//       ))}
//     </Stack>
//   );
// };

export default GeneralDrugTableRow;
