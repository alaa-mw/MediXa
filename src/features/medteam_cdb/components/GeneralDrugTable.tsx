import { Box } from "@mui/material";
import type { GeneralDrugsResponse } from "../types/generalDrugType";
import GeneralDrugTableRow from "./GeneralDrugTableRow";
import GeneralDrugTableHeader from "./GeneralDrugTableHeader";
export const MOCK_DRUGS_RESPONSE: GeneralDrugsResponse = {
  success: true,
  statusCode: 200,
  message: "Request completed successfully",
  timestamp: "2026-07-03T16:00:00.000Z",
  path: "/api/general-drugs?page=1&limit=2",
  data: {
    data: [
      {
        generalDrugId: 1,
        drugId: 101,
        tradeName: "Panadol Advance",
        barcode: "6281100112233",
        unitsPerBox: 24,
        netPrice: "4.20",
        consumerPrice: "6.00",
        isRx: false,
        isActive: true,
        createdAt: "2026-01-15T08:00:00.000Z",
        updatedAt: "2026-05-20T12:30:00.000Z",
        activeIngredient: [
          {
            ingredientId: 1,
            ingredientName: "Paracetamol",
            strength: "500",
            unit: "mg",
          },
        ],
        dosageForm: {
          dosageFormId: 1,
          dosageFormName: "Tablet",
          formCategory: "SOLID",
        },
        drugCategory: [
          {
            categoryId: 2,
            categoryName: "Analgesics",
            description: "Medicines used to relieve pain",
          },
        ],
      },
      {
        generalDrugId: 2,
        drugId: 102,
        tradeName: "Amoxil 500mg",
        barcode: "6281100445566",
        unitsPerBox: 16,
        netPrice: "12.50",
        consumerPrice: "18.00",
        isRx: true,
        isActive: true,
        createdAt: "2026-02-10T09:15:00.000Z",
        updatedAt: "2026-06-01T10:00:00.000Z",
        activeIngredient: [
          {
            ingredientId: 1,
            ingredientName: "Paracetamol",
            strength: "500",
            unit: "mg",
          },
          {
            ingredientId: 2,
            ingredientName: "Caffeine",
            strength: "65",
            unit: "mg",
          },
        ],
        dosageForm: {
          dosageFormId: 2,
          dosageFormName: "Capsule",
          formCategory: "SOLID",
        },
        drugCategory: [
          {
            categoryId: 1,
            categoryName: "Antibiotics",
            description: "Medicines used to treat bacterial infections",
          },
        ],
      },
    ],
    page: 1,
    limit: 10,
    total: 2,
    pages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const GeneralDrugTable = () => {
  const drugsListMock = MOCK_DRUGS_RESPONSE.data.data;

  return (
    <Box
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <GeneralDrugTableHeader />
      {drugsListMock.map((drug) => (
        <GeneralDrugTableRow key={drug.generalDrugId} generalDrug={drug} />
      ))}
      {/* {isLoading ? (
        <LoadingState />
      ) : drugsListMock.length === 0 ? (
        <EmptyState />``
      ) : (
        drugsListMock.map((drug) => (
          <GeneralDrugTableRow key={drug.generalDrugId} generalDrug={drug} />
        ))
      )} */}
    </Box>
  );
};

export default GeneralDrugTable;
