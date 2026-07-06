import ActionButton from "./ActionButton";
import type { Pharmacy } from "../../types/allPharmaciesResponse";

interface Props {
  pharmacy: Pharmacy;
  onEdit: (pharmacy: Pharmacy) => void;
}

const EditButton = ({ pharmacy, onEdit }: Props) => {
  const handleClick = () => {
    onEdit(pharmacy);
  };
  return <ActionButton label="تعديل" onClick={handleClick} />;
};

export default EditButton;
