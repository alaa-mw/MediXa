// import React, { useState } from "react";
// import { Box, Grid, Alert, Typography, Button, useTheme } from "@mui/material";
// import { Search, Add, ManageSearch } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
// import EmptyState from "../../../shared/layout/EmptyState";
// import useGetWithParams from "../../../shared/hooks/useGetWithParams";
// import { MedicineCardSkeleton } from "../components/inventory/MedicineCardSkeleton";

// import { FoundMedicineDialog } from "../components/AddMedicine/MedicineFoundDialog";
// import { NotFoundMedicineDialog } from "../components/AddMedicine/MedicineNotFoundDialog";
// import {
//   BarcodeCentralDatabase,
//   type CentralDrugData,
// } from "../../../shared/layout/BarcodeCentralDatabase";
// import { CentralDrugCard } from "../components/AddMedicine/CentralDrugCard";
// import { CentralDrugCardSkeleton } from "../components/AddMedicine/CentralDrugCardSkeleton";

// export interface CentralDrugsPayload {
//   data: CentralDrugData[];
//   page: number;
//   limit: number;
//   total: number;
//   pages: number;
// }

// export const AddMedicinePage: React.FC = () => {
//   const [selectedDrug, setSelectedDrug] = useState<CentralDrugData | null>(
//     null,
//   );
//   const [openFoundDialog, setOpenFoundDialog] = useState(false);
//   const [openNotFoundDialog, setOpenNotFoundDialog] = useState(false);
//   const [scannedNotFoundBarcode, setScannedNotFoundBarcode] =
//     useState<string>("");

//   const {
//     data: response,
//     isLoading,
//     isError,
//     error,
//     queryParams,
//     setQueryParams,
//   } = useGetWithParams<CentralDrugsPayload>("/general-drugs", {
//     searchTerm: "",
//     page: 1,
//     limit: 12,
//   });

//   const searchTerm = queryParams.searchTerm?.trim() || "";
//   const centralDrugsList = response?.data?.data || [];

//   const hasPerformedSearch = searchTerm.length > 0;

//   const handleOpenAddDialog = (drug: CentralDrugData) => {
//     setSelectedDrug(drug);
//     setOpenFoundDialog(true);
    
//   };

//   const handleBarcodeNotFound = (barcode: string) => {
//     setScannedNotFoundBarcode(barcode);
//     setOpenNotFoundDialog(true);
//   };

//   return (
//     <Box sx={{ minHeight: "100vh" }}>
//       {/* 1️⃣ Header Section */}
//       <Box>
//         <Typography
//           variant="h4"
//           sx={{ fontWeight: "bold", color: "#1e103c", mb: 1 }}
//         >
//           إستيراد الأدوية للمخزون{" "}
//         </Typography>
//         <Typography variant="body1" sx={{ color: "#6b7280", mb: 3 }}>
//           ابحث في قاعدة البيانات المركزية لتوسيع مستودع صيدليتك المحلي
//         </Typography>
//       </Box>

//       {/* 2️⃣ Search Controls Section */}
//       <Box sx={{ width: "100%", mb: 4 }}>
//         <SearchBarDynamic
//           placeholder="ابحث عن الدواء عبر (الاسم أو الباركود)..."
//           value={queryParams.searchTerm || ""}
//           onChange={(term) =>
//             setQueryParams((prev) => ({ ...prev, searchTerm: term, page: 1 }))
//           }
//           barcodeComponent={
//             <BarcodeCentralDatabase
//               onFindResult={handleOpenAddDialog}
//               onNotFound={handleBarcodeNotFound}
//             />
//           }
//         />
//       </Box>

//       {/* 3️⃣ Dynamic Body View - إدارة الحالات المنطقية */}

