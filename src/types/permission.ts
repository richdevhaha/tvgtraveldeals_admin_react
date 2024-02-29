export enum ADMIN_ENDPOINT {
  DASHBOARD = "Dashboard",
  CURRENCIES = "Currencies",
  VISIT_DESTINATIONS = "Visit Destinations",
  ALL_TICKETS = "All Tickets",
  // FEATRUED_TICKETS = "Featured Tickets",
  // DESTINATION_TICKETS = "Destination Tickets",
  ADMIN_USERS = "Admin Users",
  // PERMISSIONS = "permissions",
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  slug: ADMIN_PANEL_PERMISSION_SLUG;
  group: string;
  editable: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Array<Permission>;
  editable: boolean;
}

export enum PERMISSION_TYPE {
  ADMIN = "admin",
  USER = "user",
}

export enum ADMIN_PANEL_GROUP {
  COMMON = "common",
  ANALYTICS = "analytics",
  OVERVIEW = "overview",
  CONTENTS = "contents",
  ADMIN = "admin",
}

export enum ADMIN_PANEL_PERMISSION_SLUG {
  // common
  DASHBOARD = "dashboard",
  // analytics
  TOP_CREATORS = "top_creators",
  CAMPAIGNS = "campaigns",
  KUCOIN = "kucoin",
  // overview
  USERS = "users",
  REPORTS = "reports",
  // content
  FEEDS = "feeds",
  CHANNELS = "channels",
  RADIO = "radio",
  TAGS = "tags",
  EPGS = "epgs",
  GIFTS = "gifts",
  NFT = "nft",
  ADVERTISEMENTS = "advertisements",
  MARTKETING_CAROUSEL = "marketing_carousels",
  CRYPTO_TOKENS = "crypto_tokens",
  BLOG = "blog",
  // admin
  CDN = "cdn",
  ADMIN_USER = "admin_user",
  API_KEY = "api_key",
  ROLE = "role",
  PERMISSION = "permission",
}
