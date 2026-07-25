import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { usePostData } from "../../../shared/hooks/usePostData";
import { useSnackbar } from "../../../shared/providers/useSnackbar";
import textfieldStyle from "../../constants/textFieldStyle";

interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "select";
  options?: { value: string; label: string }[];
}

interface DynamicQuickAddModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  apiUrl: string;
  fields: FormField[];
  onSuccessRefetch?: () => void;
}

const DynamicQuickAddModal = ({
  open,
  onClose,
  title,
  apiUrl,
  fields,
  onSuccessRefetch,
}: DynamicQuickAddModalProps) => {
  const { showSnackbar } = useSnackbar();
  const { mutate: createItem, isPending } = usePostData(apiUrl);

  const getInitialState = () =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});

  const [formData, setFormData] =
    useState<Record<string, any>>(getInitialState);

  useEffect(() => {
    if (open) {
      setFormData(getInitialState());
    }
  }, [open, fields]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    createItem(formData, {
      onSuccess: () => {
        showSnackbar("تم الحفظ بنجاح", "success");
        if (onSuccessRefetch) onSuccessRefetch();
        onClose();
        // إعادة تهيئة النموذج
        setFormData(
          fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
        );
      },
      onError: (err) => {
        showSnackbar(err.message || "حدث خطأ أثناء الحفظ", "error");
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      dir="rtl"
      slotProps={{ paper: { sx: { borderRadius: 3 } } }}
    >
      <DialogTitle sx={{ fontFamily: "inherit", fontWeight: "bold" }}>
        {title}
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 2 }}
      >
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            fullWidth
            select={field.type === "select"}
            value={formData[field.name]}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            sx={{
              ...textfieldStyle,
              "& .MuiInputLabel-root": {
                right: 20,
                left: "auto",
                transformOrigin: "top right",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  textAlign: "right",
                },
                "& input": {
                  paddingRight: "20px !important",
                  paddingLeft: "14px !important",
                  textAlign: "right",
                },
              },
              "& .MuiSelect-icon": {
                right: "auto",
                left: 8,
              },
              "& .MuiSelect-select": {
                paddingRight: "20px !important",
                paddingLeft: "32px !important",
                textAlign: "right",
              },
            }}
          >
            {field.type === "select" &&
              field.options?.map((opt) => (
                <MenuItem
                  key={opt.value}
                  value={opt.value}
                  sx={{ fontFamily: "inherit" }}
                >
                  {opt.label}
                </MenuItem>
              ))}
          </TextField>
        ))}
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          color="inherit"
          sx={{ fontFamily: "inherit" }}
        >
          إلغاء
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={isPending}
          sx={{ fontFamily: "inherit" }}
        >
          {isPending ? "جاري الحفظ..." : "حفظ وإدخال"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicQuickAddModal;