//       {!hasPerformedSearch ? (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             py: 10,
//             px: 2,
//             backgroundColor: "#ffffff",
//             borderRadius: "16px",
//             border: "1px solid #e2e8f0",
//             mt: 2,
//           }}
//         >
//           <Box sx={{ mb: 3, color: "#94a3b8" }}>
//             <ManageSearch sx={{ fontSize: 80, color: "#cbd5e1" }} />
//           </Box>
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}
//           >
//             جاهز للبحث في السجل المركزي
//           </Typography>
//           <Typography
//             variant="body2"
//             sx={{ color: "#64748b", maxWidth: "450px", lineHeight: 1.6 }}
//           >
//             ادخل اسم الدواء في حقل البحث أعلاه، أو قم بمسح الباركود باستخدام
//             القارئ الآلي للتحقق من وجود الدواء وجلب بياناته.
//           </Typography>
//         </Box>
//       ) : isLoading ? (
//         <Grid container spacing={3}>
//           {Array.from(new Array(4)).map((_, index) => (
//             <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
//               <CentralDrugCardSkeleton />
//             </Grid>
//           ))}
//         </Grid>
//       ) : isError ? (
//         <Alert severity="error">
//           حدث خطأ أثناء الاتصال بالسجل المركزي:{" "}
//           {error?.message || "Internal Server Error"}
//         </Alert>
//       ) : centralDrugsList.length > 0 ? (
//         <Box>
//           <Typography
//             variant="subtitle1"
//             sx={{ mb: 2, color: "#475569", fontWeight: 600 }}
//           >
//             نتائج البحث المركزية عن "{searchTerm}":
//           </Typography>
//           <Grid container spacing={3}>
//             {centralDrugsList.map((drug) => (
//               <Grid
//                 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
//                 key={drug.generalDrugId}
//               >
//                 <CentralDrugCard drug={drug} onAddClick={handleOpenAddDialog} />
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       ) : (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             py: 8,
//             px: 2,
//             backgroundColor: "#ffffff",
//             borderRadius: "16px",
//             border: "1px solid #e2e8f0",
//             mt: 2,
//           }}
//         >
//           <EmptyState
//             icon={<Search sx={{ fontSize: 70, color: "#94a3b8" }} />}
//             title="لم يتم العثور على الدواء"
//             description={`عذراً، لم نجد أية أدوية مطابقة لـ "${searchTerm}" في السجل المركزي حالياً. يمكنك تعبئة البيانات وإضافة الدواء للمخزن يدوياً.`}
//           />

//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={() => {
//               setScannedNotFoundBarcode(searchTerm);
//               setOpenNotFoundDialog(true);
//             }}
//             sx={{
//               borderRadius: "12px",
//               py: 1.2,
//               px: 3,
//               mt: 3,
//               fontWeight: 600,
//               textTransform: "none",
//               backgroundColor: "primary.main",
//               boxShadow: "0 4px 12px rgba(30, 16, 60, 0.15)",
              
//             }}
//           >
// إضافة الدواء يدوياً          </Button>
//         </Box>
//       )}

//       {/* 4️⃣ Dialogs & Modals */}
//       <FoundMedicineDialog
//         open={openFoundDialog}
//         onClose={() => setOpenFoundDialog(false)}
//         foundDrug={selectedDrug}
//       />

//       <NotFoundMedicineDialog
//         open={openNotFoundDialog}
//         onClose={() => setOpenNotFoundDialog(false)}
//         barcode={scannedNotFoundBarcode}
//       />
//     </Box>
//   );
// };

// export default AddMedicinePage;
import React from "react";
import { Box, Grid, Alert, Typography, Button } from "@mui/material";
import { Search, Add, ManageSearch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
import EmptyState from "../../../shared/layout/EmptyState";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import {
  BarcodeCentralDatabase,
  type CentralDrugData,
} from "../../../shared/layout/BarcodeCentralDatabase";
import { CentralDrugCard } from "../components/AddMedicine/CentralDrugCard";
import { CentralDrugCardSkeleton } from "../components/AddMedicine/CentralDrugCardSkeleton";

export interface CentralDrugsPayload {
  data: CentralDrugData[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const AddMedicinePage: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    isError,
    error,
    queryParams,
    setQueryParams,
  } = useGetWithParams<CentralDrugsPayload>("/general-drugs", {
    searchTerm: "",
    page: 1,
    limit: 12,
  });

  const searchTerm = queryParams.searchTerm?.trim() || "";
  const centralDrugsList = response?.data?.data || [];

  const hasPerformedSearch = searchTerm.length > 0;

  // التوجيه المباشر لصفحة تفاصيل الدواء العام بالـ ID
 const handleNavigateToGeneralDrug = (drug: CentralDrugData) => {
  if (drug?.generalDrugId) {
    navigate(`/pharmacy/inventory/add/${drug.generalDrugId}`, {
      state: {
        drugName: drug.tradeName,
        netPrice: Number(drug.netPrice),
        consumerPrice: Number(drug.consumerPrice),
      },
    });
  }
};

  // التوجيه لصفحة إضافة الدواء الخاص يدوياً مع تمرير الباركود
  const handleNavigateToAddPrivateDrug = (barcode?: string) => {
    navigate("/pharmacy/inventory/add-private", {
      state: { barcode: barcode || "" },
    });
  };

  // عند مسح باركود بالماسح الآلي وتم العثور عليه
  const handleBarcodeFound = (drug: CentralDrugData) => {
    handleNavigateToGeneralDrug(drug);
  };

  // عند مسح باركود بالماسح الآلي ولم يتم العثور عليه
  const handleBarcodeNotFound = (barcode: string) => {
    handleNavigateToAddPrivateDrug(barcode);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* 1️⃣ Header Section */}
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#1e103c", mb: 1 }}
        >
          استيراد الأدوية للمخزون
        </Typography>
        <Typography variant="body1" sx={{ color: "#6b7280", mb: 3 }}>
          ابحث في قاعدة البيانات المركزية لتوسيع مستودع صيدليتك المحلي
        </Typography>
      </Box>

      {/* 2️⃣ Search Controls Section */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <SearchBarDynamic
          placeholder="ابحث عن الدواء عبر (الاسم أو الباركود)..."
          value={queryParams.searchTerm || ""}
          onChange={(term) =>
            setQueryParams((prev) => ({ ...prev, searchTerm: term, page: 1 }))
          }
          barcodeComponent={
            <BarcodeCentralDatabase
              onFindResult={handleBarcodeFound}
              onNotFound={handleBarcodeNotFound}
            />
          }
        />
      </Box>

      {/* 3️⃣ Dynamic Body View */}
      {!hasPerformedSearch ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: 10,
            px: 2,
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            mt: 2,
          }}
        >
          <Box sx={{ mb: 3, color: "#94a3b8" }}>
            <ManageSearch sx={{ fontSize: 80, color: "#cbd5e1" }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}
          >
            جاهز للبحث في السجل المركزي
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", maxWidth: "450px", lineHeight: 1.6 }}
          >
            أدخل اسم الدواء أو الباركود في حقل البحث أعلاه، أو قم بمسح الباركود باستخدام القارئ الآلي للتحقق من وجود الدواء وجلب بياناته.
          </Typography>
        </Box>
      ) : isLoading ? (
        <Grid container spacing={3}>
          {Array.from(new Array(4)).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <CentralDrugCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <Alert severity="error">
          حدث خطأ أثناء الاتصال بالسجل المركزي:{" "}
          {error?.message || "Internal Server Error"}
        </Alert>
      ) : centralDrugsList.length > 0 ? (
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, color: "#475569", fontWeight: 600 }}
          >
            نتائج البحث المركزية عن "{searchTerm}":
          </Typography>
          <Grid container spacing={3}>
            {centralDrugsList.map((drug) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={drug.generalDrugId}
              >
                <CentralDrugCard
                  drug={drug}
                  onAddClick={() => handleNavigateToGeneralDrug(drug)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: 8,
            px: 2,
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            mt: 2,
          }}
        >
          <EmptyState
            icon={<Search sx={{ fontSize: 70, color: "#94a3b8" }} />}
            title="لم يتم العثور على الدواء"
            description={`عذراً، لم نجد أية أدوية مطابقة لـ "${searchTerm}" في السجل المركزي حالياً. يمكنك تعبئة البيانات وإضافة الدواء للمخزن يدوياً.`}
          />

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleNavigateToAddPrivateDrug(searchTerm)}
            sx={{
              borderRadius: "12px",
              py: 1.2,
              px: 3,
              mt: 3,
              fontWeight: 600,
              textTransform: "none",
              backgroundColor: "primary.main",
              boxShadow: "0 4px 12px rgba(30, 16, 60, 0.15)",
            }}
          >
            إضافة الدواء يدوياً
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddMedicinePage;