import React, { HTMLInputTypeAttribute } from "react";
import { InputAdornment, TextFieldProps } from "@mui/material";

import { FlexCol } from "./Commons";
import { AppTextField } from "./CustomMUI";
import { TicketInfoTitle } from "./TicketInfoTitle";
import { autoFillTextFieldSxProps } from "./TextFieldStyle";

type EditProps = {
  title: string;
  isRequired?: boolean;
  disabled?: boolean;
  lineCount?: number;
  type?: HTMLInputTypeAttribute;
  prifix?: string;
  minValue?: number;
  maxValue?: number;
  isSelect?: boolean;
  selectItem?: React.ReactNode;
} & TextFieldProps;

export const InfoEditBoxWithRef = React.forwardRef((props: EditProps, ref) => {
  const {
    title,
    isRequired = false,
    disabled = false,
    lineCount = 1,
    minValue = 0,
    maxValue = 0,
    type = "text",
    prifix = "",
    isSelect = false,
    selectItem = undefined,
    ...rest
  } = props;
  return (
    <FlexCol sx={{ gap: 0.5 }} ref={ref}>
      <TicketInfoTitle title={`${title} ${isRequired ? " *" : ""}`} />
      {isSelect && selectItem ? (
        selectItem
      ) : (
        <AppTextField
          type={type}
          multiline={lineCount > 1}
          rows={lineCount}
          required={isRequired}
          disabled={disabled}
          autoComplete="off"
          sx={{ ...autoFillTextFieldSxProps }}
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
          {...(type === "number" && { inputProps: { step: "any" } })}
          {...rest}
        />
      )}
    </FlexCol>
  );
});
