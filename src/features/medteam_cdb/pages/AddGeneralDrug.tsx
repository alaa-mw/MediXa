import { Box, Container, Grid } from "@mui/material";
import SectionCard from "../components/SectionCard";
import SectionTitle from "../components/SectionTitle";
import {
  CategoryOutlined,
  MedicationOutlined,
  PaidOutlined,
} from "@mui/icons-material";
import { CustomTextField } from "../../inventory/components/CustomTextField";
import AddDrugFormAction from "../components/AddDrugFormAction";
import CdbHeaderAndInfoCard from "../components/CdbHeaderAndInfoCard";
import { useBarcodeScanner } from "../../../shared/services/useBarcodeScanner";
import DosageFormComponent from "../components/dosage-form/DosageFormComponent";
import ActiveIngredientForm from "../components/active_ingrediant/ActiveIngredientComponent";
import DrugCategoryComponent from "../components/DrugCategoryComponent";
import RxToggleField from "../components/RxToggleField";
import { usePostData } from "../../../shared/hooks/usePostData";
import { useSnackbar } from "../../../shared/providers/useSnackbar";
import { useAddGeneralDrugForm } from "../hook/useAddGeneralDrugForm";

const AddGeneralDrug = () => {
  const {
    formData,
    setFormData,
    handleInputChange,
    handleIngredientChange,
    handleAddIngredient,
    handleRemoveIngredient,
    resetForm,
    buildRequest,
  } = useAddGeneralDrugForm();

  const { mutate: createGeneralDrug, isPending } =
    usePostData("/general-drugs");
  const { showSnackbar } = useSnackbar();

  const handleSave = () => {
    createGeneralDrug(buildRequest(), {
      onSuccess: () => {
        showSnackbar("تم إضافة الدواء بنجاح", "success");
        resetForm();
      },

      onError: (error) => {
        showSnackbar(error.message, "error");
      },
    });
  };

  useBarcodeScanner({
    onScan: (scannedCode) => {
      console.log("تم تلقي الباركود من القارئ الإلكتروني:", scannedCode);
      handleInputChange("barcode", scannedCode);
    },
  });

  return (
    <Box sx={{ bgcolor: "#F6F7FB", minHeight: "100vh", pb: 5 }}>
      <CdbHeaderAndInfoCard total={2500} />
      <Container sx={{ mt: 4 }}>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid size={{ xs: 12 }}>
            <SectionCard>
              <SectionTitle
                title="معلومات الدواء الأساسية"
                icon={<MedicationOutlined sx={{ color: "secondary.main" }} />}
              />

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    label="الاسم التجاري"
                    placeholder="مثال: بانادول اكسترا"
                    value={formData.tradeName}
                    onChange={(value) => handleInputChange("tradeName", value)}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    label="الباركود"
                    placeholder="0000 0000 0000"
                    value={formData.barcode}
                    onChange={(value) => handleInputChange("barcode", value)}
                  />
                </Grid>

                <DosageFormComponent
                  handleInputChange={handleInputChange}
                  currentDosageFormId={formData.dosageFormId}
                />

                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    label="عدد الوحدات الدوائية"
                    placeholder="14"
                    type="number"
                    value={formData.unitsPerBox}
                    onChange={(value) =>
                      handleInputChange("unitsPerBox", value)
                    }
                  />
                </Grid>

                <ActiveIngredientForm
                  ingredients={formData.ingredients}
                  onIngredientChange={handleIngredientChange}
                  onAddIngredient={handleAddIngredient}
                  onRemoveIngredient={handleRemoveIngredient}
                />
              </Grid>
            </SectionCard>

            <SectionCard>
              <SectionTitle
                title="معلومات التسعير الرسمية"
                icon={<PaidOutlined sx={{ color: "secondary.main" }} />}
              />

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    label="سعر النت ( الصافي )"
                    placeholder="0.00"
                    type="number"
                    value={formData.netPrice}
                    showCurrency={true}
                    onChange={(value) => handleInputChange("netPrice", value)}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomTextField
                    label="سعر المستهلك"
                    placeholder="0.00"
                    type="number"
                    value={formData.consumerPrice}
                    showCurrency={true}
                    onChange={(value) =>
                      handleInputChange("consumerPrice", value)
                    }
                  />
                </Grid>
              </Grid>
            </SectionCard>

            <SectionCard>
              <SectionTitle
                title="التصنيف والمعلومات الإضافية"
                icon={<CategoryOutlined sx={{ color: "secondary.main" }} />}
              />

              <Grid container spacing={3}>
                <DrugCategoryComponent
                  categoryIds={formData.categoryIds}
                  onChange={(categoryIds) =>
                    setFormData((prev) => ({
                      ...prev,
                      categoryIds,
                    }))
                  }
                />

                <Grid size={{ xs: 12, md: 6 }}>
                  <RxToggleField
                    label="دواء يتطلب وصفة طبية (RX) ؟"
                    checked={formData.isRx}
                    onChange={(newValue: boolean) =>
                      handleInputChange("isRx", newValue)
                    }
                  />
                </Grid>
              </Grid>
            </SectionCard>

            <AddDrugFormAction
              onSave={handleSave}
              onCancel={resetForm}
              isPending={isPending}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddGeneralDrug;
