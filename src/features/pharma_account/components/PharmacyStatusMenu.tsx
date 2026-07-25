import { Menu, MenuItem } from "@mui/material";
import {
  pharmacyStatuses,
  type PharmacyStatusValue,
} from "../../../shared/constants/pharmacyStatuses";

interface Props {
  anchorEl: HTMLElement | null;

  open: boolean;

  onClose: () => void;

  onChangeStatus: (status: PharmacyStatusValue) => void;
}

const PharmacyStatusMenu = ({
  anchorEl,
  open,
  onClose,
  onChangeStatus,
}: Props) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {pharmacyStatuses.map((status) => (
        <MenuItem
          key={status.value}
          onClick={() => onChangeStatus(status.value)}
        >
          {status.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default PharmacyStatusMenu;
