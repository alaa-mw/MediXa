import { create } from "zustand";
import {
  INITIAL_FORM,
  type PharmacyRegistrationForm,
} from "../types/createPharamacyFormTypes";

interface Store {
  formData: PharmacyRegistrationForm;

  planId: number | null;

  offerId: number | null;

  setFormData: (
    data:
      | PharmacyRegistrationForm
      | ((prev: PharmacyRegistrationForm) => PharmacyRegistrationForm),
  ) => void;

  setSubscription: (planId: number, offerId?: number | null) => void;

  clearAll: () => void;
}

export const usePharmacyRegistrationStore = create<Store>((set) => ({
  formData: INITIAL_FORM,

  planId: null,

  offerId: null,

  setFormData: (data) =>
    set((state) => ({
      formData: typeof data === "function" ? data(state.formData) : data,
    })),

  setSubscription: (planId, offerId) =>
    set({
      planId: planId,
      offerId: offerId ?? null,
    }),

  clearAll: () =>
    set({
      formData: INITIAL_FORM,
      planId: null,
      offerId: null,
    }),
}));
