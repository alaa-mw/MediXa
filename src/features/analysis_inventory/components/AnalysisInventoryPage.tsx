import { Box, Stack } from "@mui/material";
import ExpiryMedicinesCard from "./sections/ExpiryMedicinesCard";
import PeformanceMedicinesCard from "./sections/PeformanceMedicinesCard";
import RotationCard from "./sections/RotationCard";
import SalesTrendSection from "./sections/SalesTrendSection";
import SlowMedicinesCard from "./sections/SlowMedicinesCard";

const AnalysisInventoryPage = () => {
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
          <Stack spacing={2}>
            <SalesTrendSection />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", xl: "1fr 1fr" },
                gap: 2,
              }}
            >
              <RotationCard />
              <PeformanceMedicinesCard />
            </Box>
          </Stack>
          <Stack spacing={2}>
            <ExpiryMedicinesCard />
            <SlowMedicinesCard />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default AnalysisInventoryPage;
