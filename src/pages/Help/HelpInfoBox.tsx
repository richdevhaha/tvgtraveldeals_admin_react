import React from "react";
import { Typography } from "@mui/material";
import { FlexCol } from "../../components";

type Props = {
  title: string;
  content: string;
  lineCount?: number;
};

export const HelpInfoBox = ({ title, content, lineCount = 1, ...rest }: Props) => (
  <FlexCol sx={{ gap: 0 }} {...rest}>
    <Typography variant="caption" color="black" sx={{ fontSize: 12, textDecoration: "underline" }}>
      {title}
    </Typography>
    <Typography color="white" sx={{ fontSize: 15 }}>
      {content}
    </Typography>
  </FlexCol>
);
