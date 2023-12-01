import { Roles } from "./roles";

export interface NewUserDTO {
  name: string;
  login: string;
  password: string;
  contactInfo: string;
  role: Roles;
}
