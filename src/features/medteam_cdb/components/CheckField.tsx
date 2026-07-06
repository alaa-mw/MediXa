import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  label: string;
  options: string[];
  defaultValue?: string;
}

export default function SelectField({ label, options, defaultValue }: Props) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel shrink>{label}</InputLabel>

      <Select
        displayEmpty
        defaultValue={defaultValue ?? ""}
        label={label}
        sx={{
          bgcolor: "#F5F6F8",
          borderRadius: 2,
          height: 52,
        }}
      >
        {options.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
