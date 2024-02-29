import React from "react";
import { TableCell, TableCellProps, Typography } from "@mui/material";

type Props = {
  isTitle?: boolean;
  isFirstCell?: boolean;
  value?: string | number | React.ReactNode;
  lineCount?: number;
  isVerticalTop?: boolean;
} & TableCellProps;

export const AppTableCell = ({
  isTitle = false,
  isFirstCell = false,
  value,
  lineCount = 0,
  isVerticalTop = false,
  children,
  align,
  sx,
  ...rest
}: Props) => (
  <TableCell
    align={align}
    sx={{
      color: "white",
      p: 1,
      ...(isFirstCell && { pl: 2 }),
      ...(isVerticalTop && { verticalAlign: "top" }),
      ...sx,
    }}
    {...rest}
  >
    {value && (
      <Typography
        sx={{
          fontSize: { xs: 12, sm: 14 },
          ...(lineCount && {
            overflow: "hidden",
            // textOverflow: "ellipsis",

            WebkitLineClamp: lineCount,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            flex: 1,
          }),
          ...(isTitle && {
            textTransform: "uppercase",
            fontSize: 12,
            fontWeight: "bold",
          }),
        }}
      >
        {value}
      </Typography>
    )}
    {children}
  </TableCell>
);
