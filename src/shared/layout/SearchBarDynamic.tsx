import { Search } from "@mui/icons-material";
import { Box, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface SearchBarProps<T> {
  placeholder?: string;

  onChange: (value: string) => void;
  results?: T[];

  onSelect?: (item: T) => void;
  selected?: T | null;

  getOptionLabel?: (item: T) => string;
  startAdornment?: React.ReactNode;
  /** Optional barcode reader component (e.g. <BarcodeAllDrugs />). If provided, it will receive `onFindResult` injected. */
  barcodeComponent?: React.ReactElement;
}

export default function SearchBarDynamic<T>({
  placeholder,
  onChange,
  results = [],
  onSelect,
  getOptionLabel,
  startAdornment,
  barcodeComponent,
}: SearchBarProps<T>) {
  const [open, setOpen] = React.useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <Box ref={wrapperRef} sx={{ position: "relative", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#FFFFFF",
          border: "1.5px solid #E2E8F0",
          borderRadius: "16px",
          px: 2,
          py: 1.5,
          height: 48,
          transition: "all 0.2s ease-in-out",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          "&:hover, &:focus-within": {
            borderColor: "#2C6470",
            boxShadow: "0 10px 15px -3px rgba(44,100,112,0.1)",
          },
        }}
      >
        <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
          <Search />
        </Box>

        <input
          value={value}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            const text = e.target.value;
            setValue(text);

            if (text.length >= 3) {
              onChange(text); // استدعاء الـ hook من الأب
            } else {
              onChange("");
            }
          }}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: 15,
            fontFamily: "inherit",
            background: "transparent",
            textAlign: "right",
          }}
        />

        {startAdornment && <Box>{startAdornment}</Box>}

        {barcodeComponent && <Box>{barcodeComponent}</Box>}
      </Box>

      {open && results.length > 0 && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            width: "100%",
            mt: 1,
            borderRadius: 2,
            zIndex: 20,
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          <List>
            {results.map((item, index) => (
              
              <ListItemButton
                  key={index}
                  onClick={() => {
                    if (onSelect) {
                      onSelect(item);
                    }
                    setOpen(false);
                  }}
                  sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "#EBF8FA",
                  border: "1px solid #D2ECF0",
                  borderRadius: "8px",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                  cursor: "pointer",
                }}
                >
                  <ListItemText
                    sx={{ my: 0 }}
                    primary={getOptionLabel ? getOptionLabel(item) : ""}
                  />
                </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
