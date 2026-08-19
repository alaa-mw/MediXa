import {
  Box,
  Card,
  CardActionArea,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";

export interface SubscriptionPlan {
  planId: number;
  code: string;
  name: string;
  description: string;
  durationMonths: number;
  planPrice: number;
  currency: string;
  type: string;
}

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  selected: boolean;
  icon: ReactNode;
  color: string;
  onSelect: (planId: number) => void;
}

const formatPrice = (price: number, currency: string) =>
  `${new Intl.NumberFormat("en-US").format(price)} ${currency}`;

export default function SubscriptionPlanCard({
  plan,
  selected,
  icon,
  color,
  onSelect,
}: SubscriptionPlanCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 220,
        borderRadius: 3,
        border: selected ? `2px solid ${color}` : "1px solid #E5E7EB",
        transition: "all .2s ease",
      }}
    >
      <CardActionArea
        onClick={() => onSelect(plan.planId)}
        sx={{
          py: 1,
          pl: 4,
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Radio
            checked={selected}
            sx={{
              color: "#D1D5DB",
              "&.Mui-checked": {
                color,
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ ml: 2, fontWeight: 700, color }}>
              {plan.name}
            </Typography>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                bgcolor: `${color}15`,
                color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
          </Box>
        </Stack>

        <Stack sx={{ alignItems: "center", textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              mb: 0.5,
              mr: 2,
              width: "calc(100% - 16px)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {plan.description}
          </Typography>
          <Typography
            variant="caption"
            sx={{ mr: 2, color, fontWeight: 700, whiteSpace: "nowrap" }}
          >
            {formatPrice(plan.planPrice, plan.currency)} / {plan.durationMonths}{" "}
            شهر
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
