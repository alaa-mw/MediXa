import type { PharmacySubscription } from "../../types/subscriptionDetailes";
import { Box, Chip, Divider, Paper, Typography } from "@mui/material";
import { CalendarTodayOutlined, LocalOfferOutlined } from "@mui/icons-material";

interface CurrentSubscriptionCardProps {
  subscription: PharmacySubscription;
}

const CurrentSubscriptionCard = ({
  subscription,
}: CurrentSubscriptionCardProps) => {
  const formatDate = (dateString: string) => {
    return dateString.split("T")[0].replace(/-/g, "/");
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  // 'SCHEDULED', 'ACTIVE', 'EXPIRED', 'CANCELLED'
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return { label: "نشط", bg: "#E6F4EA", color: "#137333" };
      case "SCHEDULED":
        return { label: "مجدول", bg: "#FEF7E0", color: "#B06000" };
      case "EXPIRED":
        return { label: "منتهي", bg: "#FCE8E6", color: "#C5221F" };
      case "CANCELLED":
        return { label: "ملغي", bg: "#F3F4F6", color: "#64748B" };
      default:
        return { label: "غير معروف", bg: "#F3F4F6", color: "#64748B" };
    }
  };

  const statusInfo = getStatusConfig(subscription.status);

  return (
    <Paper
      elevation={0}
      sx={{
        py: 1.8,
        px: 2.5,
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FAFCFA",
        direction: "rtl",
        width: "100%",
      }}
    >
      {/* 1. شبكة الأعمدة الموحدة في سطر واحد */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1.2fr 1.2fr 1.2fr 1.5fr", // 5 أعمدة متناسقة
          },
          gap: 2,
          alignItems: "center",
        }}
      >
        {/* العمود الأول: عنوان "الاشتراك الحالي" وحالته */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            borderLeft: { md: "1px solid #E2E8F0" },
            pl: { md: 2 },
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#1E293B",
              mb: 1,
            }}
          >
            الاشتراك الحالي
          </Typography>

          <Chip
            label={statusInfo.label}
            size="small"
            sx={{
              bgcolor: statusInfo.bg,
              color: statusInfo.color,
              fontWeight: 600,
              fontSize: "12px",
              px: 1,
              height: "26px",
              "& .MuiChip-label": {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                "&::before": {
                  content: '""',
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: statusInfo.color,
                },
              },
            }}
          />
        </Box>

        {/* العمود الثاني: التواريخ */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1.5,
            borderLeft: { md: "1px solid #E2E8F0" },
            px: { md: 2 },
          }}
        >
          {/* تاريخ البداية */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                color: "#64748B",
              }}
            >
              <CalendarTodayOutlined sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
                تاريخ البداية
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: "13px", fontWeight: 700, color: "#1E293B" }}
            >
              {formatDate(subscription.startsAt)}
            </Typography>
          </Box>

          {/* تاريخ الانتهاء */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                color: "#64748B",
              }}
            >
              <CalendarTodayOutlined sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
                تاريخ الانتهاء
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: "13px", fontWeight: 700, color: "#1E293B" }}
            >
              {formatDate(subscription.endsAt)}
            </Typography>
          </Box>
        </Box>

        {/* العمود الثالث: العرض المطبق */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.8,
            borderLeft: { md: "1px solid #E2E8F0" },
            px: { md: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              color: "#1E293B",
            }}
          >
            <LocalOfferOutlined sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              العرض المطبق
            </Typography>
          </Box>

          {subscription.appliedOffer ? (
            <>
              <Chip
                label={subscription.appliedOffer.code}
                size="small"
                sx={{
                  bgcolor: "primary.light" + "alpha(0.1)",
                  color: "primary.main",
                  fontSize: "11px",
                  fontWeight: 600,
                  py: 1.5,
                  px: 1,
                  height: "22px",
                }}
              />
            </>
          ) : (
            <Typography sx={{ fontSize: "13px", color: "#94A3B8" }}>
              لا يوجد عرض مطبق
            </Typography>
          )}
        </Box>

        {/* العمود الرابع: الخطة */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.8,
            borderLeft: { md: "1px solid #E2E8F0" },
            px: { md: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              color: "#1E293B",
            }}
          >
            <LocalOfferOutlined sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              خطة الاشتراك
            </Typography>
          </Box>

          <Chip
            label={
              <Typography sx={{ fontSize: "13px" }}>
                ({subscription.plan.durationMonths} شهر ){"  "}
                {subscription.plan.code}
              </Typography>
            }
            size="small"
            sx={{
              bgcolor: "primary.light" + "alpha(0.1)",
              color: "primary.main",
              fontSize: "11px",
              fontWeight: 600,
              py: 1.5,
              px: 1,
              height: "22px",
            }}
          />
        </Box>

        {/* العمود الخامس: تفاصيل الأسعار */}
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            bgcolor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 1.2,
          }}
        >
          {/* مقارنة السعر الأساسي بالنهائي */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {/* السعر الأساسي */}
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "11px", color: "#64748B", mb: 0.3 }}>
                السعر الأساسي
              </Typography>
              <Typography
                sx={{ fontSize: "13px", fontWeight: 700, color: "#334155" }}
              >
                {subscription.currency} {formatPrice(subscription.basePrice)}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />

            {/* السعر النهائي */}
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "11px", color: "#64748B", mb: 0.3 }}>
                السعر النهائي
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "secondary.main",
                }}
              >
                {subscription.currency} {formatPrice(subscription.finalPrice)}
              </Typography>
            </Box>
          </Box>

          {/* شريط نسبة الخصم الإجمالية */}
          {subscription.appliedOffer && (
            <Box
              sx={{
                bgcolor: "#e6dcec",
                borderRadius: "6px",
                py: 0.5,
                textAlign: "center",
                border: "1px dashed #9a989b",
              }}
            >
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                تم تطبيق خصم {subscription.appliedOffer.discountValue}%
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Paper>
  );
};

export default CurrentSubscriptionCard;
