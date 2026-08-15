import { Box, Stack } from "@mui/material";
import { analysisInventoryMock } from "./analysisInventory.mock";
import ExpiryMedicinesCard from "./sections/ExpiryMedicinesCard";
import PeformanceMedicinesCard from "./sections/PeformanceMedicinesCard";
import RotationCard from "./sections/RotationCard";
import SalesTrendSection from "./sections/SalesTrendSection";
import SlowMedicinesCard from "./sections/SlowMedicinesCard";

const AnalysisInventoryPage = () => {
  const viewModel = analysisInventoryMock;

  return (
    <Box
      dir="rtl"
      sx={{
        p: { xs: 1.25, md: 2 },
        minHeight: "100%",
        backgroundColor: "#F4FAFF",
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", xl: "3fr 1fr" },
            gap: 2,
          }}
        >
          <Stack spacing={2} >
            <SalesTrendSection />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", xl: "1fr 1fr" },
                gap: 2,
              }}
            >
              <RotationCard rotation={viewModel.rotation} />
              <PeformanceMedicinesCard
                bestSelling={viewModel.PeformanceMedicines.bestSelling}
                lowSelling={viewModel.PeformanceMedicines.lowSelling}
              />
            </Box>
          </Stack>
          <Stack spacing={2}>
            <ExpiryMedicinesCard rows={viewModel.expiryMedicines.rows} />
            <SlowMedicinesCard rows={viewModel.slowMedicines.rows} />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default AnalysisInventoryPage;
