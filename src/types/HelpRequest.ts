import { User } from "./User";
import { STATUS } from "./status.enum";

export interface HelpRequest {
  _id: string;
  id: string;
  question: string;
  email: string;
  fullName: string;
  user?: User;
  bookingId?: string;
  activityDate?: string;
  subject?: string;
  content?: string;
  changeType?: string;
  changeReason?: string;
  existingActivity?: string;
  existingHelp?: string;
  makingEnquiry?: string;
  websiteUrl?: string;
  attatchments?: string[];
  solveMessage?: string;
  status: STATUS;
}
