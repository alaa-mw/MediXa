import React from 'react'
import { Box, Button, Chip, Stack } from "@mui/material";

const DestructionInvoiceCard = () => {
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
              color: `${statusMap.color}.dark`,
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
  )
}

export default DestructionInvoiceCard