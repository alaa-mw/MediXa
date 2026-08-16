import React, { useState } from "react";
import {
  Button,
  Popover,
  Box,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import type { ButtonProps } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type PeriodPopoverButtonProps = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  label?: string;
  buttonProps?: Partial<ButtonProps>;
};

const PeriodPopoverButton = ({
  value,
  onChange,
  min = 1,
  max = 365,
  label = "أيام",
  buttonProps,
}: PeriodPopoverButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [temp, setTemp] = useState(String(value));

  const open = (el: HTMLElement) => {
    setTemp(String(value));
    setAnchorEl(el);
  };

  const close = () => setAnchorEl(null);

  const confirm = () => {
    const parsed = Number(temp || 0);
    const v = Math.max(min, Math.min(max, Math.floor(parsed || 0)));
    onChange(v);
    close();
  };

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        onClick={(e) => open(e.currentTarget as HTMLElement)}
        endIcon={<ArrowDropDownIcon fontSize="small" />}
        {...buttonProps}
        sx={{whiteSpace:"nowrap"}}
      >
        {value} {label}
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={close}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1 }}>
          <TextField
            size="small"
            type="number"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            sx={{ width: 96, backgroundColor: "#F8FCFF", borderRadius: 1 }}
          />
          <Typography sx={{ color: "#6D7F99", fontWeight: 700 }}>
            {label}
          </Typography>
          <IconButton size="small" onClick={confirm} aria-label="confirm">
            <CheckIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={close} aria-label="cancel">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Popover>
    </>
  );
};

export default PeriodPopoverButton;
