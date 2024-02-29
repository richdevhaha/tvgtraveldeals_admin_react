import { STATUS } from "./status.enum";

export type Currency = {
  id: string;
  name: string;
  symbol: string;
  country: string;
  rate: number;
  status: STATUS;
  createdAt?: Date;
  updatedAt?: Date;
};

export const initCurrencyValue = { id: "new", name: "", symbol: "", country: "", rate: 0, status: STATUS.ACTIVE };
