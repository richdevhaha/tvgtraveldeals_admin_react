import { STATUS } from "./status.enum";
import { StringUtil } from "../utils";

export type InfoChangeType = "change" | "remove" | "add";

export type IncludeItem = {
  isActive: boolean;
  content: string;
};

export enum BOOKING_TYPE {
  AFFILATE_LINK = "affiliate_link",
  DIRECTLY = "directly",
  MANUAL_CONFIRM = "manual_confirm"
}

export enum QR_GENERATION_TYPE {
  SELF_GENERATION = "self_generation",
  UPLOADING_QR_CODES = "uploading_qr_codes",
  UPLOADING_BAR_CODES = "uploading_bar_codes",
}

export interface OpenHourItem {
  day: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export enum EXPIRE_TYPE {
  ONE_TIME = "one_time",
  MULTI_USE = "multi_use",
}

export enum DISCOUNT_TYPE {
  PERCENT = "percent",
  FIXED_AMOUNT = "fixed_amount",
}

// export interface PricingTierItem {
//   day: number;
//   rate: number;
// }

export interface ClosingDate {
  startDate: "",
  endDate: ""
}

export interface CouponItem {
  isActive: boolean,
  discountType: DISCOUNT_TYPE,
  expireType: EXPIRE_TYPE
  value: string,
  code: string,
  startDate: string,
  endDate: string,
  [key: string]: any 
}

// export interface BarcodeItem {
//   activeDate: string,
//   [key: string]: any 
// }

export interface Discount {
  isActive: boolean,
  value: string,
  startDate: string,
  endDate: string,
  [key: string]: any
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
  isWeekendPrice: boolean;
  weekendPrice: number;
  weekendChildPrice: number;
  weekendSeniorPrice: number;
  weekendInfantPrice: number;
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
  // pricingTiers: PricingTierItem[];
  closingDate: ClosingDate[];
  coupon: CouponItem[];
  barcodes: Barcode[];
  discount: Discount;
  timeSlots: string[];
  includes: IncludeItem[];
  location: LocationItem;
  videoUrl: string;
  isShowHome: boolean;
  isTopActivity: boolean;
  isTopCategory: boolean;
  status: STATUS;
  qrCodeGenerationType: string;
  qrCodes: QrCode[];
}

export interface QrCode {
  barcodes: string;
  type: string;
  date: string;
  isUsed: boolean;
  usedEmail: string;
  questFirstName: string;
  questLastName: string;
}

export interface Barcode {
  barcodes: string;
  type: string;
  date: Date;
  isUsed: boolean;
  usedEmail: string;
  questFirstName: string;
  questLastName: string;
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

// export const initPricingTiers: PricingTierItem[] = [
//   { day: 0, rate: 1 },
//   { day: 1, rate: 1 },
//   { day: 2, rate: 1 },
//   { day: 3, rate: 1 },
//   { day: 4, rate: 1 },
//   { day: 5, rate: 1 },
//   { day: 6, rate: 1 },
// ];

export const initInclude: IncludeItem = { isActive: true, content: "" };

export const initLocation: LocationItem = { address: "", link: "" };

export const initCoupon: CouponItem = { isActive: false, discountType: DISCOUNT_TYPE.PERCENT, expireType: EXPIRE_TYPE.ONE_TIME, value: '0',  code: StringUtil.generateRandomCode(), startDate: "", endDate: "" };

export const initDiscount: Discount = { isActive: false, value: '0', startDate: "", endDate: "" };

export const initTicket = {
  id: "new",
  title: "",
  images: [],
  price: 0,
  childPrice: 0,
  seniorPrice: 0,
  infantPrice: 0,
  isWeekendPrice: false,
  weekendPrice: 0,
  weekendChildPrice: 0,
  weekendSeniorPrice: 0,
  weekendInfantPrice: 0,
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
  // pricingTiers: initPricingTiers,
  closingDate: [{ startDate: "", endDate: "" }],
  coupon: initCoupon,
  discount: initDiscount,
  timeSlots: [""],
  includes: [initInclude],
  location: { address: "", link: "" },
  videoUrl: "",
  isShowHome: true,
  isTopActivity: false,
  isTopCategory: false,
  status: STATUS.ACTIVE,
  qrCodeGenerationType: QR_GENERATION_TYPE.SELF_GENERATION,
  qrCodes: [],
  barcodes: [],
};
