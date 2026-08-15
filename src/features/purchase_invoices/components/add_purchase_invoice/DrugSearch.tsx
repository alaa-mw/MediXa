import { useState, useEffect, useRef, useMemo } from "react";
import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import useGetWithParams from "../../../../shared/hooks/useGetWithParams";
import type {
  PharmacyDrug,
  PharmacyDrugResult,
  SearchDrugResponse,
} from "../../types/searchDrug";
import type { FetchResponse } from "../../../../shared/api/api-types";
import BarcodeAllDrugs from "../../../../shared/layout/BarcodeAllDrugs";
import SearchBarDynamic from "../../../../shared/layout/SearchBarDynamic";
import {
  FoundMedicineDialog,
  type FoundDrugPreview,
} from "../../../inventory/components/AddMedicine/MedicineFoundDialog";
import SearchDropdown from "./search/SearchDropdown";
import LocalResultsSection from "./search/LocalResultsSection";
import GeneralResultsSection from "./search/GeneralResultsSection";
import ManualAddSection from "./search/ManualAddSection";

const DrugSearch = ({
  onSelect,
  width,
}: {
  onSelect: (pharmacyDrug: PharmacyDrugResult) => void;
  width: number | undefined;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [, setIsManualModalOpen] = useState(false);
  const [openFoundDialog, setOpenFoundDialog] = useState(false);
  const [selectedGeneralDrug, setSelectedGeneralDrug] =
    useState<FoundDrugPreview | null>(null);
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
  const handleAddDrugToInvoice = (drug: PharmacyDrugResult) => {
    console.log("Adding drug with ID:", drug);
    onSelect(drug);
    setIsDropdownOpen(false);
    resetSearch();
  };

  // 2. Add item from Central Database ("Augmentin")
  const handleAddCentralDB = (generalDrug: GeneralDrugItem) => {
    setSelectedGeneralDrug({
      generalDrugId: Number(generalDrug.generalDrugId),
      tradeName: generalDrug.tradeName,
      dosageForm: generalDrug.dosageForm,
    });
    setIsDropdownOpen(false);
    setOpenFoundDialog(true);
  };

  const handleCentralDrugSaved = (createdDrug: unknown) => {
    const created = createdDrug as {
      pharmacyDrugId?: string | number;
      id?: string | number;
      tradeName?: string;
    } | null;

    const pharmacyDrugId = created?.pharmacyDrugId ?? created?.id;
    if (!pharmacyDrugId) {
      return;
    }

    handleAddDrugToInvoice({
      pharmacyDrugId: String(pharmacyDrugId),
      tradeName: created?.tradeName || selectedGeneralDrug?.tradeName || "",
    });

    setOpenFoundDialog(false);
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

  const generalResults = useMemo(() => {
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

    // Build a set of generalDrugIds that already exist in localResults (source === 'GENERAL')
    const existingGeneralIds = new Set(
      localResults
        .filter((lr) => String(lr.source || "").toUpperCase() === "GENERAL")
        .map((lr) => String(lr.sourceDrugId)),
    );

    const seen = new Set<string>();
    const merged: GeneralDrugItem[] = [];
    pages.forEach((p) => {
      p.items.forEach((item) => {
        if (seen.has(item.generalDrugId)) return;
        if (existingGeneralIds.has(String(item.generalDrugId))) return; // skip already-available
        seen.add(item.generalDrugId);
        merged.push(item);
      });
    });

    return merged;
  }, [canSearch, queryClient, searchName, localResults]);
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
        top: { xs: "30vh", md: "22vh" },
        width,
        zIndex: 100,
        mb: 2,
      }}
      ref={dropdownRef}
    >
      <SearchBarDynamic<SearchDrugResponse>
        placeholder="ابحث عن دواء (اسم أو باركود)..."
        onChange={(term) => {
          setQueryParams((prev) => ({
            ...prev,
            name: term,
            page: 1,
            generalPage: 1,
          }));
          setIsDropdownOpen(true);
        }}
        barcodeComponent={
          <BarcodeAllDrugs
            onFindResult={(result) => {
              console.log("تم العثور على الدواء:", result);
              if (result && result.type === "PHARMACY") {
                const convertedResult: PharmacyDrugResult = {
                  pharmacyDrugId: result.id,
                  tradeName: result.tradeName,
                };
                handleAddDrugToInvoice(convertedResult);
              } else if (result && result.type === "GENERAL") {
                console.log(
                  "تم العثور على دواء عام من قاعدة البيانات المركزية:",
                  result,
                );
              }
            }}
          />
        }
      />
      {/* ==========================================
          THE CORE DROPDOWN COMPONENT (High Fidelity Style)
          ========================================== */}
      {isDropdownOpen && (
        <SearchDropdown>
          <LocalResultsSection
            localResults={localResults}
            localScrollRootRef={localScrollRootRef}
            localSentinelRef={localSentinelRef}
            onAddDrugToInvoice={handleAddDrugToInvoice}
          />

          <GeneralResultsSection
            generalResults={generalResults}
            generalScrollRootRef={generalScrollRootRef}
            generalSentinelRef={generalSentinelRef}
            onAddCentralDB={handleAddCentralDB}
          />

          <ManualAddSection onManualAdd={() => setIsManualModalOpen(true)} />
        </SearchDropdown>
      )}

      <FoundMedicineDialog
        open={openFoundDialog}
        onClose={() => {
          setOpenFoundDialog(false);
          setSelectedGeneralDrug(null);
          resetSearch();
        }}
        foundDrug={selectedGeneralDrug}
        onSuccess={handleCentralDrugSaved}
      />
    </Box>
  );
};

export default DrugSearch;
