import { Roles } from "./roles";

export interface UserDTO {
  id?: number;
  name?: string;
  login?: string;
  contactInfo?: string;
  role?: Roles;
}
