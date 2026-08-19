import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import {
  RocketLaunchOutlined,
  WorkOutlineOutlined,
  DiamondOutlined,
} from "@mui/icons-material";
import theme from "../../../shared/styles/mainTheme";
import type { SubscriptionPlan } from "./SubscriptionPlanCard";
import useGetData from "../../../shared/hooks/useGetData";

// interface Plan {
//   id: number;
//   title: string;
//   subtitle: string;
//   description: string;
//   icon: React.ReactNode;
//   color: string;
// }

// 1️⃣ تعريف الـ Props القادمة من الصفحة الرئيسية
interface SubscriptionPlansProps {
  selectedPlanId: number;
  onPlanChange: (id: number) => void;
}

// const plans: Plan[] = [
//   {
//     id: 1,
//     title: "Starter",
//     subtitle: "الباقة الأساسية",
//     description: "جميع الأدوات الأساسية لإدارة الصيدلية بكفاءة",
//     icon: <RocketLaunchOutlined />,
//     color: theme.palette.secondary.light,
//   },
//   {
//     id: 2,
//     title: "Professional",
//     subtitle: "الباقة الاحترافية",
//     description: "ميزات متقدمة مع تقارير وتحليلات احترافية",
//     icon: <WorkOutlineOutlined />,
//     color: theme.palette.tertiary.light,
//   },
//   {
//     id: 3,
//     title: "Enterprise",
//     subtitle: "باقة المؤسسات",
//     description: "حلول متكاملة للشبكات والفروع المتعددة",
//     icon: <DiamondOutlined />,
//     color: theme.palette.primary.light,
//   },
// ];

const planVisuals = {
  STARTER: {
    icon: <RocketLaunchOutlined />,
    color: theme.palette.secondary.light,
    description: "جميع الأدوات الأساسية لإدارة الصيدلية بكفاءة",
  },
  PROFESSIONAL: {
    icon: <WorkOutlineOutlined />,
    color: theme.palette.tertiary.light,
    description: "ميزات متقدمة مع تقارير وتحليلات احترافية",
  },
  ENTERPRISE: {
    icon: <DiamondOutlined />,
    color: theme.palette.primary.light,
    description: "حلول متكاملة للشبكات والفروع المتعددة",
  },
} as const;

export default function SubscriptionPlans({
  selectedPlanId,
  onPlanChange,
}: SubscriptionPlansProps) {
  const { data, isLoading, error } = useGetData<SubscriptionPlan[]>(
    "/subscriptions/plans",
  );
  const plans = data?.data ?? [];

  return (
    <Box
      sx={{
        mb: 2,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyItems: "center",
        alignItems: "flex-start",
      }}
    >
      <Stack
        sx={{
          mb: 2,
          mt: 2,
          ml: 4,
          display: "flex",
          flexDirection: "row",
          justifyItems: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "text.primary", whiteSpace: "nowrap" }}
        >
          اختر خطة الاشتراك
        </Typography>
      </Stack>

      <Stack
        direction="row"
        sx={{
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
          gap: 3,
          width: "100%",
        }}
      >
        {plans.map((plan, index) => {
          const selected = selectedPlanId === plan.planId;
          const visuals = planVisuals[plan.code as keyof typeof planVisuals];

          return (
            <Card
              key={plan.planId}
              elevation={0}
              sx={{
                flex: 1,
                minWidth: 220,
                borderRadius: 3,
                border: selected
                  ? `2px solid ${visuals.color}`
                  : "1px solid #E5E7EB",
                transition: "all .2s ease",
              }}
            >
              <CardActionArea
                onClick={() => onPlanChange(plan.planId)} // 4️⃣ إشعار الصفحة الرئيسية بالتغيير عند الضغط
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
                        color: visuals.color,
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
                    <Typography
                      variant="h6"
                      sx={{ ml: 2, fontWeight: 700, color: visuals.color }}
                    >
                      {plan.code}
                    </Typography>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        bgcolor: `${visuals.color}15`,
                        color: visuals.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {visuals.icon}
                    </Box>
                  </Box>
                </Stack>

                <Stack sx={{ alignItems: "center", textAlign: "center" }}>
                  <Typography variant="body2" sx={{ mt: 1, mb: 1, mr: 2 }}>
                    {visuals.description}
                  </Typography>
                </Stack>
                <Divider
                  sx={{ width: "100%", mb: 2, borderColor: "#F3F4F6" }}
                />

                {/* الجزء السفلي: السعر والمدة */}
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{
                    width: "100%",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {new Intl.NumberFormat("en-US").format(plan.planPrice)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: visuals.color }}
                  >
                    {plan.currency}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", ml: 1, fontWeight: 500 }}
                  >
                    / {plan.durationMonths} شهر
                  </Typography>
                </Stack>
              </CardActionArea>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
