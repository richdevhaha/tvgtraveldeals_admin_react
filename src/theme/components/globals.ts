import bgAdmin from "../../assets/jpgs/body-background.jpg";
// import { appColors } from "../appColors";

export const globals = {
  styleOverrides: {
    html: {
      scrollBehavior: "smooth",
      // background: appColors.dark.main,
    },
    body: {
      background: `url(${bgAdmin})`,
      backgroundSize: "cover",
    },
    "*, *::before, *::after": {
      margin: 0,
      padding: 0,
    },
    "a, a:link, a:visited": {
      textDecoration: "none !important",
    },
    "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
      // color: `${dark.main} !important`,
      transition: "color 150ms ease-in !important",
    },
    // "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    //   color: `${info.main} !important`,
    // },
    ".MuiFormHelperText-root": {
      mx: 0.5,
      textTransform: "lowercase",
      ":first-letter": { textTransform: "uppercase" },
    },
  },
};
