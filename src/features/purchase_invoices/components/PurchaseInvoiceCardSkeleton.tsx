import {
  Card,
  CardContent,
  Grid,
  Stack,
  Box,
  Skeleton,
} from "@mui/material";

const PurchaseInvoiceCardSkeleton = () => {
  return (
    <Card
      sx={{
        width: "100%",
        // minWidth: 320,
        // aspectRatio: "1/1.12",
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
        {/* Header */}
        <Grid
          container
          sx={{
            mb: 3,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Stack spacing={0.8}>
            <Skeleton
              variant="text"
              width={120}
              height={32}
            />

            <Skeleton
              variant="text"
              width={90}
              height={20}
            />
          </Stack>

          <Skeleton
            variant="rounded"
            width={90}
            height={30}
            sx={{ borderRadius: "999px" }}
          />
        </Grid>

        {/* Supplier */}
        <Grid
          container
          sx={{
            mb: 3,
            gap: 1,
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="circular"
            width={54}
            height={54}
          />

          <Box>
            <Skeleton
              variant="text"
              width={180}
              height={36}
            />

            <Skeleton
              variant="text"
              width={120}
              height={20}
            />
          </Box>
        </Grid>

        {/* Divider */}
        <Box
          sx={{
            borderTop: "1px solid #EEF2F5",
            my: 2.5,
          }}
        />

        {/* Total */}
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Skeleton
            variant="text"
            width={180}
            height={55}
            sx={{ mx: "auto" }}
          />
        </Box>

        {/* Button */}
        <Skeleton
          variant="rounded"
          height={56}
          width="100%"
          sx={{
            borderRadius: "18px",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default PurchaseInvoiceCardSkeleton;