import React from "react";
import ActionButton from "./ActionButton";

const SubscriptionHistoryButton = () => {
  return (
    <ActionButton
      label=" الاشتراكات"
      onClick={() => console.log("subscribe")}
    />
  );
};

export default SubscriptionHistoryButton;
