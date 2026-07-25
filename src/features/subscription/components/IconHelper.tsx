import {
  BusinessCenterOutlined,
  RocketLaunchOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { CrownIcon } from "lucide-react";
import React from "react";
import theme from "../../../shared/styles/arabicTheme";

interface IconHelperProps {
  color: string;
  icon: React.ReactNode;
}
const MyIcons = ({ color, icon }: IconHelperProps) => {
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: color || "#F5EEFC", // اللون البنفسجي الفاتح جداً للخلفية
        borderRadius: "24px", // زوايا منحنية ناعمة (Squircle)
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
      }}
    >
      {icon}
    </Box>
  );
};

const IconHelper = ({ code, lightColor }: String | any) => {
  return code === "STARTER" ? (
    <MyIcons
      color={lightColor}
      icon={
        <RocketLaunchOutlined
          fontSize="large"
          sx={{ color: "secondary.main" }}
        />
      }
    />
  ) : code === "PROFESSIONAL" ? (
    <MyIcons
      color={lightColor}
      icon={
        <BusinessCenterOutlined
          fontSize="large"
          sx={{ color: "primary.main" }}
        />
      }
    />
  ) : (
    <MyIcons
      color={lightColor}
      icon={
        <CrownIcon
          size={35}
          strokeWidth={1.5}
          color={theme.palette.secondary.main}
        />
      }
    />
  );
};

export default IconHelper;

// export default function IconHelper({ color, icon }: IconHelperProps) {
//   return (
//     //   <Box
//     //     sx={{
//     //       width: 80,
//     //       height: 80,
//     //       backgroundColor: "#EBF7EE", // اللون الأخضر الفاتح جداً للخلفية
//     //       borderRadius: "24px", // زوايا منحنية ناعمة (Squircle)
//     //       display: "flex",
//     //       justifyContent: "center",
//     //       alignItems: "center",
//     //       boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)", // ظل خفيف جداً وغير ملحوظ
//     //     }}
//     //   >
//     //     <RocketIcon
//     //       sx={{
//     //         fontSize: 42,
//     //         color: "#2E7D32", // اللون الأخضر الداكن للأيقونة
//     //       }}
//     //     />
//     //   </Box>
//     // );
//     <Box
//       sx={{
//         width: 80,
//         height: 80,
//         backgroundColor: "#F5EEFC", // اللون البنفسجي الفاتح جداً للخلفية
//         borderRadius: "24px", // زوايا منحنية ناعمة (Squircle)
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
//       }}
//     >
//       <CrownIcon
//         sx={{
//           fontSize: 42,
//           color: "#7A32B9", // اللون البنفسجي الداكن للأيقونة
//         }}
//       />
//     </Box>
//   );
// }
