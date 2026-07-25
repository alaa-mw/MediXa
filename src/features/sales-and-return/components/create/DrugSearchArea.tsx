// import {
//   Box,
//   InputBase,
//   styled,
//   Tooltip,
//   Popper,
//   Paper,
//   ClickAwayListener,
// } from "@mui/material";
// import { useState, useRef } from "react";
// import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
// import TuneIcon from "@mui/icons-material/Tune";
// import SearchIcon from "@mui/icons-material/Search";

// import { useDebounce } from "../../../../shared/hooks/useDebounce";
// import { TradeNameSearchContent } from "./TradeNameSearchContent";
// import { ActiveIngredientSearchContent } from "./ActiveIngredientSearchContent";

// // --- Styled Components ---
// const CommandCenter = styled(Box)({
//   background: "#ffffff",
//   borderRadius: "24px",
//   padding: "20px",
//   boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
//   border: "1px solid #f1f5f9",
// });

// const SearchInputContainer = styled(Box)({
//   flex: 1,
//   background: "#f8fafc",
//   borderRadius: "16px",
//   padding: "0 16px",
//   height: "56px",
//   display: "flex",
//   alignItems: "center",
//   border: "1px solid #e2e8f0",
//   transition: "all 0.3s ease",
//   "&:focus-within": {
//     background: "#ffffff",
//     borderColor: "primary.main", // أو primary.main
//     boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.1)",
//   },
// });

// const ActionButton = styled(Box)({
//   width: 56,
//   height: 56,
//   borderRadius: "16px",
//   background: "#f8fafc",
//   border: "1px solid #e2e8f0",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   cursor: "pointer",
//   transition: "all 0.2s",
//   "&:hover": { background: "#f1f5f9", borderColor: "#cbd5e1" },
// });
// // -----------------------

// export const DrugSearchArea = () => {
//   const [mode, setMode] = useState<"TRADE" | "INGREDIENT">("TRADE");
//   const activeColor = "primary.main";

//   const [searchTerm, setSearchTerm] = useState("");
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [userTypingSignal, setUserTypingSignal] = useState(0);

//   const anchorRef = useRef<HTMLDivElement>(null);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     // إرسال إشارة أن المستخدم يطبع بيده الآن
//     setUserTypingSignal((prev) => prev + 1);

//     if (value.trim() !== "") {
//       setIsDropdownOpen(true);
//     } else {
//       setIsDropdownOpen(false);
//     }
//   };

//   const handleModeChange = (newMode: "TRADE" | "INGREDIENT") => {
//     setMode(newMode);
//     setSearchTerm("");
//     setIsDropdownOpen(false);
//   };

//   return (
//     <CommandCenter>
//       {/* صف التبديل */}
//       <Box sx={{ display: "flex", gap: "12px", mb: 2 }}>
//         {["TRADE", "INGREDIENT"].map((m) => (
//           <Box
//             key={m}
//             onClick={() => handleModeChange(m as any)}
//             sx={{
//               px: 3,
//               py: 0.8,
//               borderRadius: "12px",
//               fontSize: "14px",
//               fontWeight: 600,
//               cursor: "pointer",
//               transition: "all 0.3s",
//               bgcolor: mode === m ? activeColor : "#f1f5f9",
//               color: mode === m ? "#ffffff" : "#64748b",
//             }}
//           >
//             {m === "TRADE" ? "الاسم التجاري" : "المادة الفعالة"}
//           </Box>
//         ))}
//       </Box>

