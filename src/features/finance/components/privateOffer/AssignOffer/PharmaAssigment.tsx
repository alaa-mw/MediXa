import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AssignmentFields from "./AssignmentField";
import PrimaryButton from "../../PrimaryButton";
import type { PharmacyAssignmentModel } from "../../../types/offerTypes";
import type { PrivateOffer } from "../../../types/pharmacyOfferTypes";
import OffersDialog from "../OfferDialog";
import PharmaciesSearchandSelectDialog from "./PharamcySearchandSelectDialog";
import { useAssignOfferToPharmacies } from "../../../hooks/useAssignOfferToPharmacies";
import { useSnackbar } from "../../../../../shared/providers/useSnackbar";
const dummyResponse = {
  success: true,
  statusCode: 200,
  data: [
    {
      pharmacyOfferGrantId: 1,
      grantReason: "LOYALTY_4_YEARS",
      validFrom: "2026-07-08T02:30:56.917Z",
      validUntil: "2026-10-31T23:59:59.000Z",
      note: "عرض ولاء خاص للصيدلية",
      offer: {
        offerId: 5,
        code: "LOYALTY_4_YEARS_30",
        title: "عرض ولاء 4 سنوات",
        description:
          "عرض خاص للصيدليات المشتركة في Medixa منذ أكثر من أربع سنوات",
        startsAt: "2026-07-08T00:00:00.000Z",
        endsAt: "2026-10-31T23:59:59.000Z",
      },
      plan: { planId: 1, code: "STARTER", name: "Starter", durationMonths: 12 },
      pricing: {
        basePrice: 1500000,
        discountType: "PERCENTAGE",
        discountValue: 30,
        finalPrice: 1050000,
        currency: "SP",
      },
    },
  ],
};
export interface SelectedPharmacy {
  id: number;
  name: string;
}

const PharmacyAssignment = () => {
  const [isOffersOpen, setIsOffersOpen] = useState<boolean>(false);
  const [isPharmaciesOpen, setIsPharmaciesOpen] = useState<boolean>(false);
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [offersList] = useState<PrivateOffer[]>(dummyResponse.data);
  const [selectedPharmacies, setSelectedPharmacies] = useState<
    SelectedPharmacy[]
  >([]);
  const { showSnackbar } = useSnackbar();
  const selectedOffer = offersList.find(
    (offer) => offer.offer.offerId === selectedOfferId,
  );
  const handleSelectOffer = (id: number) => {
    setSelectedOfferId(id);
    setIsOffersOpen(false);
  };

  const { control, handleSubmit } = useForm<PharmacyAssignmentModel>({
    defaultValues: {
      pharmacyIds: [],
      note: "",
      grantReason: "SPECIAL_CUSTOMER",
      validFrom: "",
      validUntil: "",
    },
  });
  const { mutate, isPending } = useAssignOfferToPharmacies(selectedOfferId!);

  const onAssignHandler = (data: PharmacyAssignmentModel) => {
    if (!selectedOfferId) {
      showSnackbar("اختر العرض المطلوب أولاً", "error");
      return;
    }

    if (selectedPharmacies.length === 0) {
      showSnackbar("اختر صيدلية واحدة على الأقل", "error");
      return;
    }

    mutate(
      {
        body: {
          ...data,
          pharmacyIds: selectedPharmacies.map((p) => p.id),
        },
      },
      {
        onSuccess: () => {
          showSnackbar("تم إسناد العرض للصيدليات بنجاح", "success");
          console.log(
            "idddds",
            selectedPharmacies.map((p) => p.id),
          );
        },
        onError: (err) => {
          showSnackbar(err.message, "error");
        },
      },
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        direction: "rtl",
      }}
    >
      <Stack
        sx={{
          minWidth: { md: "180px" },
          mt: 2,
          alignItems: "flex-start",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "text.primary", whiteSpace: "nowrap" }}
        >
          إسناد عرض للصيدليات
        </Typography>
      </Stack>

      <Card
        variant="outlined"
        sx={{
          width: "100%",
          flexGrow: 1,
          p: 3,
          ml: 10,
          pl: 6,
          borderRadius: 3,
          borderColor: "#E5E7EB",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mb: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsOffersOpen(true)}
            sx={{
              borderRadius: "10px",
              fontWeight: 600,
              px: 3,
              borderWidth: "1.5px",
            }}
          >
            اختيار عرض محدد
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsPharmaciesOpen(true)}
            sx={{
              borderRadius: "10px",
              fontWeight: 600,
              px: 3,
              borderWidth: "1.5px",
            }}
          >
            {selectedPharmacies.length > 0
              ? `تم اختيار (${selectedPharmacies.length}) صيدليات`
              : "اختيار الصيدليات المطلوبة"}
          </Button>
        </Box>
        <Box sx={{ display: "flex", direction: "row" }}>
          <Box>
            {selectedOffer && (
              <Chip
                color="secondary"
                label={selectedOffer.offer.title}
                sx={{ fontWeight: 600 }}
              />
            )}
          </Box>
          <Box sx={{ gap: 10 }}>
            {selectedPharmacies.length > 0 && (
              <>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    overflowX: "auto",
                    flexWrap: "nowrap",
                    pb: 1,
                  }}
                >
                  {selectedPharmacies.map((pharmacy) => (
                    <Chip
                      key={pharmacy.id}
                      label={pharmacy.name}
                      color="primary"
                      variant="outlined"
                      sx={{ ml: 10 }}
                    />
                  ))}
                </Stack>
              </>
            )}
          </Box>
        </Box>

        <Grid container sx={{ mt: 4 }}>
          <AssignmentFields control={control} />
          <PrimaryButton
            loading={isPending}
            disabled={isPending}
            sx={{ mt: 3 }}
            onClick={handleSubmit(onAssignHandler)}
          >
            إسناد العرض ({selectedPharmacies.length} صيدليات)
          </PrimaryButton>
        </Grid>
      </Card>

      <OffersDialog
        open={isOffersOpen}
        onClose={() => setIsOffersOpen(false)}
        offers={offersList}
        onSelectOffer={handleSelectOffer}
      />

      {isPharmaciesOpen && (
        <PharmaciesSearchandSelectDialog
          open={isPharmaciesOpen}
          onClose={() => setIsPharmaciesOpen(false)} // تم تصحيح الـ State هنا لتغلق الدايلوج الصحيح
          selectedPharmacies={selectedPharmacies}
          onConfirm={setSelectedPharmacies}
        />
      )}
    </Box>
  );
};

export default PharmacyAssignment;
