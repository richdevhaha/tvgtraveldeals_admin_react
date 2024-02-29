import { createTheme } from "@mui/material";
// import { deepPurple, yellow } from "@mui/material/colors";

import { appColors, breakpoints, divider, globals, sidenav } from "./components";

export const lightTheme = createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...appColors },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    caption: {},
    // allVariants: { color: "white" },
  },
  components: {
    MuiCssBaseline: { ...globals },
    MuiDivider: { ...divider },
    MuiDrawer: { ...sidenav },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          minWidth: 30,
          // textTransform: "none",
          ...(ownerState.variant === "contained" && ownerState.color === "primary" && { color: "#fff" }),
          ...(ownerState.variant === "contained" && ownerState.color === "light" && { color: appColors.primary.main }),
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => theme.unstable_sx({ px: 1, py: 0.25, borderRadius: 3, borderWidth: 2 }),
        label: { padding: "initial" },
        icon: ({ theme }) => theme.unstable_sx({ mr: 0.5, ml: "-2px" }),
      },
    },
    MuiFab: {
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: { color: "#FFD838" },
      },
    },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       "& label": { color: "#ffffff" },
    //       "& label.Mui-focused": { color: "#ffffff" },
    //       "&:hover": { borderBottomColor: "#ffffff" },
    //       "& .MuiInput-underline": {
    //         "&:before": { borderBottomColor: "#ffffff" },
    //         "&:after": { borderBottomColor: "#ffffff" },
    //       },
    //       "& .MuiOutlinedInput-root": {
    //         "& fieldset": { borderColor: "#ffffff" },
    //         "&:hover fieldset": { borderColor: "#ffffff", borderWidth: "0.15rem" },
    //         "&.Mui-focused fieldset": { borderColor: "#ffffff" },
    //       },
    //       "& .MuiFilledInput-root": {
    //         borderBottomColor: "#ffffff",
    //         "&:before": { borderBottomColor: "#ffffff" },
    //         "&:after": { borderBottomColor: "#ffffff" },
    //         "&:hover input, & input:hover": { borderBottomColor: "#ffffff" },
    //       },
    //     },
    //   },
    // },
  },
});

declare module "@mui/material/Button" {
  export interface ButtonPropsColorOverrides {
    light: true;
  }
}

declare module "@mui/material/Radio" {
  export interface RadioPropsColorOverrides {
    light: true;
  }
}

declare module "@mui/material/Checkbox" {
  export interface CheckboxPropsColorOverrides {
    light: true;
  }
}

declare module "@mui/material/Fab" {
  export interface FabPropsColorOverrides {
    light: true;
  }
}
