import { Box, CircularProgress, Typography } from "@mui/material";
import GeneralDrugTableHeader from "./GeneralDrugTableHeader";
import type { GeneralDrug } from "../types/allGeneralDrugType";
import GeneralDrugTableRow from "./GeneralDrugTableRow";

interface GeneralDrugTableProps {
  drugs: GeneralDrug[];
  isLoading: boolean;
  isError: boolean;
}

const GeneralDrugTable = ({
  drugs,
  isLoading,
  isError,
}: GeneralDrugTableProps) => {
  return (
    <Box
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <GeneralDrugTableHeader />
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography color="error">حدث خطأ أثناء جلب الأدوية</Typography>
        </Box>
      ) : drugs.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography color="text.secondary">
            لا توجد أدوية مضافة حالياً
          </Typography>
        </Box>
      ) : (
        drugs.map((drug) => (
          <GeneralDrugTableRow key={drug.generalDrugId} generalDrug={drug} />
        ))
      )}
    </Box>
  );
};

export default GeneralDrugTable;
