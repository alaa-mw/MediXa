import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Chip,
} from "@mui/material";
import type { UnexpiredPrivateOffer } from "../../types/allPrivateOfferTypes";

interface OffersDialogProps {
  open: boolean;
  onClose: () => void;
  offers: UnexpiredPrivateOffer[];
  onSelectOffer: (offerId: number) => void;
}

const OffersDialog: React.FC<OffersDialogProps> = ({
  open,
  onClose,
  offers,
  onSelectOffer,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        العروض الخاصة المتاحة لك
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          {offers.length === 0 ? (
            <Typography align="center" color="text.secondary">
              لا توجد عروض متوفرة حالياً.
            </Typography>
          ) : (
            offers.map((item) => (
              <Card
                key={item.offerId} // استخدام item.offerId مباشرة
                variant="outlined"
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                    borderColor: "primary.main",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "primary.main", fontWeight: "bold" }}
                    >
                      {item.title} {/* الوصول المباشر للعنوان */}
                    </Typography>
                    <Chip
                      label={`${item.pricing.discountValue}% خصم`}
                      color="error"
                      size="small"
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: "text.secondary" }}
                  >
                    {item.description} {/* الوصول المباشر للوصف */}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "action.hover",
                      p: 1.5,
                      borderRadius: 1,
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", display: "block" }}
                      >
                        السعر الأساسي
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: "line-through" }}
                      >
                        {item.pricing.basePrice} {item.pricing.currency}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", display: "block" }}
                      >
                        السعر بعد الخصم
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", color: "success.main" }}
                      >
                        {item.pricing.finalPrice} {item.pricing.currency}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => onSelectOffer(item.offerId)} // استخدام item.offerId مباشرة
                  >
                    اختيار العرض
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default OffersDialog;
