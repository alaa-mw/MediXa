import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import FormTextField from "../../FormTextField";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearchClick: () => void; // 1. إضافة الخاصية هنا لحل مشكلة التايب سكريبت
}

const PharmacySearchForOffer = ({ value, onChange, onSearchClick }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "row",
        py: 1,
      }}
    >
      <TextField
        fullWidth
        placeholder="ابحث عن صيدلية..."
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearchClick();
          }
        }}
        size="small" // لجعل الحجم متناسقاً مع الزر بشكل أفضل
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            paddingLeft: "16px", // إضافة حشو داخلي جانبي ليتناسق مع الحواف الدائرية
            paddingRight: "16px",
            backgroundColor: "#ffffff",
            "& fieldset": { borderColor: "#cbd5e1" },
            "&:hover fieldset": { borderColor: "#cbd5e1" },
            "&.Mui-focused fieldset": { borderColor: "primary.main" },
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="medium"
        startIcon={<SearchIcon />}
        onClick={onSearchClick}
        sx={{
          whiteSpace: "nowrap", // لمنع النص من النزول لسطر جديد
          height: "40px", // ليتناسب تماماً مع ارتفاع TextField size="small"
          borderRadius: "10px",
        }}
      >
        بحث
      </Button>
    </Box>
  );
};

export default PharmacySearchForOffer;
//  onKeyDown={(e) => {
//         if (e.key === "Enter") {
//           onSearchClick();
//         }
//     }}
//       <FormTextField
//         label="البحث عن صيدلية"
//         placeholder="ابحث بالاسم أو البريد الإلكتروني..."
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         slotProps={{
//           input: {
//             startAdornment: (
//               <InputAdornment position="start">
//                 {/* 2. جعل أيقونة البحث قابلة للضغط لتشغيل دالة البحث */}
//                 <IconButton onClick={onSearchClick} edge="start">
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           },
//         }}
//         // لتفعيل البحث عند الضغط على زر Enter داخل الحقل
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             onSearchClick();
//           }
//         }}
//       />
