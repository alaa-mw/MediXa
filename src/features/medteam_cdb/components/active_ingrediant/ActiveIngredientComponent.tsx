import { Box, Grid, TextField, Button, IconButton } from "@mui/material";
// استيراد المكون الجديد الموحد
import CustomAutocompleteWithPagination from "../../../../shared/layout/CustomAutoCompleteWithPagination";
import textfieldStyle from "../../../../shared/constants/textFieldStyle";
import useActiveIngredients from "../../hook/useFetchActiveIngrediant";
import { AddCircle, Delete } from "@mui/icons-material";
// import type { DrugFormData } from "../../types/drugFormType";
import type { DrugFormData } from "../../types/generalDrugFormType";
import DynamicQuickAddModal from "../../../../shared/layout/CustomAutoCompleteWithPagination/DynamicQuickAddModel";
import { useState } from "react";
import type { ActiveIngredientApiResponse } from "../../types/activeIngrediantType";

const units = ["mg", "g", "mcg", "IU", "mL", "%"];

const activeIngrediantField = [
  {
    name: "ingredientName",
    label: "المادة الفعالة",
    placeholder: "مثال: Ibuprofen",
  },
  {
    name: "description",
    label: " الوصف",
    placeholder: "مثال: Non-steroidal anti-inflammatory drug",
  },
];

interface ActiveIngredientFormProps {
  ingredients: {
    ingredientId: number;
    strengthValue: number;
    unit: string;
  }[];
  onIngredientChange: <K extends keyof DrugFormData["ingredients"][number]>(
    index: number,
    subField: K,
    value: DrugFormData["ingredients"][number][K],
  ) => void;
  onAddIngredient: () => void;
  onRemoveIngredient: (index: number) => void;
}

const ActiveIngredientForm = ({
  ingredients,
  onIngredientChange,
  onAddIngredient,
  onRemoveIngredient,
}: ActiveIngredientFormProps) => {
  // يفضّل التأكد من أن الـ hook يرجع دوال التصفح والبحث مستقبلاً
  const {
    activeIngredients,
    isLoading,
    refetch,
    page: activeIngredientsPage,
    totalPages,
    totalItems,
    itemsPerPage,
    setPage,
    setSearch,
  } = useActiveIngredients();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Grid size={{ xs: 12 }}>
      {ingredients.map((item, index) => {
        // العثور على كائن المادة الفعالة الكامل بناءً على الـ Id المخزن
        const selectedIngredientObj =
          activeIngredients.find(
            (ing) => ing.ingredientId === item.ingredientId,
          ) || null;

        return (
          <Grid
            container
            spacing={3}
            key={index}
            sx={{
              alignItems: "center",
              mb: index !== ingredients.length - 1 ? 2 : 0,
            }}
          >
            {/* 1. حقل اختيار المادة الفعالة بالـ Pagination */}
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomAutocompleteWithPagination<ActiveIngredientApiResponse>
                label={`المادة الفعالة (${index + 1})`}
                placeholder="اختر المادة الفعالة"
                options={activeIngredients}
                value={selectedIngredientObj}
                loading={isLoading}
                // تجهيز الـ Pagination للمستقبل (لو لم تكن موجودة حالياً بالـ hook نضع قيم افتراضية)
                pagination={{
                  page: activeIngredientsPage,
                  pages: totalPages,
                  total: totalItems,
                  limit: itemsPerPage,
                }}
                getOptionLabel={(option) => option.ingredientName}
                isOptionEqualToValue={(a, b) =>
                  a.ingredientId === b.ingredientId
                }
                onChange={(selectedItem) => {
                  onIngredientChange(
                    index,
                    "ingredientId",
                    selectedItem ? selectedItem.ingredientId : -1,
                  );
                }}
                onSearch={setSearch}
                onPageChange={setPage}
                onQuickAdd={() => setIsModalOpen(true)}
              />
              <DynamicQuickAddModal
                open={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                }}
                title="إضافة مادة فعالة جديدة"
                apiUrl="/active-ingredients"
                fields={activeIngrediantField}
                onSuccessRefetch={refetch}
              />
            </Grid>

            {/* 2. حقل التركيز وحقل الوحدة العادي */}
            <Grid size={{ xs: 10, md: 5 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="التركيز"
                  type="number"
                  placeholder="500"
                  fullWidth={true}
                  sx={textfieldStyle}
                  value={item.strengthValue === -1 ? "" : item.strengthValue}
                  onChange={(e) =>
                    onIngredientChange(
                      index,
                      "strengthValue",
                      e.target.value === "" ? -1 : Number(e.target.value),
                    )
                  }
                />

                {/* حقل الوحدة يبقى بدون Pagination لأنه مصفوفة ثابتة (strings) */}
                <CustomAutocompleteWithPagination<string>
                  label="الوحدة"
                  placeholder="اختر"
                  options={units}
                  value={item.unit || null}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(a, b) => a === b}
                  onChange={(newValue) =>
                    onIngredientChange(index, "unit", newValue || "")
                  }
                  // بما أنها مصفوفة ثابتة، نمرر كائن صفحة واحد وهمي ليتوافق مع التايبس
                  // pagination={{
                  //   page: 1,
                  //   pages: 1,
                  //   total: units.length,
                  //   limit: units.length,
                  // }}
                  onPageChange={() => {}} // لا حاجة لتغيير الصفحة هنا
                />
              </Box>
            </Grid>

            <Grid
              size={{ xs: 2, md: 1 }}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                color="error"
                onClick={() => onRemoveIngredient(index)}
                disabled={ingredients.length === 1 && item.ingredientId === -1}
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}

      {/* زر إضافة مادة جديدة أسفل العناصر */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AddCircle />}
          onClick={onAddIngredient}
          sx={{ borderRadius: "10px", fontFamily: "inherit" }}
        >
          إضافة مادة فعالة أخرى
        </Button>
      </Box>
    </Grid>
  );
};

export default ActiveIngredientForm;
