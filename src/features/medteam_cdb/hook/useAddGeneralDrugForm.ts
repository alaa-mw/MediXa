import { useState } from "react";
import type { DrugFormData } from "../types/generalDrugFormType";

const createInitialFormState = (): DrugFormData => ({
  dosageFormId: "",
  tradeName: "",
  barcode: "",
  unitsPerBox: "",
  netPrice: "",
  consumerPrice: "",
  isRx: false,
  isActive: true,
  ingredients: [
    {
      ingredientId: -1,
      strengthValue: -1,
      unit: "",
    },
  ],
  categoryIds: [],
});

export const useAddGeneralDrugForm = () => {
  const [formData, setFormData] = useState(createInitialFormState());

  const handleInputChange = <K extends keyof DrugFormData>(
    field: K,
    value: DrugFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleIngredientChange = <K extends keyof DrugFormData["ingredients"][number]>(
    index: number,
    field: K,
    value: DrugFormData["ingredients"][number][K]
  ) => {
    setFormData((prev) => {
      const ingredients = [...prev.ingredients];

      ingredients[index] = {
        ...ingredients[index],
        [field]: value,
      };

      return {
        ...prev,
        ingredients,
      };
    });
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        {
          ingredientId: -1,
          strengthValue: -1,
          unit: "",
        },
      ],
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients:
        prev.ingredients.length === 1
          ? [
              {
                ingredientId: -1,
                strengthValue: -1,
                unit: "",
              },
            ]
          : prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData(createInitialFormState());
  };

  const buildRequest = () => ({
    ...formData,

    dosageFormId: Number(formData.dosageFormId),

    unitsPerBox: Number(formData.unitsPerBox),

    netPrice: Number(formData.netPrice),

    consumerPrice: Number(formData.consumerPrice),

    ingredients: formData.ingredients.map((item) => ({
      ingredientId: Number(item.ingredientId),
      strengthValue: Number(item.strengthValue),
      unit: item.unit,
    })),
  });

  

  return {
    formData,
    setFormData,

    handleInputChange,

    handleIngredientChange,

    handleAddIngredient,

    handleRemoveIngredient,

    resetForm,

    buildRequest,
  };
};