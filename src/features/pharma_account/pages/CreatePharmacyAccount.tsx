import { ThemeProvider } from "@emotion/react";
import theme from "../../../shared/styles/arabicTheme";
import { Box, CssBaseline, Stack, Typography } from "@mui/material";
import InfoStatus from "../components/info-section";
import OwnerAccountCard from "../components/owner_card";
import PharmacyAccountCard from "../components/pharamcy-card";
import CreateAccountButton from "../components/createAccountButton";
import { useState } from "react";
import usePostData from "../../../shared/hooks/usePostData";
import type { AllOwnersResponse } from "../types/allOwnersResponse";

export interface OwnerForm {
  id?: number;
  ownerName: string;
  email: string;
  mobile: string;
  nationalId: string;
}

export interface PharmacyForm {
  pharmacyName: string;
  pharmacistLicenseNo: string;
  contactPhone: string;
  email: string;
  governorate: string;
  healthDirectorate: string;
  areaName: string;
  addressText: string;
  openingDate: string;
  // add more attributes
}

export interface PharmacyRegistrationForm {
  ownerMode: "NEW" | "EXISTING";
  newOwner: OwnerForm;
  pharmacy: PharmacyForm;
}

export const INITIAL_FORM: PharmacyRegistrationForm = {
  ownerMode: "NEW",
  newOwner: {
    ownerName: "",
    email: "",
    mobile: "",
    nationalId: "",
  },
  pharmacy: {
    pharmacyName: "",
    pharmacistLicenseNo: "",
    contactPhone: "",
    email: "",
    governorate: "",
    healthDirectorate: "",
    areaName: "",
    addressText: "",
    openingDate: "",
  },
};

export const CreatePharmacyAccount = () => {
  const [formData, setFormData] =
    useState<PharmacyRegistrationForm>(INITIAL_FORM);

  const { mutate: createPharmacy, isPending } =
    usePostData<AllOwnersResponse>("/pharmacy/create");

  const handleSubmit = () => {
    const today = new Date().toISOString().split("T")[0];
    let finalPayload: any = {
      ownerMode: formData.ownerMode,
      pharmacy: {
        pharmacyName: formData.pharmacy.pharmacyName,
        pharmacistLicenseNo: formData.pharmacy.pharmacistLicenseNo,
        contactPhone: formData.pharmacy.contactPhone,
        email: formData.pharmacy.email,
        governorate: formData.pharmacy.governorate,
        healthDirectorate: formData.pharmacy.healthDirectorate,
        areaName: formData.pharmacy.areaName,
        addressText: formData.pharmacy.addressText,
        openingDate: today,
      },
      // owner: {
      //   name: formData.newOwner.ownerName,
      //   email: formData.newOwner.email,
      //   mobile: formData.newOwner.mobile,
      //   nationalId: formData.newOwner.nationalId,
      // },
    };
    if (formData.ownerMode === "EXISTING") {
      finalPayload.existingOwnerId = Number(formData.newOwner.id);
    } else {
      finalPayload.newOwner = {
        fullName: formData.newOwner.ownerName,
        email: formData.newOwner.email,
        phone: formData.newOwner.mobile,
        nationalId: formData.newOwner.nationalId,
      };
    }
    console.log("Payload to send:", JSON.stringify(finalPayload, null, 2));

    createPharmacy(finalPayload, {
      onSuccess: (response) => {
        console.log("Success : Create pharmacy response", response);
        setFormData(INITIAL_FORM);
      },
      onError: (error) => {
        console.log("error: Create Pharmacy", error);
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Stack direction="column">
            <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
              إنشاء حساب صيدلية
            </Typography>

            <Typography color="text.secondary">
              إضافة صيدلية جديدة إلى النظام بشكل متكامل
            </Typography>
          </Stack>

          <Box>
            <InfoStatus />
          </Box>
        </Stack>
        <Stack spacing={4} sx={{ mt: 4 }}>
          <OwnerAccountCard
            ownerData={formData.newOwner}
            ownerMode={formData.ownerMode}
            setFormData={setFormData}
          />
          <PharmacyAccountCard
            pharmacyData={formData.pharmacy}
            setPharmacyData={(updatedPharmacy) =>
              setFormData((prev) => ({
                ...prev,
                pharmacy:
                  typeof updatedPharmacy === "function"
                    ? updatedPharmacy(prev.pharmacy)
                    : updatedPharmacy,
              }))
            }
          />
          <CreateAccountButton isPending={isPending} onSubmit={handleSubmit} />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
