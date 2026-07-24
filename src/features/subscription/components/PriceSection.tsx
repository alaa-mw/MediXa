import { Stack, Typography, Chip, Box } from "@mui/material";
import { formatPrice, getSavingAmount } from "../utils/subscriptionHelper";

interface Props {
  basePrice: number;
  currentPrice: number;
  color: string;
}

export default function PriceSection({
  basePrice,
  currentPrice,
  color,
}: Props) {
  return (
    <Stack sx={{ alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography color="text.secondary">year /</Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: "700", color: `${color}.main` }}
        >
          {formatPrice(currentPrice)} SP
        </Typography>
        <Typography
          sx={{
            textDecoration: "line-through",
            color: "grey",
            mr: 1.5,
          }}
        >
          {formatPrice(basePrice)} SP
        </Typography>
      </Box>

      <Chip
        label={`وفر ${formatPrice(
          getSavingAmount(basePrice, currentPrice),
        )} SP`}
        color={color as any}
        sx={{ mt: 2 }}
      />
    </Stack>
  );
}
