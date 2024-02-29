import React from "react";
import { Select, SelectChangeEvent, SelectProps } from "@mui/material";

type Props = {
  onChange: (event: SelectChangeEvent) => void;
} & SelectProps;

export const AppSelect = React.forwardRef((props: Props, ref) => {
  const { onChange, children, size = "small", label = "", variant = "outlined", fullWidth = true, sx, ...rest } = props;

  return (
    <Select
      ref={ref}
      size={size}
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      onChange={onChange}
      sx={{
        color: "#ffffff",
        "&.MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#ffffff" },
          "&:hover fieldset": { borderColor: "#ffffff" },
          "&.Mui-focused fieldset": { borderColor: "#ffffff" },
        },
        "&.MuiFilledInput-root, &.MuiInputBase-root": {
          borderBottomColor: "#ffffff !important",
          "&:before": { borderBottomColor: "#ffffff" },
          "&:after": { borderBottomColor: "#ffffff" },
        },
        ".MuiSvgIcon-root ": {
          fill: "white !important",
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Select>
  );
});
