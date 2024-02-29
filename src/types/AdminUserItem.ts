import { STATUS } from "./status.enum";

export type AdminUserItem = {
  id: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  permissions?: string[];
  status: STATUS;
  createdAt?: Date;
  updatedAt?: Date;
};
