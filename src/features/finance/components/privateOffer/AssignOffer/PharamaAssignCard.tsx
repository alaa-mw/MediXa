import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Card, Checkbox, Chip, Typography } from "@mui/material";
import { RadioButtonUnchecked } from "@mui/icons-material";
import { formatDate } from "date-fns";
import type { PharmacyItemData } from "../../../types/pharmacyItem";

interface Props {
  pharmacy: PharmacyItemData;
  selected: boolean;
  onSelect: () => void;
}

const PharmacyAssignCard = ({ pharmacy, selected, onSelect }: Props) => {
  return (
    <Card
      variant="outlined"
      onClick={onSelect} // جعل الكارد بالكامل قابلاً للضغط للاختيار السهل
      sx={{
        borderRadius: "16px",
        borderColor: selected ? "primary.main" : "#E2E8F0", // يتغير اللون عند الاختيار
        backgroundColor: selected ? "#F0FDF4" : "#F8FAFC", // خلفية مائلة للأخضر الخفيف عند التحديد
        p: 2.5,
        width: "100%",
        maxWidth: 800,
        direction: "rtl",
        fontFamily: "inherit",
        cursor: "pointer", // إظهار مؤشر اليد عند تمرير الفأرة
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        {/* التشيك بوكس الآن يعتمد على حالة الـ selected الخاصة بالاختيار */}
        <Checkbox
          checked={selected}
          onChange={onSelect}
          onClick={(e) => e.stopPropagation()} // منع تكرار الحدث عند الضغط مباشرة على التشيك بوكس
          checkedIcon={
            <CheckCircleIcon sx={{ fontSize: 28, color: "#22C55E" }} />
          }
          icon={
            <RadioButtonUnchecked sx={{ fontSize: 28, color: "#CBD5E1" }} />
          }
          sx={{ p: 0, mt: 0.5 }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#1E293B", fontSize: "1.1rem" }}
            >
              {pharmacy.pharmacyName}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Chip
                label={pharmacy.status}
                size="small"
                sx={{
                  backgroundColor:
                    pharmacy.status === "ACTIVE" ? "#DCFCE7" : "#F1F5F9",
                  color: pharmacy.status === "ACTIVE" ? "#15803D" : "#64748B",
                  fontWeight: "bold",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                }}
              />
              <Typography variant="body2" sx={{ color: "#64748B" }}>
                المعرف: {pharmacy.pharmacyId}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              textAlign: "right",
              direction: "ltr",
              display: "block",
            }}
          >
            {pharmacy.email}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            {pharmacy.nextSubscription && (
              <Typography
                variant="body2"
                sx={{ color: "#64748B", fontWeight: 500 }}
              >
                الاشتراك القادم:{" "}
                <Box
                  component="span"
                  sx={{ color: "#1E293B", fontWeight: 700 }}
                >
                  {pharmacy.nextSubscription.plan.name} (
                  {pharmacy.nextSubscription.pharmacySubscriptionId})
                </Box>{" "}
                بدءاً من{" "}
                <Box
                  component="span"
                  sx={{ color: "#64748B", fontWeight: 600 }}
                >
                  {formatDate(pharmacy.nextSubscription.startsAt, "dd/MM/yyyy")}
                </Box>
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PharmacyAssignCard;
