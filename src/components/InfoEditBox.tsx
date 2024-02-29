import React, { HTMLInputTypeAttribute } from "react";
import { InputAdornment, TextFieldProps } from "@mui/material";

import { FlexCol } from "./Commons";
import { AppTextField } from "./CustomMUI";
import { TicketInfoTitle } from "./TicketInfoTitle";

type Props = {
  title: string;
  value?: string | number | null;
  isRequired?: boolean;
  disabled?: boolean;
  lineCount?: number;
  type?: HTMLInputTypeAttribute;
  prifix?: string;
  minValue?: number;
  maxValue?: number;
  isSelect?: boolean;
  selectItem?: React.ReactNode;
  onChange?: (value: any) => void;
} & TextFieldProps;

export const InfoEditBox = ({
  title,
  value = "",
  isRequired = false,
  disabled = false,
  lineCount = 1,
  minValue = 0,
  maxValue = 0,
  type = "text",
  prifix = "",
  isSelect = false,
  selectItem = undefined,
  onChange = undefined,
  ...rest
}: Props) => (
  <FlexCol sx={{ gap: 0.5 }}>
    <TicketInfoTitle title={`${title} ${isRequired ? " *" : ""}`} />
    {isSelect && selectItem ? (
      selectItem
    ) : (
      <AppTextField
        value={value}
        type={type}
        multiline={lineCount > 1}
        rows={lineCount}
        required={isRequired}
        disabled={disabled}
        {...(prifix && {
          InputProps: {
            startAdornment: (
              <InputAdornment position="start" sx={{ ".MuiTypography-root": { color: "white" } }}>
                {prifix}
              </InputAdornment>
            ),
          },
        })}
        {...(type === "number" && maxValue && { InputProps: { inputProps: { min: minValue, max: maxValue } } })}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange && onChange(event.target.value);
        }}
        {...rest}
      />
    )}
  </FlexCol>
);
