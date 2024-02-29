import { User } from "./User";
import { STATUS } from "./status.enum";

export interface Booking {
  _id: string;
  id: string;
  ticketId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  adultCount: number;
  adultPrice: number;
  childCount: number;
  childPrice: number;
  seniorCount: number;
  seniorPrice: number;
  infantCount: number;
  infantPrice: number;
  bookingDate: string;
  ticketTitle: string;
}
