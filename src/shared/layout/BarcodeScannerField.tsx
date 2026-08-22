import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";

interface BarcodeScannerFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onScan?: (barcode: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
  padding?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const BarcodeScannerField: React.FC<BarcodeScannerFieldProps> = ({
  label,
  value,
  onChange,
  onScan,
  placeholder,
  fullWidth = true,
  padding = "16px",
  error = false,
  helperText,
  disabled = false,
  autoFocus = true,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const bufferRef = useRef<string>("");
  const lastKeyTimeRef = useRef<number>(0);

  // التركيز التلقائي عند فتح الواجهة
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // دالة احترافية لتحويل Physical Key Code إلى الحرف الإنجليزي المقابل فوراً
  const getCharFromEvent = (e: KeyboardEvent): string | null => {
    // 1. التعامل مع الحروف الإنجليزية
    if (e.code.startsWith("Key")) {
      const char = e.code.replace("Key", ""); // KeyA -> A
      return e.shiftKey ? char.toUpperCase() : char.toLowerCase();
    }

    // 2. التعامل مع الأرقام العلوية
    if (e.code.startsWith("Digit")) {
      return e.code.replace("Digit", ""); // Digit1 -> 1
    }

    // 3. التعامل مع أرقام لوحة الأرقام الجانبية (Numpad)
    if (e.code.startsWith("Numpad") && !isNaN(Number(e.code.replace("Numpad", "")))) {
      return e.code.replace("Numpad", "");
    }

    // 4. الرموز الخاصة المرافقة للباركود
    const symbolMap: Record<string, string> = {
      Minus: "-",
      Equal: "=",
      Slash: "/",
      Backslash: "\\",
      Period: ".",
      Comma: ",",
      Space: " ",
    };

    return symbolMap[e.code] || null;
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // إذا كان المستخدم يكتب يدوياً في حقل آخر متنسق، نتجاهل القراءة
      const activeElement = document.activeElement;
      const isOtherInputFocused =
        activeElement &&
        (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") &&
        activeElement !== inputRef.current;

      if (isOtherInputFocused || disabled) return;

      const currentTime = Date.now();
      const timeDiff = currentTime - lastKeyTimeRef.current;
      lastKeyTimeRef.current = currentTime;

      // عند انتهاء القراءة بواسطة القارئ (يرسل Enter عادةً)
      if (e.code === "Enter" || e.key === "Enter") {
        if (bufferRef.current.length > 0) {
          e.preventDefault();
          const scannedVal = bufferRef.current;

          onChange(scannedVal);
          if (onScan) onScan(scannedVal);

          bufferRef.current = ""; // تفريغ الـ Buffer للقراءة التالية

          if (inputRef.current) inputRef.current.focus();
        }
      } else {
        const char = getCharFromEvent(e);
        if (char) {
          // إذا كانت الفترات الزمنية بين الضغطات قصيرة جداً (ميزة القارئ السريع)
          if (timeDiff > 60) {
            bufferRef.current = char; // بدء باركود جديد
          } else {
            bufferRef.current += char; // استكمال قراءة الباركود
          }
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [onChange, onScan, disabled]);

  return (
    <TextField
      inputRef={inputRef}
      fullWidth={fullWidth}
      type="text"
      disabled={disabled}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      error={error}
      helperText={helperText}
      sx={{
        direction: "rtl",

        "& .MuiOutlinedInput-root": {
          backgroundColor: "#f1f5f9",
          borderRadius: "14px",
          transition: "all 0.2s ease-in-out",
          paddingRight: "0px !important",
          paddingLeft: "0px !important",

          "& fieldset": {
            borderColor: "transparent",
            borderRadius: "14px",
            transition: "all 0.2s ease-in-out",
          },
          "&:hover fieldset": {
            borderColor: "#cbd5e1",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#0f766e",
            borderWidth: "1.5px",
          },
          "&.Mui-error fieldset": {
            borderColor: "#d32f2f !important",
            borderWidth: "1.5px !important",
          },
          "&:hover.Mui-error fieldset": {
            borderColor: "#d32f2f !important",
          },
          "&.Mui-focused.Mui-error fieldset": {
            borderColor: "#d32f2f !important",
          },
        },

        "& .MuiInputLabel-outlined": {
          color: "#64748b",
          right: "16px !important",
          left: "auto !important",
          transformOrigin: "top right",
          transform: "translate(0, 16px) scale(1)",
          zIndex: 1,
          pointerEvents: "none",

          "&.MuiInputLabel-shrink": {
            transform: "translate(0, -6px) scale(0.75)",
            backgroundColor: "#ffffff",
            padding: "0 6px",
          },
          "&.Mui-focused": {
            color: "#0f766e",
          },
          "&.Mui-error": {
            color: "#d32f2f !important",
          },
        },

        "& .MuiOutlinedInput-input": {
          textAlign: "right",
          paddingRight: "16px !important",
          paddingLeft: "16px !important",
          height: "1.4375em",
          padding: padding,
        },

        "& .MuiFormHelperText-root": {
          textAlign: "right",
          marginRight: 0,
          marginLeft: 0,
          fontWeight: 600,
          fontSize: "12px",
          color: "#d32f2f",
        },
      }}
    />
  );
};