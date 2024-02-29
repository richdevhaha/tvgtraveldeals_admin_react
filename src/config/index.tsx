import Logo from "../assets/logo/logo.svg";
import LogoGreen from "../assets/logo/logoGreen.png";
import LogoGreen1024 from "../assets/logo/logoGreen1024.png";
import LogoGreen500 from "../assets/logo/logoGreenTransparent500.png";
import LogoWhite from "../assets/logo/logoWhite.png";
import LogoWhite1024 from "../assets/logo/logoWhite1024.png";
import LogoWhite500 from "../assets/logo/logoWhiteTransparent500.png";
import LogoDark from "../assets/logo/logo_dark.png";
import LogoDark1024 from "../assets/logo/logo_dark1024.png";

import bgSignIn1 from "../assets/pngs/signInImage.png";
import bgSignIn2 from "../assets/jpgs/auth-background.jpg";

export * from "./constants";
export * from "./storage";
export * from "./temp";

export const AppConfig = {
  APP_NAME: "TVG Travel Deals",
  APP_NAME_SHORT: "TVG Admin",
  COMPANY_NAME: "TVG Travel and Tourism LLC",
  SIDEBAR_WIDTH: 270,
  NAV_BAR_HEIGHT: 80,
};

export const APP_LOGO = {
  LogoSvg: Logo,
  Dark1024: LogoDark1024,
  Dark1800: LogoDark,

  Green500: LogoGreen500,
  Green1024: LogoGreen1024,
  Green1800: LogoGreen,

  White500: LogoWhite500,
  White1024: LogoWhite1024,
  White1800: LogoWhite,
};

export const APP_IMAGES = {
  bgSignIn1,
  bgSignIn2,
};
