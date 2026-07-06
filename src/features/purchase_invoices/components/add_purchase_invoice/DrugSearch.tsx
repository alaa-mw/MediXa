import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Tooltip,
  Chip,
} from "@mui/material";
import { BarcodeReader, PlusOne, Search } from "@mui/icons-material";
import useGetWithParams from "../../../../shared/hooks/useGetWithParams";
import type { PharmacyDrug, SearchDrugResponse } from "../../types/searchDrug";

const DrugSearch = ({
  onSelect,
}: {
  onSelect: (pharmacyDrug: PharmacyDrug) => void;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Manual drug form state
  const [manualDrugName, setManualDrugName] = useState("");

  const { data, queryParams, setQueryParams } =
    useGetWithParams<SearchDrugResponse>(
      "/pharmacy-drugs/search-in-stock-and-cdb/by-name",
      {
        name: "",
        page: 1,
        limit: 10,
      },
      {
        shouldFetch: (params) => String(params.name ?? "").trim().length >= 3,
      },
    );

  // const searchName = String(queryParams.name ?? "");
  // const hasMinSearchLength = searchName.trim().length >= 3;

  const resetSearch = () => {
    setQueryParams((prev) => ({ ...prev, name: "", page: 1 }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. Add item from Local Stock ("Panadol")
  const handleAddDrugToInvoice = (drug: PharmacyDrug) => {
    console.log("Adding drug with ID:", drug);
    onSelect(drug);
    setIsDropdownOpen(false);
    resetSearch();
  };

  // 2. Add item from Central Database ("Augmentin")
  const handleAddCentralDB = () => {
    console.log("handleAddCentralDB");
    setIsDropdownOpen(false);
    resetSearch();
  };

  // 3. Add Custom Manual Drug
  const handleAddManualSubmit = () => {
    if (!manualDrugName.trim()) return;

    console.log("handleAddManualSubmit");

    setIsManualModalOpen(false);
    setIsDropdownOpen(false);
    resetSearch();
    // Reset form
    setManualDrugName("");
  };
  return (
    <Box sx={{ position: "relative", mb: 2 }} ref={dropdownRef}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#FFFFFF",
          border: "1.5px solid #E2E8F0",
          borderRadius: "16px",
          px: 2,
          py: 1.5,
          height: 48,
          transition: "all 0.2s ease-in-out",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          "&:hover, &:focus-within": {
            borderColor: "#2C6470",
            boxShadow: "0 10px 15px -3px rgba(44, 100, 112, 0.1)",
          },
        }}
      >
        <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
          <Search />
        </Box>
        <input
          type="text"
          placeholder="ابحث عن دواء (اسم أو باركود)..."
          value={queryParams.name}
          onFocus={() => setIsDropdownOpen(true)}
          onChange={(e) => {
            setQueryParams((prev) => ({ ...prev, name: e.target.value }));
            setIsDropdownOpen(true);
          }}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: "15px",
            fontFamily: "inherit",
            color: "#1E293B",
            backgroundColor: "transparent",
            textAlign: "right",
          }}
        />
        {/* Left side scanner button */}
        <Tooltip title="المسح بالباركود">
          <IconButton
            size="small"
            sx={{ ml: 1, bgcolor: "#F0F5F6", borderRadius: "10px", p: 1 }}
          >
            <BarcodeReader />
          </IconButton>
        </Tooltip>
      </Box>

      {/* ==========================================
          THE CORE DROPDOWN COMPONENT (High Fidelity Style)
          ========================================== */}
      {isDropdownOpen && (
        <Paper
          sx={{
            position: "absolute",
            top: "115%",
            left: 0,
            right: 0,
            zIndex: 100,
            borderRadius: "24px",
            border: "1px solid #ECE8EF",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            p: 3,
            bgcolor: "#FFFFFF",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          {/* Category 1: Local Inventory Results */}
          <Box
            sx={{
              mb: 3,
            }}
          >
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
              <span
                style={{ fontWeight: 500, color: "gray", fontSize: "12px" }}
              >
                {" "}
                (اضغط على الدواء لاضافته للفاتورة)
              </span>
            </Typography>
            <Box
              sx={{
                maxHeight: "120px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {data?.data.pharmacyDrugs.items.length === 0 && (
                <Box
                  sx={{
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
              {data?.data.pharmacyDrugs.items.map((drug) => (
                <Box
                  component="div"
                  key={drug.pharmacyDrugId}
                  onClick={() => handleAddDrugToInvoice(drug)}
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
                    {/* <MedicalInformation /> */}
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
                  {/* <Button
                    variant="contained"
                    onClick={() => handleAddDrugToInvoice(drug.pharmacyDrugId)}
                    sx={{
                      bgcolor: "#235B64",
                      color: "#FFFFFF",
                      borderRadius: "24px",
                      px: 3,
                      py: 1,
                      fontWeight: 800,
                      fontSize: "13px",
                      boxShadow: "none",
                      textTransform: "none",
                      whiteSpace: "nowrap",
                      alignSelf: { xs: "stretch", sm: "auto" },
                      "&:hover": {
                        bgcolor: "#1A464E",
                        boxShadow: "0 4px 12px rgba(35, 91, 100, 0.2)",
                      },
                    }}
                  >
                    إضافة للفاتورة +
                  </Button> */}
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
            </Box>
          </Box>

          {/* Category 2: Central Database */}
          <Box
            sx={{
              mb: 3,
            }}
          >
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
              sx={{
                maxHeight: "120px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {data?.data.generalDrugs.items.map((general) => (
                <Box
                  key={general.generalDrugId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "#F8F6F9",
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
                          color: "#5E3A60",
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
                    onClick={handleAddCentralDB}
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
            </Box>
          </Box>

          {/* Category 3: Not Found in DB / Custom Addition */}
          <Box
            sx={{
              border: "2px dashed #D3CAD6",
              borderRadius: "20px",
              p: 2,
              bgcolor: "#FAF8FB",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
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
              <PlusOne />
              <Box>
                <Typography
                  sx={{ fontWeight: 800, fontSize: "15px", color: "#2E1A30" }}
                >
                  لم تجد الدواء في قاعدة البيانات؟
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#8B7D8C",
                    fontWeight: 500,
                    mt: 0.5,
                  }}
                >
                  يمكنك إضافة تعريف جديد كلياً لهذا الدواء وتثبيته في سجلاتك.
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              onClick={() => setIsManualModalOpen(true)}
              sx={{
                bgcolor: "#5E3E63",
                color: "#FFFFFF",
                borderRadius: "24px",
                px: 3,
                py: 1.2,
                fontWeight: 800,
                fontSize: "13px",
                boxShadow: "0 6px 16px rgba(94, 62, 99, 0.15)",
                textTransform: "none",
                whiteSpace: "nowrap",
                alignSelf: { xs: "stretch", md: "auto" },
                display: "flex",
                gap: 1,
                "&:hover": {
                  bgcolor: "#4C3150",
                  boxShadow: "0 10px 20px rgba(94, 62, 99, 0.25)",
                },
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              <span>إضافة دواء جديد يدوياً</span>
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default DrugSearch;
