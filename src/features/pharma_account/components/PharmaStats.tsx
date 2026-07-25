import { Box, Paper, Typography } from "@mui/material";

interface StatsCardProps {
  title: string;
  value: number | string;
  shadowColor: string;
  bgColor: string;
}
interface PharmaStatsCardsProps {
  numberOfPharmacies: number;
  numberOfActiveSubscriptions: number;
}
const PharmaStatsCards = ({
  numberOfPharmacies,
  numberOfActiveSubscriptions,
}: PharmaStatsCardsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        mb: 4,
        justifyContent: "flex-start",
      }}
    >
      {/* الكارد الأول: عدد الصيدليات المسجلة (بظل رمادي خفيف) */}
      <StatsCard
        title="عدد الصيدليات المسجلة"
        value={numberOfPharmacies}
        shadowColor="rgba(214, 81, 231, 0.15)"
        bgColor="#e7e7e7"
      />

      {/* الكارد الثاني: الاشتراكات النشطة (بظل أخضر خفيف) */}
      <StatsCard
        title="الاشتراكات النشطة"
        value={numberOfActiveSubscriptions}
        shadowColor="rgba(99, 235, 151, 0.15)"
        bgColor="#cdffd9"
      />
    </Box>
  );
};
export default PharmaStatsCards;

const StatsCard = ({ title, value, shadowColor, bgColor }: StatsCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "12px",
        border: "1px solid #dddddd",
        bgcolor: `${bgColor}`,
        width: "100%",
        minWidth: "240px",
        maxWidth: "320px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "70px",
        boxShadow: `0px 4px 12px ${shadowColor}`,
        direction: "rtl",
      }}
    >
      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: 600,
          color: "#334155",
          textAlign: "right",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "26px",
          fontWeight: 700,
          color: "#064E3B",
          textAlign: "left",
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};
