import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AssignmentFields from "./AssignmentField";
import PrimaryButton from "../../PrimaryButton";
import type { PharmacyAssignmentModel } from "../../../types/offerTypes";
import OffersDialog from "../OfferDialog";
import PharmaciesSearchandSelectDialog from "./PharamcySearchandSelectDialog";
import { useAssignOfferToPharmacies } from "../../../hooks/useAssignOfferToPharmacies";
import { useSnackbar } from "../../../../../shared/providers/useSnackbar";
import useGetData from "../../../../../shared/hooks/useGetData";
import type { UnexpiredPrivateOffer } from "../../../types/allPrivateOfferTypes";

export interface SelectedPharmacy {
  id: number;
  name: string;
}

const PharmacyAssignment = () => {
  const [isOffersOpen, setIsOffersOpen] = useState<boolean>(false);
  const [isPharmaciesOpen, setIsPharmaciesOpen] = useState<boolean>(false);
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [selectedPharmacies, setSelectedPharmacies] = useState<
    SelectedPharmacy[]
  >([]);
  const { showSnackbar } = useSnackbar();

  const {
    data: offersResponse,
    isLoading: isOffersLoading,
    refetch,
  } = useGetData<UnexpiredPrivateOffer[]>(
    "/subscriptions/admin/private-offers",
    false,
  );

  const offersList = offersResponse?.data || [];

  const selectedOffer = offersList.find(
    (offer) => offer.offerId === selectedOfferId,
  );

  const handleOpenOffersDialog = async () => {
    try {
      await refetch();
    } finally {
      setIsOffersOpen(true);
    }
  };

  const handleSelectOffer = (id: number) => {
    setSelectedOfferId(id);
    setIsOffersOpen(false);
  };

  const { control, handleSubmit } = useForm<PharmacyAssignmentModel>({
    defaultValues: {
      pharmacyIds: [],
      note: "",
      grantReason: "",
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
        onSuccess: (message) => {
          showSnackbar("تم إسناد العرض للصيدليات بنجاح", "success");
          console.log("request response:", message.data);
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
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <Stack
        sx={{
          width: { xs: "100%", md: "200px" },
          minWidth: { md: "200px" },
          mt: { xs: 0, md: 2 },
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "text.primary", whiteSpace: "nowrap" }}
        >
          إسناد عرض للصيدليات
        </Typography>
      </Stack>

      <Box
        sx={{
          flexGrow: 1,
          width: { xs: "100%", md: "calc(100% - 216px)" },
          display: "flex",
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: "100%",
            flexGrow: 1,
            p: 3,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mb: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenOffersDialog}
              sx={{
                borderRadius: "10px",
                fontWeight: 600,
                px: 3,
                borderWidth: "1.5px",
              }}
            >
              {isOffersLoading && <CircularProgress size={20} sx={{ mr: 1 }} />}
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

          {/* حاوية الـ Chips */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            {selectedOffer && (
              <Chip
                color="secondary"
                label={selectedOffer.title}
                sx={{ fontWeight: 600 }}
              />
            )}

            {selectedPharmacies.length > 0 && (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  overflowX: "auto",
                  flexWrap: "wrap",
                  pb: 1,
                }}
              >
                {selectedPharmacies.map((pharmacy) => (
                  <Chip
                    key={pharmacy.id}
                    label={pharmacy.name}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            )}
          </Box>

          <Grid container spacing={2}>
            <AssignmentFields control={control} />
          </Grid>

          <PrimaryButton
            loading={isPending}
            disabled={isPending}
            sx={{ mt: 3 }}
            onClick={handleSubmit(onAssignHandler)}
          >
            إسناد العرض ({selectedPharmacies.length} صيدليات)
          </PrimaryButton>
        </Card>
      </Box>

      <OffersDialog
        open={isOffersOpen}
        onClose={() => setIsOffersOpen(false)}
        offers={offersList}
        onSelectOffer={handleSelectOffer}
      />

      {isPharmaciesOpen && (
        <PharmaciesSearchandSelectDialog
          open={isPharmaciesOpen}
          onClose={() => setIsPharmaciesOpen(false)}
          selectedPharmacies={selectedPharmacies}
          onConfirm={setSelectedPharmacies}
        />
      )}
    </Box>
  );
};

export default PharmacyAssignment;
