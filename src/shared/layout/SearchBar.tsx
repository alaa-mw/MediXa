// import React from "react";
// import { TextField, InputAdornment } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

// interface SearchBarProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder: string;
// }

// export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
//   return (
//     <TextField
//        variant="outlined" 
//       placeholder={placeholder}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       fullWidth
//       slotProps={{
//         input: {
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon sx={{ color: "#757575" }} />
//             </InputAdornment>
//           ),
//           endAdornment: (
//             <InputAdornment position="end">
//                       <QrCodeScannerIcon sx={{ color: "#1e2524", cursor: "pointer" }} />
//             </InputAdornment>
//           ),
//         },

//       }}
//       sx={{
        
//         "& .MuiOutlinedInput-root": {
          
//           borderRadius: "12px",
//           backgroundColor: "background.paper",
//           "& fieldset": { borderColor: "primary" },
//           "&:hover fieldset": { borderColor: "#e0e0e0" },
//           "&.Mui-focused fieldset": { borderColor: "primary.light" },
//         },
//       }}
//     />
//   );
// };