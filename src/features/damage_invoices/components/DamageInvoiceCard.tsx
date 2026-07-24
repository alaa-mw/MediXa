import CalendarTodayRounded from "@mui/icons-material/CalendarTodayRounded";
import Inventory2Rounded from "@mui/icons-material/Inventory2Rounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getStatusMap } from "../utils/getStatusMap";
import type { DamageInvoice } from "../types/damageInvoice";
import { formatDate } from "../utils/formatDate";


const DamageInvoiceCard = ({ data }: { data: DamageInvoice }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 4,
        transition: "all 0.2s ease-in-out",
        border: "1px solid #eef2f5",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)",
        },
        bgcolor: "background.paper",
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
          sx={{ mb: 2, alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack spacing={0.5}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.05rem",
                color: "text.primary",
              }}
            >
              {data.invoiceNumber}
            </Typography>
            <Box
              sx={{
                display: "flex",
                direction: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              <CalendarTodayRounded
                sx={{ fontSize: 14, color: "text.secondary" }}
              />
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 600 }}
              >
                {formatDate(data.damageDate || data.createdAt)}
              </Typography>
            </Box>
          </Stack>

          <Chip
            label={getStatusMap(data.status).label}
            color={getStatusMap(data.status).color}
            size="small"
            sx={{
              color: `${getStatusMap(data.status).color}.dark`,
              fontWeight: 700,
              borderRadius: 8,
              px: 1.25,
              height: 34,
            }}
          />
        </Grid>

        {/* Supplier / Summary Row */}
        <Grid container sx={{ mb: 2, gap: 2, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Inventory2Rounded
                sx={{ fontSize: 28, color: "text.secondary" }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{ fontWeight: 700, color: "text.primary", mb: 0.25 }}
              >
                إجمالي الأصناف: {data.itemsCount ?? "-"}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                إجمالي الكمية التالفة: {data.totalDamagedQuantity ?? "-"}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Divider */}
        <Box sx={{ borderTop: "1px solid", borderColor: "divider", my: 2 }} />

        <Grid
          container
          sx={{ mb: 2, gap: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "primary.main",
                textAlign: "center",
              }}
            >
              {Number(
                data.formattedTotalInvoicePrice ??
                  data.formattedTotalInvoicePrice ??
                  0,
              ).toLocaleString(undefined, { minimumFractionDigits: 2 })}{" "}
              ل.س
            </Typography>
          </Box>
        </Grid>

        {/* Actions */}
        <Grid container spacing={1}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={() => navigate(`details/${data.damageInvoiceId}`)}
            sx={{
              height: 48,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            عرض التفاصيل
          </Button>
          {/* <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => navigate("edit")}
              sx={{
                height: 48,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              تعديل
            </Button>
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DamageInvoiceCard;
