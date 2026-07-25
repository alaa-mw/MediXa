import React from "react";
import { Grid, Card, Box, Typography, Stack } from "@mui/material";
import {
  CheckCircleOutlined,
  DescriptionOutlined,
  LabelOutlined,
  PaidOutlined,
} from "@mui/icons-material";
import getStatusArabic from "../../../shared/constants/method/TranslateStatus";

interface StatsProps {
  invoiceId: number;
  paymentStatus: string;
  saleType: string;
  totalAmount: string;
  subTotal: string;
  discount: string;
  isFive: boolean;
}

const InvoiceStatsCards: React.FC<StatsProps> = ({
  invoiceId,
  paymentStatus,
  saleType,
  totalAmount,
  subTotal,
  discount,
  isFive,
}) => {
  const cardStyles = {
    pl: 3,
    pr: 2,
    pt: 1,
    pb: 2,
    borderRadius: "12px",
    boxShadow: "none",
    border: "1px solid #F1F5F9",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "start",
    gap: 2,
    // height: "100%",
  };

  const iconBoxStyles = (bgColor: string) => ({
    width: 30,
    height: 30,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: bgColor,
  });

  return (
    <Grid container spacing={2} sx={{ mb: 4 }} direction="row-reverse">
      {/* Total Amount Card */}
      <Grid
        sx={{
          xs: 12,
          sm: 6,
          md: 3,
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Card sx={cardStyles}>
          <Box sx={iconBoxStyles("#EFF6FF")}>
            <PaidOutlined sx={{ color: "#78bfc1" }} />
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Total Amount
            </Typography>
            <Stack sx={{ direction: "row", alignItems: "baseline", gap: 0.5 }}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                {totalAmount}
              </Typography>
            </Stack>
          </Box>
        </Card>
      </Grid>
      {/* Sale Type Card */}
      <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={cardStyles}>
          <Box sx={iconBoxStyles("#EFF6FF")}>
            <LabelOutlined sx={{ color: "#78bfc1" }} />
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Sale Type
            </Typography>
            <Typography
              sx={{ fontSize: "1rem", fontWeight: 500, color: "main.primary" }}
            >
              {getStatusArabic(saleType)}
            </Typography>
          </Box>
        </Card>
      </Grid>
      {/* Payment Status Card */}
      <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={cardStyles}>
          <Box sx={iconBoxStyles("#EFF6FF")}>
            <CheckCircleOutlined sx={{ color: "#78bfc1" }} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Payment Status
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "secondary",
                }}
              >
                {getStatusArabic(paymentStatus)}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      {/* Invoice ID Card */}
      {isFive && (
        <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={cardStyles}>
            <Box sx={iconBoxStyles("#EEF2F6")}>
              <DescriptionOutlined sx={{ color: "#78bfc1" }} />
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Partial paid
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "tertiary.main",
                }}
              >
                {subTotal}
              </Typography>
            </Box>
          </Card>
        </Grid>
      )}
      <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={cardStyles}>
          <Box sx={iconBoxStyles("#EEF2F6")}>
            <DescriptionOutlined sx={{ color: "#78bfc1" }} />
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Discount
            </Typography>
            <Typography
              sx={{ fontSize: "18px", fontWeight: 700, color: "tertiary.main" }}
            >
              {discount}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InvoiceStatsCards;
