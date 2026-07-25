import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";

interface SubscriptionHistoryButtonProps {
  pharmacyId: string | number;
}

const SubscriptionHistoryButton = ({
  pharmacyId,
}: SubscriptionHistoryButtonProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/admin/pharmacies/subscription-schedule/${pharmacyId}`);
  };

  return <ActionButton label="الاشتراكات" onClick={handleNavigate} />;
};

export default SubscriptionHistoryButton;
