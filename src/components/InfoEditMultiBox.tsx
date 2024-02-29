import React, { HTMLInputTypeAttribute } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { FlexCol, FlexRow } from "./Commons";
import { AppTextField } from "./CustomMUI";
import { TicketInfoTitle } from "./TicketInfoTitle";

type Props = {
  title: string;
  values: string[] | number[];
  isRequired?: boolean;
  lineCount?: number;
  minValue?: number;
  maxValue?: number;
  type?: HTMLInputTypeAttribute;
  onChange: (value: any, index: number) => void;
  onRemoveItem: (index: number) => void;
  onAddedItem: (index: number) => void;
};

export const InfoEditMultiBox = React.forwardRef(
  (
    {
      title,
      values = [],
      isRequired = false,
      lineCount = 1,
      minValue = 0,
      maxValue = 0,
      type = "text",
      onChange,
      onRemoveItem,
      onAddedItem,
    }: Props,
    ref
  ) => (
    <FlexCol ref={ref} sx={{ gap: 0.5 }}>
      <TicketInfoTitle title={`${title} ${isRequired ? " *" : ""}`} />
      <FlexCol sx={{ gap: 1 }}>
        {values.map((one, index) => (
          <FlexRow key={index} sx={{ gap: 1 }}>
            <AppTextField
              value={one}
              type={type}
              multiline={lineCount > 1}
              rows={lineCount}
              // maxRows={lineCount}
              required={isRequired}
              {...(type === "number" && maxValue && { InputProps: { inputProps: { min: minValue, max: maxValue } } })}
              onChange={(event: any) => onChange(event.target.value, index)}
            />
            <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => onRemoveItem(index)}
                disabled={values.length === 1}
              >
                <RemoveIcon sx={{ width: 20, height: 20 }} />
              </Button>
              <Button variant="contained" color="light" size="small" onClick={() => onAddedItem(index)}>
                <AddIcon sx={{ width: 20, height: 20 }} />
              </Button>
            </Box>
          </FlexRow>
        ))}
      </FlexCol>
    </FlexCol>
  )
);
