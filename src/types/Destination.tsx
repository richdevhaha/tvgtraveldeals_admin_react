import { STATUS } from "./status.enum";

export type Destination = {
  id: string;
  name: string;
  logo: string;
  order: number;
  status: STATUS;
  isShowHome: boolean;
};

export const initDestinationValue = {
  id: "new",
  name: "",
  logo: "",
  order: 0,
  status: STATUS.ACTIVE,
  isShowHome: true,
};