//       {/* منطقة الإدخال */}
//       <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
//         <ClickAwayListener onClickAway={() => setIsDropdownOpen(false)}>
//           <Box sx={{ flex: 1, position: "relative" }} ref={anchorRef}>
//             <SearchInputContainer>
//               <SearchIcon sx={{ color: "#94a3b8", mr: 1 }} />
//               <InputBase
//                 fullWidth
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder={
//                   mode === "TRADE"
//                     ? "ابحث بالاسم التجاري أو الباركود..."
//                     : "ابحث بالمادة الفعالة..."
//                 }
//                 sx={{ fontSize: "15px" }}
//               />
//             </SearchInputContainer>

//             {/* القائمة المنسدلة */}
//             <Popper
//               open={isDropdownOpen}
//               anchorEl={anchorRef.current}
//               placement="bottom-start"
//               style={{
//                 width: anchorRef.current?.clientWidth,
//                 zIndex: 1300,
//                 paddingTop: "8px",
//               }}
//             >
//               <Paper
//                 elevation={4}
//                 sx={{
//                   maxHeight: "70vh",
//                   overflowY: "auto",
//                   borderRadius: "16px",
//                   p: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 {mode === "TRADE" ? (
//                   <TradeNameSearchContent
//                     debouncedSearchTerm={debouncedSearchTerm}
//                     userTypingSignal={userTypingSignal}
//                     onDrugSelectedUpdateText={(name) => setSearchTerm(name)}
//                     onCloseDropdown={() => {
//                       setIsDropdownOpen(false);
//                       setSearchTerm("");
//                     }}
//                   />
//                 ) : (
//                   <ActiveIngredientSearchContent
//                     debouncedSearchTerm={debouncedSearchTerm}
//                     onClearSearchText={() => setSearchTerm("")}
//                     onCloseDropdown={() => {
//                       setIsDropdownOpen(false);
//                       setSearchTerm("");
//                     }}
//                   />
//                 )}
//               </Paper>
//             </Popper>
//           </Box>
//         </ClickAwayListener>

//         {mode === "INGREDIENT" && (
//           <Tooltip title="تصفية النتائج">
//             <ActionButton sx={{ color: activeColor }}>
//               <TuneIcon />
//             </ActionButton>
//           </Tooltip>
//         )}

//         <Tooltip title="مسح باركود">
//           <ActionButton>
//             <QrCodeScannerIcon sx={{ color: "#64748b" }} />
//           </ActionButton>
//         </Tooltip>
//       </Box>
//     </CommandCenter>
//   );
// };


import {
  Box,
  InputBase,
  styled,
  Tooltip,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import { useState, useRef } from "react";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
// import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";

import { useDebounce } from "../../../../shared/hooks/useDebounce";
import { TradeNameSearchContent } from "./TradeNameSearchContent";
import { ActiveIngredientSearchContent } from "./ActiveIngredientSearchContent";

// --- Styled Components ---
const CommandCenter = styled(Box)({
  background: "#ffffff",
  borderRadius: "24px",
  padding: "20px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  border: "1px solid #f1f5f9",
});

const SearchInputContainer = styled(Box)({
  flex: 1,
  background: "#f8fafc",
  borderRadius: "16px",
  padding: "0 16px",
  height: "56px",
  display: "flex",
  alignItems: "center",
  border: "1px solid #e2e8f0",
  transition: "all 0.3s ease",
  "&:focus-within": {
    background: "#ffffff",
    borderColor: "primary.main",
    boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.1)",
  },
});

const ActionButton = styled(Box)({
  width: 56,
  height: 56,
  borderRadius: "16px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": { background: "#f1f5f9", borderColor: "#cbd5e1" },
});
// -----------------------

export const DrugSearchArea = () => {
  const [mode, setMode] = useState<"TRADE" | "INGREDIENT">("TRADE");
  const activeColor = "primary.main";

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userTypingSignal, setUserTypingSignal] = useState(0);
  
  // إضافة حالة لمعرفة هل يوجد مواد مختارة أم لا
  const [hasSelectedIngredients, setHasSelectedIngredients] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    setUserTypingSignal((prev) => prev + 1);

    if (value.trim() !== "") {
      setIsDropdownOpen(true);
    } else {
      // التعديل هنا: لا تغلق القائمة إذا كنا في وضع المادة الفعالة وهناك مواد مختارة مسبقاً
      if (mode === "INGREDIENT" && hasSelectedIngredients) {
        setIsDropdownOpen(true);
      } else {
        setIsDropdownOpen(false);
      }
    }
  };

  const handleModeChange = (newMode: "TRADE" | "INGREDIENT") => {
    setMode(newMode);
    setSearchTerm("");
    setIsDropdownOpen(false);
    setHasSelectedIngredients(false); // تصفير الحالة عند تغيير الوضع
  };

  return (
    <CommandCenter>
      <Box sx={{ display: "flex", gap: "12px", mb: 2 }}>
        {["TRADE", "INGREDIENT"].map((m) => (
          <Box
            key={m}
            onClick={() => handleModeChange(m as any)}
            sx={{
              px: 3,
              py: 0.8,
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s",
              bgcolor: mode === m ? activeColor : "#f1f5f9",
              color: mode === m ? "#ffffff" : "#64748b",
            }}
          >
            {m === "TRADE" ? "الاسم التجاري" : "المادة الفعالة"}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <ClickAwayListener onClickAway={() => setIsDropdownOpen(false)}>
          <Box sx={{ flex: 1, position: "relative" }} ref={anchorRef}>
            <SearchInputContainer>
              <SearchIcon sx={{ color: "#94a3b8", mr: 1 }} />
              <InputBase
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                // التعديل هنا: فتح القائمة عند الضغط على الإدخال إذا كان هناك مواد مختارة
                onFocus={() => {
                  if (searchTerm.trim() !== "" || (mode === "INGREDIENT" && hasSelectedIngredients)) {
                    setIsDropdownOpen(true);
                  }
                }}
                placeholder={
                  mode === "TRADE"
                    ? "ابحث بالاسم التجاري أو الباركود..."
                    : "ابحث بالمادة الفعالة..."
                }
                sx={{ fontSize: "15px" }}
              />
            </SearchInputContainer>

            <Popper
              open={isDropdownOpen}
              anchorEl={anchorRef.current}
              placement="bottom-start"
              style={{
                width: anchorRef.current?.clientWidth,
                zIndex: 1300,
                paddingTop: "8px",
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                  borderRadius: "16px",
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {mode === "TRADE" ? (
                  <TradeNameSearchContent
                    debouncedSearchTerm={debouncedSearchTerm}
                    userTypingSignal={userTypingSignal}
                    onDrugSelectedUpdateText={(name) => setSearchTerm(name)}
                    onCloseDropdown={() => {
                      setIsDropdownOpen(false);
                      setSearchTerm("");
                    }}
                  />
                ) : (
                  <ActiveIngredientSearchContent
                    debouncedSearchTerm={debouncedSearchTerm}
                    onClearSearchText={() => setSearchTerm("")}
                    onCloseDropdown={() => {
                      setIsDropdownOpen(false);
                      setSearchTerm("");
                    }}
                    // تمرير الدالة للابن ليخبر الأب بوجود مواد مختارة
                    onSelectionChange={(hasItems) => setHasSelectedIngredients(hasItems)} 
                  />
                )}
              </Paper>
            </Popper>
          </Box>
        </ClickAwayListener>

        {/* {mode === "INGREDIENT" && (
          <Tooltip title="تصفية النتائج">
            <ActionButton sx={{ color: activeColor }}>
              <TuneIcon />
            </ActionButton>
          </Tooltip>
        )} */}

        <Tooltip title="مسح باركود">
          <ActionButton>
            <QrCodeScannerIcon sx={{ color: "#64748b" }} />
          </ActionButton>
        </Tooltip>
      </Box>
    </CommandCenter>
  );
};


