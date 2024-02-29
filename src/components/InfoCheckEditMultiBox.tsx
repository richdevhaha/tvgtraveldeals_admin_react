import { HTMLInputTypeAttribute } from "react";
import { Box, Button, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { FlexCol, FlexRow } from "./Commons";
import { AppTextField } from "./CustomMUI";
import { TicketInfoTitle } from "./TicketInfoTitle";
import { IncludeItem } from "../types";

type Props = {
  title: string;
  values: IncludeItem[];
  isRequired?: boolean;
  lineCount?: number;
  type?: HTMLInputTypeAttribute;
  onChangeCheck: (value: boolean, index: number) => void;
  onChangeText: (value: string, index: number) => void;
  onRemoveItem: (index: number) => void;
  onAddedItem: (index: number) => void;
};

export const InfoCheckEditMultiBox = ({
  title,
  values = [],
  isRequired = false,
  lineCount = 1,
  type = "text",
  onChangeCheck,
  onChangeText,
  onRemoveItem,
  onAddedItem,
}: Props) => (
  <FlexCol sx={{ gap: 0.5 }}>
    <TicketInfoTitle title={`${title} ${isRequired ? " *" : ""}`} />
    <FlexCol sx={{ gap: 1 }}>
      {values.map((one, index) => (
        <FlexRow key={index} sx={{ gap: 1 }}>
          <FlexCol>
            <Checkbox
              checked={one.isActive}
              color="light"
              sx={{ p: 0 }}
              onChange={(e) => onChangeCheck(e.target.checked, index)}
            />
          </FlexCol>
          <AppTextField
            value={one.content}
            type={type}
            multiline={lineCount > 1}
            rows={lineCount}
            // maxRows={lineCount}
            required={isRequired}
            onChange={(event: any) => onChangeText(event.target.value, index)}
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
);
