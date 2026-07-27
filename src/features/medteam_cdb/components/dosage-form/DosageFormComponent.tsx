import { Grid } from "@mui/material";
import CustomAutocompleteWithPagination from "../../../../shared/layout/CustomAutoCompleteWithPagination";
import type { DosageForm } from "../../types/dosageFormType";
import { useEffect, useState } from "react";
import useDosageForms from "../../hook/useFetchDosageForm";
import DynamicQuickAddModal from "../../../../shared/layout/CustomAutoCompleteWithPagination/DynamicQuickAddModel";
import type { DrugFormData } from "../../types/generalDrugFormType";

interface DosageFormComponentProps {
  handleInputChange: <K extends keyof DrugFormData>(
    field: K,
    value: DrugFormData[K],
  ) => void;
  currentDosageFormId: string | number;
}

const DosageFormComponent = ({
  handleInputChange,
  currentDosageFormId,
}: DosageFormComponentProps) => {
  const [selected, setSelected] = useState<DosageForm | null>(null);

  const dosageForms = useDosageForms();

  useEffect(() => {
    if (!currentDosageFormId || currentDosageFormId === "") {
      setSelected(null);
    }
  }, [currentDosageFormId]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dosageFormFields = [
    {
      name: "dosageFormName",
      label: "اسم الشكل الصيدلاني",
      placeholder: "مثال: Capsule10",
    },
    {
      name: "formCategory",
      label: "الفئة الهيكلية",
      type: "select" as const,
      options: [
        { value: "SOLID", label: "صلب (SOLID)" },
        { value: "LIQUID", label: "سائل (LIQUID)" },
        { value: "SEMI_SOLID", label: "شبه صلب (SEMI_SOLID)" },
        { value: "GAS", label: "غازي (GAS)" },
      ],
    },
  ];

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <CustomAutocompleteWithPagination<DosageForm>
        label="الشكل الصيدلاني"
        placeholder="اختر الشكل الصيدلاني"
        options={dosageForms.options}
        value={selected}
        loading={dosageForms.isLoading}
        pagination={{
          page: dosageForms.page,
          pages: dosageForms.totalPages,
          total: dosageForms.totalItems,
          limit: dosageForms.itemsPerPage,
        }}
        getOptionLabel={(item) => item.dosageFormName}
        isOptionEqualToValue={(a, b) => a.dosageFormId === b.dosageFormId}
        onChange={(item) => {
          setSelected(item);

          if (item) {
            dosageForms.select(item.dosageFormId.toString());
          }

          handleInputChange(
            "dosageFormId",
            item?.dosageFormId.toString() ?? "",
          );
        }}
        onSearch={dosageForms.setSearch}
        onPageChange={dosageForms.setPage}
        onQuickAdd={() => setIsModalOpen(true)}
      />
      <DynamicQuickAddModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title="إضافة شكل صيدلاني جديد"
        apiUrl="/dosage-forms"
        fields={dosageFormFields}
        onSuccessRefetch={dosageForms.refetch}
      />
    </Grid>
  );
};

export default DosageFormComponent;
