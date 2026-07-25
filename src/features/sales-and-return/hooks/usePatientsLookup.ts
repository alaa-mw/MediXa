// // hooks/usePatientsLookup.ts

import { useState, useEffect, useMemo } from "react";
import type { PatientsApiResponse, Patient } from "../types/patient";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import useGetWithParamsWithoutState from "../../../shared/hooks/useGetWithParamsWithoutState";
import type { AutocompleteOption } from "../components/FilterAutocomplete"; 

// export const usePatientsLookup = () => {
//   const [page, setPage] = useState(1);
//   const [inputValue, setInputValue] = useState("");
//   const [accumulatedOptions, setAccumulatedOptions] = useState<AutocompleteOption[]>([]);

//   // 1. تطبيق الـ Debounce لمنع كثرة الطلبات أثناء الكتابة
//   const debouncedSearch = useDebounce<string>(inputValue, 400);

//   // 2. تصفير الصفحة والخيارات المخزنة عند بدء بحث جديد
//   useEffect(() => {
//     setPage(1);
//     setAccumulatedOptions([]);
//   }, [debouncedSearch]);

//   // 3. بناء الـ Parameters الموجهة للسيرفر
//   const queryParams = useMemo(() => {
//     return {
//       page,
//       limit: 20,
//       ...(debouncedSearch ? { search: debouncedSearch } : {}),
//     };
//   }, [page, debouncedSearch]);

//   // 4. استدعاء الـ Hook العام
//   const queryResult = useGetWithParamsWithoutState<PatientsApiResponse>("/patient", queryParams);

//   // 5. فك التغليف للبيانات بأمان
//   const apiResponse: PatientsApiResponse | undefined = queryResult.data?.data;
//   const fetchedPatients: Patient[] = apiResponse?.data || [];
//   const hasNextPage: boolean = apiResponse?.meta?.hasNextPage || false;

//   // 6. دمج الصفحات المتتالية ومنع تكرار الـ IDs
//   useEffect(() => {
//     if (fetchedPatients.length === 0 && page === 1) {
//       setAccumulatedOptions([]);
//       return;
//     }

//     setAccumulatedOptions((prev) => {
//       const formatted: AutocompleteOption[] = fetchedPatients.map((p: Patient) => ({
//         id: p.patientId,
//         name: p.fullName,
//       }));

//       const map = new Map<number | string, AutocompleteOption>();
      
//       if (page > 1) {
//         prev.forEach((op: AutocompleteOption) => map.set(op.id, op));
//       }
      
//       formatted.forEach((op: AutocompleteOption) => map.set(op.id, op));
//       return Array.from(map.values());
//     });
//   }, [fetchedPatients, page]);

//   // 7. دالة طلب الصفحة التالية عند السكرول لقاع القائمة
//   const loadMore = () => {
//     if (hasNextPage && !queryResult.isFetching && !queryResult.isLoading) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   // 💡 إضافة الدالة المتوقعة من قبل FilterAutocomplete لتحديث النص
//   const onSearchChange = (text: string) => {
//     setInputValue(text);
//   };

//   return {
//     options: accumulatedOptions,
//     loading: queryResult.isLoading || queryResult.isFetching,
//     inputValue,
//     onSearchChange, // 💡 تم توفيرها هنا لحل خطأ الـ Typescript
//     loadMore,
//   };
// };

// export default usePatientsLookup;

// hooks/usePatientsLookup.ts
export const usePatientsLookup = () => {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [accumulatedOptions, setAccumulatedOptions] = useState<AutocompleteOption[]>([]);

  const debouncedSearch = useDebounce<string>(inputValue, 400);

  useEffect(() => {
    setPage(1);
    setAccumulatedOptions([]);
  }, [debouncedSearch]);

  const queryParams = useMemo(() => ({
    page,
    limit: 20,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  }), [page, debouncedSearch]);

  // إصلاح الرابط هنا: تأكد أن المسار لا يبدأ بـ /api إذا كان الـ Hook العام يضيفه
  const queryResult = useGetWithParamsWithoutState<PatientsApiResponse>("/patient", queryParams);

  const fetchedPatients: Patient[] = queryResult.data?.data?.data || [];
  const hasNextPage: boolean = queryResult.data?.data?.meta?.hasNextPage || false;

  useEffect(() => {
    if (queryResult.isLoading || queryResult.isFetching) return;

    setAccumulatedOptions((prev) => {
      const formatted: AutocompleteOption[] = fetchedPatients.map((p: Patient) => ({
        id: p.patientId,
        name: p.fullName,
      }));

      const map = new Map<number | string, AutocompleteOption>();
      if (page > 1) prev.forEach((op) => map.set(op.id, op));
      formatted.forEach((op) => map.set(op.id, op));
      
      const newOptions = Array.from(map.values());
      
      // منع التحديث إذا كانت البيانات متطابقة تماماً لتجنب الـ Loop
      if (JSON.stringify(prev) === JSON.stringify(newOptions)) return prev;
      return newOptions;
    });
  }, [fetchedPatients, page, queryResult.isLoading, queryResult.isFetching]);

  const loadMore = () => {
    if (hasNextPage && !queryResult.isFetching && !queryResult.isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  const onSearchChange = (text: string) => setInputValue(text);

  return {
    options: accumulatedOptions,
    loading: queryResult.isLoading || queryResult.isFetching,
    inputValue,
    onSearchChange,
    loadMore,
  };
};