export interface OwnerForm {
  id?: number;
  ownerName: string;
  email: string;
  mobile: string;
  nationalId: string;
}

export interface PharmacyForm {
  pharmacyName: string;
  pharmacistLicenseNo: string;
  contactPhone: string;
  email: string;
  governorate: string;
  healthDirectorate: string;
  areaName: string;
  addressText: string;
  openingDate: string;
  // add more attributes
}

export interface PharmacyRegistrationForm {
  ownerMode: "NEW" | "EXISTING";
  newOwner: OwnerForm;
  pharmacy: PharmacyForm;
  subscription: {
    planId: string;
    offerId: string;
    startsAt: string;
  };
}

export const INITIAL_FORM: PharmacyRegistrationForm = {
  ownerMode: "NEW",
  newOwner: {
    ownerName: "",
    email: "",
    mobile: "",
    nationalId: "",
  },
  pharmacy: {
    pharmacyName: "",
    pharmacistLicenseNo: "",
    contactPhone: "",
    email: "",
    governorate: "",
    healthDirectorate: "",
    areaName: "",
    addressText: "",
    openingDate: "",
  },
  subscription: {
    planId: "",
    offerId: "",
    startsAt: "",
  },
};
