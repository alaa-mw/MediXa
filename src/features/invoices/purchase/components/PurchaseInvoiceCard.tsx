import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  Stack,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatArabicDateTime } from "../../utils/formatArabicDateTime";
import type { PurchaseInvoiceDetails } from "../../types/purchaseInvoiceDetails";
import { Person2Rounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Map status for chip color and icon
const getStatusMap = (
  status: string,
): {
  label: string;
  color: "warning" | "success" | "error" | "info" | "default";
} => {
  switch (status) {
    case "PENDING":
      return {
        label: "قيد الانتظار",
        color: "warning",
      };
    case "ACTIVE":
      return {
        label: "نشط",
        color: "success",
      };
    case "EXPIRED":
      return {
        label: "منتهي",
        color: "error",
      };
    default:
      return {
        label: status,
        color: "default",
      };
  }
};

const PurchaseInvoiceCard: React.FC<{ data: PurchaseInvoiceDetails }> = ({
  data,
}) => {
  const statusMap = getStatusMap(data.paymentStatus);
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "100%",
        // minWidth: 320,
        // aspectRatio: "1/1",
        borderRadius: "24px",
        bgcolor: "#fff",
        boxShadow: "0px 4px 16px rgba(0,0,0,0.04)",
        border: "1px solid #F0F2F5",
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          p: 3,
          "&:last-child": {
            pb: 3,
          },
        }}
      >
        {/* Top Row */}
        <Grid
          container
          sx={{
            mb: 3,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Stack spacing={0.5}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.15rem",
                color: "#2F3B52",
              }}
            >
              #{data.invoiceNumber}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "#b4b4b4",
                fontWeight: 600,
              }}
            >
              {formatArabicDateTime(data.invoiceDate)}
            </Typography>
          </Stack>
          <Chip
            label={statusMap.label}
            color={statusMap.color}
            size="small"
            sx={{
              fontWeight: 700,
              borderRadius: "999px",
              height: 30,
              px: 1,
            }}
          />
        </Grid>

        {/* Supplier Section */}
        <Grid
          container
          sx={{ mb: 3,gap:1,alignItems: "center" }}
        >
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              bgcolor: "#F3F7FA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Person2Rounded
              sx={{
                fontSize: 30,
                color: "#506680",
              }}
            />
          </Box>

          <Box>
            <Typography
            variant="h5"
              sx={{
                fontWeight: 700,
                color: "#34495E",
                mb: 0.5,
              }}
            >
              {data.supplier.supplierName}
            </Typography>

            {/* <Typography
              sx={{
                color: "#8A94A6",
                fontSize: "0.9rem",
              }}
            >
              {data.notes}
            </Typography> */}
          </Box>
        </Grid>

        {/* Divider */}
        <Box
          sx={{
            borderTop: "1px solid #EEF2F5",
            my: 2.5,
          }}
        />

        {/* Total Amount */}
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#3F6F73",
            }}
          >
            {parseFloat(data.totalPrice).toLocaleString("ar-EG", {
              minimumFractionDigits: 2,
            })}{" "}
            ر.س
          </Typography>
        </Box>

        {/* Details Button */}
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<VisibilityIcon />}
          onClick={()=>navigate("details")}
          sx={{
            height: 56,
            borderRadius: "18px",
            fontWeight: 700,
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#355D60",
              boxShadow: "none",
            },
          }}
        >
          عرض التفاصيل
        </Button>
      </CardContent>
    </Card>
  );
};
export default PurchaseInvoiceCard;
