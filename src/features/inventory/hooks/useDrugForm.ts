import { useAppDispatch, useAppSelector } from "../../../shared/store/hooks";
import {
  selectGeneralDrugState,
  updateFormField as updateGeneralField,
  addBatch as addGeneralBatch,
  removeBatch as removeGeneralBatch,
  updateBatch as updateGeneralBatch,
  selectTotalQuantity as selectGeneralTotalQuantity,
} from "../store/generalDrugSlice";

import {
  selectPrivateDrugState,
  updatePrivateFormField,
  addPrivateBatch,
  removePrivateBatch,
  updatePrivateBatch,
  selectPrivateTotalQuantity,
} from "../store/privateDrugSlice";

export const useDrugForm = (isPrivate: boolean = false) => {
  const dispatch = useAppDispatch();

  const generalState = useAppSelector(selectGeneralDrugState);
  const privateState = useAppSelector(selectPrivateDrugState);

  const generalTotalQuantity = useAppSelector(selectGeneralTotalQuantity);
  const privateTotalQuantity = useAppSelector(selectPrivateTotalQuantity);

  const state = isPrivate ? privateState : generalState;
  const totalQuantity = isPrivate ? privateTotalQuantity : generalTotalQuantity;
  const batches = state.batches || [];

  const updateField = (field: string, value: any) => {
    if (isPrivate) {
      dispatch(updatePrivateFormField({ field: field as any, value }));
    } else {
      dispatch(updateGeneralField({ field: field as any, value }));
    }
  };

  const handleAddBatch = () => {
    if (isPrivate) {
      dispatch(addPrivateBatch());
    } else {
      dispatch(addGeneralBatch());
    }
  };

  const handleRemoveBatch = (index: number) => {
    if (isPrivate) {
      dispatch(removePrivateBatch(index));
    } else {
      dispatch(removeGeneralBatch(index));
    }
  };

  const handleUpdateBatch = (index: number, field: string, value: any) => {
    if (isPrivate) {
      dispatch(updatePrivateBatch({ index, field: field as any, value }));
    } else {
      dispatch(updateGeneralBatch({ index, field: field as any, value }));
    }
  };

  return {
    state,
    batches,
    totalQuantity,
    updateField,
    handleAddBatch,
    handleRemoveBatch,
    handleUpdateBatch,
  };
};