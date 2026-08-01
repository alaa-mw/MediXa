import { Box, Stack } from "@mui/material";
import { analysisInventoryMock } from "./analysisInventory.mock";
import CriticalStockCard from "./sections/CriticalStockCard";
import DemandAnalysisSection from "./sections/DemandAnalysisSection";
import InventoryAlertCard from "./sections/InventoryAlertCard";
import InventoryRotationCard from "./sections/InventoryRotationCard";
import ProductPerformanceCard from "./sections/ProductPerformanceCard";

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
            gridTemplateColumns: { xs: "1fr", xl: "280px 1fr" },
            gap: 2,
          }}
        >
          <Stack spacing={2}>
            {viewModel.topAlerts.map((alertCard) => (
              <InventoryAlertCard key={alertCard.id} item={alertCard} />
            ))}
          </Stack>

          <Stack spacing={2}>
            <InventoryRotationCard
              title={viewModel.rotation.title}
              subtitle={viewModel.rotation.subtitle}
              bars={viewModel.rotation.bars}
              metrics={viewModel.rotation.metrics}
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.7fr 1fr" },
                gap: 2,
              }}
            >
              <CriticalStockCard
                title={viewModel.criticalStock.title}
                rows={viewModel.criticalStock.rows}
              />

              <ProductPerformanceCard
                title={viewModel.performance.title}
                bestSelling={viewModel.performance.bestSelling}
                lowSelling={viewModel.performance.lowSelling}
              />
            </Box>
          </Stack>
        </Box>

        <DemandAnalysisSection
          title={viewModel.demandAnalysis.title}
          subtitle={viewModel.demandAnalysis.subtitle}
          columns={viewModel.demandAnalysis.columns}
        />
      </Stack>
    </Box>
  );
};

export default AnalysisInventoryPage;
