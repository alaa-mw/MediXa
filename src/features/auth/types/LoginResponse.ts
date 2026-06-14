import type { Role } from "../../../app/routes/roles";
import type { Pharmacy } from "./Pharmacy";
import type { User } from "./user";

export interface LoginResponse {
  message: string;
  accountType: Role;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user?: User;
  pharmacy?: Pharmacy;
}
