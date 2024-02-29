import { STATUS } from "./status.enum";

export type InfoChangeType = "change" | "remove" | "add";

export type IncludeItem = {
  isActive: boolean;
  content: string;
};

export enum BOOKING_TYPE {
  AFFILATE_LINK = "affiliate_link",
  DIRECTLY = "directly",
}

export enum QR_GENERATION_TYPE {
  SELF_GENERATION = "self_generation",
  UPLOADING_QR_CODE = "uploading_qr_codes",
}

export interface OpenHourItem {
  day: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface LocationItem {
  address: string;
  link: string;
}

export interface Ticket {
  id: string;
  title: string;
  uri: string;
  images: string[];
  price: number;
  childPrice: number;
  seniorPrice: number;
  infantPrice: number;
  currency: any;
  description: string;
  bookingType: BOOKING_TYPE;
  affiliateLink: string;
  isFeatured: boolean;
  isLikelySell: boolean;
  destination: any;
  reviewMark: number;
  reviewCount: number;
  reviewID: string;
  overview: string;
  highlights: string[];
  instructions: string[];
  openingHours: OpenHourItem[];
  includes: IncludeItem[];
  location: LocationItem;
  videoUrl: string;
  isShowHome: boolean;
  status: STATUS;
  qrCodeGenerationType: string;
}

export const initOpeningHours: OpenHourItem[] = [
  { day: 0, isActive: false, startTime: "08:00", endTime: "19:00" },
  { day: 1, isActive: true, startTime: "08:00", endTime: "19:00" },
  { day: 2, isActive: true, startTime: "08:00", endTime: "19:00" },
  { day: 3, isActive: true, startTime: "08:00", endTime: "19:00" },
  { day: 4, isActive: true, startTime: "08:00", endTime: "19:00" },
  { day: 5, isActive: true, startTime: "08:00", endTime: "19:00" },
  { day: 6, isActive: true, startTime: "08:00", endTime: "19:00" },
];

export const initInclude: IncludeItem = { isActive: true, content: "" };

export const initLocation: LocationItem = { address: "", link: "" };

export const initTicket = {
  id: "new",
  title: "",
  images: [],
  price: 0,
  childPrice: 0,
  seniorPrice: 0,
  infantPrice: 0,
  currency: "",
  description: "",
  bookingType: BOOKING_TYPE.AFFILATE_LINK,
  affiliateLink: "",
  isFeatured: false,
  isLikelySell: false,
  destination: "",
  reviewMark: 5,
  reviewCount: 0,
  reviewID: "",
  overview: "",
  highlights: [""],
  instructions: [""],
  openingHours: initOpeningHours,
  includes: [initInclude],
  location: { address: "", link: "" },
  videoUrl: "",
  isShowHome: true,
  status: STATUS.ACTIVE,
  qrCodeGenerationType: QR_GENERATION_TYPE.SELF_GENERATION
};
