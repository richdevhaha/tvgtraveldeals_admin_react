import { TextField, TextFieldProps } from "@mui/material";

type Props = {
  fontSize?: number;
} & TextFieldProps;

export const AppTextFieldSX = (fontSize: number = 14) => ({
  fontSize: fontSize,
  "& input": { color: "#ffffff", fontSize: fontSize },
  "& label": { color: "#ffffff" },
  "& label.Mui-focused": { color: "#ffffff" },
  "& .MuiInput-underline:before": {
    borderBottomColor: "rgba(255,255, 255, 0.4)",
  },

  "& .MuiInput-underline": {
    "&:before": { borderBottomColor: "#ffffff" },
    "&:after": { borderBottomColor: "#ffffff" },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#ffffff" },
    "&:hover fieldset": { borderColor: "#ffffff", borderWidth: "0.15rem" },
    "&.Mui-focused fieldset": { borderColor: "#ffffff" },
  },

  "& .MuiFilledInput-root, &.MuiInputBase-root": {
    borderBottomColor: "#ffffff",
    "&:before": { borderBottomColor: "#ffffff" },
    "&:after": { borderBottomColor: "#ffffff" },
    "&:hover input, & input:hover": { borderBottomColor: "#ffffff" },
  },

  '& input[type="time"]': {
    fontSize: fontSize,
    "::-webkit-calendar-picker-indicator": {
      pl: 0,
      filter: "invert(100%) sepia(100%) saturate(100%) hue-rotate(84deg) brightness(100%) contrast(100%)",
    },
    "&.MuiOutlinedInput-input": { pl: 1, pr: 0.5, py: 1 },
  },

  '& input[type="date"]': {
    fontSize: fontSize,
    "::-webkit-calendar-picker-indicator": {
      pl: 0,
      filter: "invert(100%) sepia(100%) saturate(100%) hue-rotate(84deg) brightness(100%) contrast(100%)",
    },
    "&.MuiOutlinedInput-input": { pl: 1, pr: 0.5, py: 1 },
  },

  ".MuiFormHelperText-root": {
    mx: 0.5,
    textTransform: "lowercase",
    ":first-letter": { textTransform: "uppercase" },
  },
  textarea: { color: "white", fontSize: fontSize },
});

export const AppTextField = (props: Props) => {
  const { size = "small", fontSize, label = "", variant = "outlined", fullWidth = true, sx, ...rest } = props;

  return (
    <TextField
      size={size}
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      required
      sx={{ ...AppTextFieldSX(), ...sx }}
      {...rest}
    />
  );
};
