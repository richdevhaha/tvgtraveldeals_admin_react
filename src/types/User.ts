import { SocialType } from "./enums";
import { STATUS } from "./status.enum";

export interface User {
  _id: string;
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  providers: Array<SocialProvider>;
  username: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  password: string;
  phone: string;
  language: string;
  currency: string;
  country: string;
  status: STATUS;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialProvider {
  providerId: SocialType;
  rawId?: string;
  email?: string;
  displayName?: string;
  photoUrl?: string;
  nonce?: string;
}

export interface Country {
  _id: string;
  name: string;
  code: string;
  capital: string;
  region: string;
  currency: object;
  flag: string;
}
