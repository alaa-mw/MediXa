import {  useState } from "react";
import { useDebounce } from "../../../shared/hooks/useDebounce"; 
import type { PharmacyDrug, PharmacyDrugsResponse } from "../types/inventory";
import useGetWithParamsWithoutState from "../../../shared/hooks/useGetWithParamsWithoutState";

export const useInventoryData = (itemsPerPage = 20) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500); 
  
  const [activeTab, setActiveTab] = useState("الكل");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useGetWithParamsWithoutState(
    "/pharmacy-drugs/get-all-pharmacy-drugs",
    {
      page: currentPage,
      limit: itemsPerPage,
      name: debouncedSearch.trim() || undefined,
      // category: activeTab !== "الكل" ? activeTab : undefined, 
    }
  );

  // const { data, isLoading, setQueryParams, isError, error } = useGetWithParams(
  //   "/pharmacy-drugs/get-all-pharmacy-drugs",
  //   {
  //     page: 1,
  //     limit: itemsPerPage,
  //     name: undefined,
  //   }
  // );

  // useEffect(() => {
  //   setQueryParams({
  //     page: currentPage,
  //     limit: itemsPerPage,
  //     name: debouncedSearch.trim() || undefined,
  //   });
  // }, [currentPage, debouncedSearch, itemsPerPage, setQueryParams]);

  const apiResponse = data as unknown as PharmacyDrugsResponse;
  const pharmacyDrugsList: PharmacyDrug[] = apiResponse?.data?.pharmacyDrugs || [];
  const totalPages: number = apiResponse?.data?.pages || 1;

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1); 
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); 
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isInventoryEmpty = 
    pharmacyDrugsList.length === 0 && 
    !debouncedSearch.trim() && 
    activeTab === "الكل" &&
    !isLoading; 

  return {
    searchValue,
    activeTab,
     setActiveTab: handleTabChange, 
    currentPage,
    pharmacyDrugsList,
    totalPages,
    isLoading,
    isError,
    error,
    isInventoryEmpty,
    handleSearch,
    handlePageChange,
  };
};