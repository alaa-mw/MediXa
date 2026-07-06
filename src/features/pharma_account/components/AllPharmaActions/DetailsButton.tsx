import type { Pharmacy } from "../../types/allPharmaciesResponse";
import ActionButton from "./ActionButton";

interface Props {
  pharmacy: Pharmacy;
  onDetails: (pharmacy: Pharmacy) => void;
}

const DetailsButton = ({ pharmacy, onDetails }: Props) => {
  const handleClick = () => {
    onDetails(pharmacy);
  };

  return <ActionButton label="تفاصيل" onClick={handleClick} />;
};

export default DetailsButton;
