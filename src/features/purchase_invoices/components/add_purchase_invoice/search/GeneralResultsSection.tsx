import { Box, Typography, Button } from "@mui/material";
import type { SearchDrugResponse } from "../../../types/searchDrug";
import type React from "react";

type GeneralDrugItem = SearchDrugResponse["generalDrugs"]["items"][number];

type GeneralResultsSectionProps = {
  generalResults: GeneralDrugItem[];
  generalScrollRootRef: React.RefObject<HTMLDivElement | null>;
  generalSentinelRef: React.RefObject<HTMLDivElement | null>;
  onAddCentralDB: (generalDrug: GeneralDrugItem) => void;
};

const GeneralResultsSection = ({
  generalResults,
  generalScrollRootRef,
  generalSentinelRef,
  onAddCentralDB,
}: GeneralResultsSectionProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: "14px",
          color: "#5E3A60",
          mb: 1,
          pr: 1,
        }}
      >
        قاعدة البيانات المركزية
      </Typography>

      <Box
        ref={generalScrollRootRef}
        sx={{
          height: "125px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {generalResults.length === 0 && (
          <Box
            sx={{
              height: "inherit",
              borderRadius: "20px",
              p: 1,
              bgcolor: "#FAF8FB",
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography
              sx={{
                alignSelf: "center",
                color: "gray",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              لا توجد نتائج..
            </Typography>
          </Box>
        )}

        {generalResults.map((general) => (
          <Box
            key={general.generalDrugId}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#f3eaf8",
              border: "1px solid #EFEAF2",
              borderRadius: "16px",
              px: 2,
              py: 1,
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "15px",
                    color: "primary.main",
                  }}
                >
                  {general.tradeName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#7E6E80",
                    fontWeight: 500,
                  }}
                >
                  {`باركود: ${general.barcode}`}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              onClick={() => onAddCentralDB(general)}
              sx={{
                borderRadius: "24px",
                px: 3,
                py: 1,
                fontWeight: 700,
                fontSize: "12px",
                boxShadow: "none",
                whiteSpace: "nowrap",
                alignSelf: { xs: "stretch", sm: "auto" },
                display: "flex",
                gap: 1,
                "&:hover": {
                  bgcolor: "#4C3150",
                  boxShadow: "0 4px 12px rgba(94, 62, 99, 0.2)",
                },
              }}
            >
              إضافة للمخزون ثم للفاتورة
            </Button>
          </Box>
        ))}

        <Box ref={generalSentinelRef} sx={{ height: 1 }} />
      </Box>
    </Box>
  );
};

export default GeneralResultsSection;
