import { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Tooltip,
  Chip,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { BarcodeReader, PlusOne, Search } from "@mui/icons-material";
import useGetWithParams from "../../../../shared/hooks/useGetWithParams";
import type { PharmacyDrug, SearchDrugResponse } from "../../types/searchDrug";
import type { FetchResponse } from "../../../../shared/api/api-types";

const DrugSearch = ({
  onSelect,
  width,
}: {
  onSelect: (pharmacyDrug: PharmacyDrug) => void;
  width: number | undefined;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [, setIsManualModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const localScrollRootRef = useRef<HTMLDivElement | null>(null);
  const generalScrollRootRef = useRef<HTMLDivElement | null>(null);
  const localSentinelRef = useRef<HTMLDivElement | null>(null);
  const generalSentinelRef = useRef<HTMLDivElement | null>(null);
  const localRequestingRef = useRef(false);
  const generalRequestingRef = useRef(false);
  const queryClient = useQueryClient();

  const { data, queryParams, setQueryParams, isFetching } =
    useGetWithParams<SearchDrugResponse>(
      "/pharmacy-drugs/search-in-stock-and-cdb/by-name",
      {
        name: "",
        page: 1,
        limit: 10,
        generalPage: 1,
        generalLimit: 4,
      },
      {
        shouldFetch: (params) => String(params.name ?? "").trim().length >= 3,
      },
    );

  type GeneralDrugItem = SearchDrugResponse["generalDrugs"]["items"][number];

  const searchName = String(queryParams.name ?? "").trim();
  const canSearch = searchName.length >= 3;

  // const searchName = String(queryParams.name ?? "");
  // const hasMinSearchLength = searchName.trim().length >= 3;

  const resetSearch = () => {
    setQueryParams((prev) => ({
      ...prev,
      name: "",
      page: 1,
      generalPage: 1,
    }));
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

  const readParamsFromQueryKey = (
    queryKey: unknown,
  ): Record<string, unknown> => {
    if (!Array.isArray(queryKey) || queryKey.length < 2) return {};
    const params = queryKey[1];
    if (!params || typeof params !== "object") return {};
    return params as Record<string, unknown>;
  };

  const localResults = useMemo(() => {
    if (!canSearch) return [] as PharmacyDrug[];

    const cached = queryClient.getQueriesData<
      FetchResponse<SearchDrugResponse>
    >({
      queryKey: ["/pharmacy-drugs/search-in-stock-and-cdb/by-name"],
    });

    const pages = cached
      .map(([queryKey, value]) => {
        const params = readParamsFromQueryKey(queryKey);
        const name = String(params.name ?? "").trim();
        const page = Number(params.page ?? 1);
        const items = value?.data?.pharmacyDrugs?.items ?? [];
        return { name, page, items };
      })
      .filter((p) => p.name === searchName)
      .sort((a, b) => a.page - b.page);

    const seen = new Set<string>();
    const merged: PharmacyDrug[] = [];
    pages.forEach((p) => {
      p.items.forEach((item) => {
        if (seen.has(item.pharmacyDrugId)) return;
        seen.add(item.pharmacyDrugId);
        merged.push(item);
      });
    });

    return merged;
  }, [canSearch, queryClient, searchName]);

  const generalResults
   = useMemo(() => {
    if (!canSearch) return [] as GeneralDrugItem[];

    const cached = queryClient.getQueriesData<
      FetchResponse<SearchDrugResponse>
    >({
      queryKey: ["/pharmacy-drugs/search-in-stock-and-cdb/by-name"],
    });

    const pages = cached
      .map(([queryKey, value]) => {
        const params = readParamsFromQueryKey(queryKey);
        const name = String(params.name ?? "").trim();
        const page = Number(params.generalPage ?? 1);
        const items = value?.data?.generalDrugs?.items ?? [];
        return { name, page, items };
      })
      .filter((p) => p.name === searchName)
      .sort((a, b) => a.page - b.page); 

    const seen = new Set<string>();
    const merged: GeneralDrugItem[] = [];
    pages.forEach((p) => {
      p.items.forEach((item) => {
        if (seen.has(item.generalDrugId)) return; 
        seen.add(item.generalDrugId);
        merged.push(item);
      });
    });

    return merged;
  }, [canSearch, queryClient, searchName]);
  // = data?.data?.generalDrugs?.items ?? [];

  const hasMoreLocal =
    (data?.data?.pharmacyDrugs?.items?.length ?? 0) >=
    Number(queryParams.limit || 10);
  const hasMoreGeneral =
    (data?.data?.generalDrugs?.items?.length ?? 0) >=
    Number(queryParams.generalLimit || 10);

  useEffect(() => {
    if (!isFetching) {
      localRequestingRef.current = false;
      generalRequestingRef.current = false;
    }
  }, [isFetching]);

  useEffect(() => {
    if (
      !isDropdownOpen ||
      !canSearch ||
      !localScrollRootRef.current ||
      !localSentinelRef.current ||
      !hasMoreLocal
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (isFetching || localRequestingRef.current || !hasMoreLocal) return;

        localRequestingRef.current = true;
        setQueryParams((prev) => ({ ...prev, page: (prev.page || 1) + 1 }));
      },
      {
        root: localScrollRootRef.current,
        rootMargin: "0px 0px 100px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(localSentinelRef.current);
    return () => observer.disconnect();
  }, [
    canSearch,
    hasMoreLocal,
    isDropdownOpen,
    isFetching,
    localResults.length,
    setQueryParams,
  ]);

  useEffect(() => {
    if (
      !isDropdownOpen ||
      !canSearch ||
      !generalScrollRootRef.current ||
      !generalSentinelRef.current ||
      !hasMoreGeneral
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (isFetching || generalRequestingRef.current || !hasMoreGeneral)
          return;

        generalRequestingRef.current = true;
        console.log("Loading more general results...");
        setQueryParams((prev) => ({
          ...prev,
          generalPage: (prev.generalPage || 1) + 1,
        }));
      },
      {
        root: generalScrollRootRef.current,
        rootMargin: "0px 0px 100px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(generalSentinelRef.current);
    return () => observer.disconnect();
  }, [
    canSearch,
    generalResults.length,
    hasMoreGeneral,
    isDropdownOpen,
    isFetching,
    setQueryParams,
  ]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "22vh",
        width,
        zIndex: 100,
        mb: 2,
      }}
      ref={dropdownRef}
    >
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
            setQueryParams((prev) => ({
              ...prev,
              name: e.target.value,
              page: 1,
              generalPage: 1,
            }));
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
            p: 2,
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
              <Box ref={localSentinelRef} sx={{ height: 1 }} />
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
              <Box ref={generalSentinelRef} sx={{ height: 1 }} />
            </Box>
          </Box>

          {/* Category 3: Not Found in DB / Custom Addition */}
          <Box
            sx={{
              border: "2px dashed #D3CAD6",
              borderRadius: "20px",
              p: 1,
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
                  sx={{ fontWeight: 800, fontSize: "14px", color: "#2E1A30" }}
                >
                  لم تجد الدواء في قاعدة البيانات؟
                </Typography>
                {/* <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#8B7D8C",
                    fontWeight: 500,
                    mt: 0.5,
                  }}
                >
                  يمكنك إضافة تعريف جديد كلياً لهذا الدواء وتثبيته في سجلاتك.
                </Typography> */}
              </Box>
            </Box>
            <Button
              variant="contained"
              onClick={() => {
                setIsManualModalOpen(true);
              }}
              sx={{
                bgcolor: "#5E3E63",
                color: "#FFFFFF",
                borderRadius: "24px",
                px: 3,
                py: 1.2,
                fontWeight: 800,
                fontSize: "12px",
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
              إضافة دواء جديد يدوياً
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default DrugSearch;
