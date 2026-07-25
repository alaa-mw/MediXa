// features/inventory/components/DrugCategoryComponent.tsx
import { Grid } from "@mui/material";
import { useMemo, useState } from "react";
import { useDrugCategories } from "../hook/useFetchDrugCategory";
import type { DrugCategoryForm } from "../types/drugCategoryType";
import CustomMultiAutocompleteWithPagination from "../../../shared/layout/CustomMultiAutoComplete";
import DynamicQuickAddModal from "../../../shared/layout/CustomAutoCompleteWithPagination/DynamicQuickAddModel";

interface Props {
  categoryIds: number[];
  onChange: (categoryIds: number[]) => void;
}

const DrugCategoryComponent = ({ categoryIds, onChange }: Props) => {
  const drugCategories = useDrugCategories();

  const selectedCategories = useMemo(() => {
    return drugCategories.options.filter((category) =>
      categoryIds.includes(category.categoryId),
    );
  }, [drugCategories.options, categoryIds]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoryFormFields = [
    {
      name: "categoryName",
      label: "الفئة الدوائية",
      placeholder: "مثال: Analgesics",
    },
    {
      name: "description",
      label: " الوصف",
      placeholder: "مثال: Pain relievers",
    },
  ];

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <CustomMultiAutocompleteWithPagination<DrugCategoryForm>
        label="الفئات الدوائية"
        placeholder="اختر الفئات الدوائية"
        options={drugCategories.options}
        value={selectedCategories}
        loading={drugCategories.isLoading}
        pagination={{
          page: drugCategories.page,
          pages: drugCategories.totalPages,
          total: drugCategories.totalItems,
          limit: drugCategories.itemsPerPage,
        }}
        getOptionLabel={(item) => item.categoryName}
        isOptionEqualToValue={(a, b) => a.categoryId === b.categoryId}
        onChange={(items) => {
          // استخراج الـ IDs من الكائنات المختارة وتمريرها للخارج
          const ids = items.map((item) => item.categoryId);
          onChange(ids);
        }}
        onSearch={drugCategories.setSearch}
        onPageChange={drugCategories.setPage}
        onQuickAdd={() => setIsModalOpen(true)}
      />
      <DynamicQuickAddModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title="إضافة فئة دوائية جديدة"
        apiUrl="/drug-categories"
        fields={categoryFormFields}
        onSuccessRefetch={drugCategories.refetch}
      />
    </Grid>
  );
};

export default DrugCategoryComponent;
