import { Box, Typography, Chip } from "@mui/material";
import type {
  PharmacyDrug,
  PharmacyDrugResult,
} from "../../../types/searchDrug";
import type React from "react";

type LocalResultsSectionProps = {
  localResults: PharmacyDrug[];
  localScrollRootRef: React.RefObject<HTMLDivElement | null>;
  localSentinelRef: React.RefObject<HTMLDivElement | null>;
  onAddDrugToInvoice: (drug: PharmacyDrugResult) => void;
};

const LocalResultsSection = ({
  localResults,
  localScrollRootRef,
  localSentinelRef,
  onAddDrugToInvoice,
}: LocalResultsSectionProps) => {
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
        نتائج من المخزون المحلي{" "}
        <span style={{ fontWeight: 500, color: "gray", fontSize: "12px" }}>
          {" "}
          (اضغط على الدواء لاضافته للفاتورة)
        </span>
      </Typography>

      <Box
        ref={localScrollRootRef}
        sx={{
          height: "125px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {localResults.length === 0 && (
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

        {localResults.map((drug) => (
          <Box
            component="div"
            key={drug.pharmacyDrugId}
            onClick={() => onAddDrugToInvoice(drug)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#EBF8FA",
              border: "1px solid #D2ECF0",
              borderRadius: "16px",
              px: 2,
              py: 1,
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              cursor: "pointer",
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
                    color: "#1F4A52",
                  }}
                >
                  {drug.tradeName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#7E6E80",
                    fontWeight: 500,
                  }}
                >
                  {`باركود: ${drug.barcode}`}
                </Typography>
              </Box>
            </Box>

            <Chip
              color="default"
              label={
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#548892",
                    fontWeight: 500,
                  }}
                >
                  الكمية المتوفرة: {"  "}
                  <strong style={{ fontWeight: 800 }}>
                    {drug.availableQuantity} وحدة
                  </strong>
                </Typography>
              }
              size="small"
            />
          </Box>
        ))}

        <Box ref={localSentinelRef} sx={{ height: 1 }} />
      </Box>
    </Box>
  );
};

export default LocalResultsSection;
