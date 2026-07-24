import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import OfferBanner from "../../../subscription/components/OfferBanner";
import { usePharmacyPrivateOffers } from "../../hooks/usePharmacyPrivateOffers";

interface Props {
  pharmacyId: number;
  planId: number;
  planCode: string;
  publicOffers: any[];
  selectedOfferId: number | null;
  onSelectOffer: (offerId: number | null, allOffers: any[]) => void;
}

export default function PlanOffersDialog({
  pharmacyId,
  planId,
  planCode,
  publicOffers,
  selectedOfferId,
  onSelectOffer,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { privateOffers, isLoading } = usePharmacyPrivateOffers(
    pharmacyId,
    planId,
    isOpen,
  );

  const handleToggle = (offerId: number) => {
    const newSelectedId = selectedOfferId === offerId ? null : offerId;
    const allOffers = [...publicOffers, ...privateOffers];
    onSelectOffer(newSelectedId, allOffers);
    setIsOpen(false);
  };
  const hasAnyOffers = publicOffers.length > 0 || privateOffers.length > 0;

  return (
    <>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => setIsOpen(true)}
        sx={{ borderRadius: "10px", fontWeight: 600, py: 1 }}
      >
        {selectedOfferId
          ? "تغيير العرض المطبق"
          : "عرض العروض المتاحة (عامة وخاصة)"}
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="md"
        fullWidth
        dir="rtl"
      >
        <DialogTitle sx={{ fontWeight: 700, textAlign: "center" }}>
          اختر العرض المناسب للخطة
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : !hasAnyOffers ? (
            <Typography
              sx={{ textAlign: "center", py: 3, color: "text.secondary" }}
            >
              لا توجد عروض متاحة لهذه الخطة حالياً.
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                mt: 0.5,
                justifyContent: "center",
              }}
            >
              {/* عمود العروض العامة */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack spacing={1.5}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    العروض العامة المتاحة:
                  </Typography>
                  {publicOffers.length === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", py: 2 }}
                    >
                      لا توجد عروض عامة.
                    </Typography>
                  ) : (
                    publicOffers.map((offer) => (
                      <OfferBanner
                        key={offer.offerId}
                        offerId={offer.offerId}
                        title={offer.title}
                        description={offer.description}
                        endsAt={offer.endsAt}
                        color={
                          planCode === "PROFESSIONAL" ? "primary" : "secondary"
                        }
                        isSelected={selectedOfferId === offer.offerId}
                        onSelectOffer={handleToggle}
                      />
                    ))
                  )}
                </Stack>
              </Box>

              {/* عمود العروض الخاصة */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack spacing={1.5}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    العروض الخاصة الموجهة لصيدليتك:
                  </Typography>
                  {privateOffers.length === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", py: 2 }}
                    >
                      لا توجد عروض خاصة لهذه الخطة.
                    </Typography>
                  ) : (
                    privateOffers.map((offer) => (
                      <OfferBanner
                        key={offer.offerId}
                        offerId={offer.offerId}
                        title={offer.title}
                        description={offer.description}
                        endsAt={offer.endsAt}
                        color={
                          planCode === "PROFESSIONAL" ? "primary" : "secondary"
                        }
                        isSelected={selectedOfferId === offer.offerId}
                        onSelectOffer={handleToggle}
                      />
                    ))
                  )}
                </Stack>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
