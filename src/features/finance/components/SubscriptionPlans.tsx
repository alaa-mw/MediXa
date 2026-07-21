import {
  Box,
  Card,
  CardActionArea,
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

interface Plan {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// 1️⃣ تعريف الـ Props القادمة من الصفحة الرئيسية
interface SubscriptionPlansProps {
  selectedPlanId: number;
  onPlanChange: (id: number) => void;
}

const plans: Plan[] = [
  {
    id: 1,
    title: "Starter",
    subtitle: "الباقة الأساسية",
    description: "جميع الأدوات الأساسية لإدارة الصيدلية بكفاءة",
    icon: <RocketLaunchOutlined />,
    color: theme.palette.secondary.light,
  },
  {
    id: 2,
    title: "Professional",
    subtitle: "الباقة الاحترافية",
    description: "ميزات متقدمة مع تقارير وتحليلات احترافية",
    icon: <WorkOutlineOutlined />,
    color: theme.palette.tertiary.light,
  },
  {
    id: 3,
    title: "Enterprise",
    subtitle: "باقة المؤسسات",
    description: "حلول متكاملة للشبكات والفروع المتعددة",
    icon: <DiamondOutlined />,
    color: theme.palette.primary.light,
  },
];

export default function SubscriptionPlans({
  selectedPlanId,
  onPlanChange,
}: SubscriptionPlansProps) {
  // 2️⃣ تم الاستغناء عن الـ useState المحلية لتجنب تعارض البيانات

  return (
    <Box
      sx={{
        mb: 2,
        width: "100%",
        display: "flex",
        flexDirection: "row", // تم تصحيح direction إلى flexDirection
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
          flexDirection: "row", // تم تصحيح direction إلى flexDirection
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
        {plans.map((plan) => {
          // 3️⃣ المقارنة تعتمد الآن على المغير القادم من الأعلى
          const selected = selectedPlanId === plan.id;

          return (
            <Card
              key={plan.id}
              elevation={0}
              sx={{
                flex: 1,
                minWidth: 220,
                borderRadius: 3,
                border: selected
                  ? `2px solid ${plan.color}`
                  : "1px solid #E5E7EB",
                transition: "all .2s ease",
              }}
            >
              <CardActionArea
                onClick={() => onPlanChange(plan.id)} // 4️⃣ إشعار الصفحة الرئيسية بالتغيير عند الضغط
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
                        color: plan.color,
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
                      sx={{ ml: 2, fontWeight: 700, color: plan.color }}
                    >
                      {plan.title}
                    </Typography>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        bgcolor: `${plan.color}15`,
                        color: plan.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {plan.icon}
                    </Box>
                  </Box>
                </Stack>

                <Stack sx={{ alignItems: "center", textAlign: "center" }}>
                  <Typography variant="body2" sx={{ mt: 1, mb: 1, mr: 2 }}>
                    {plan.description}
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
