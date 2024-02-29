import { TableRow } from "@mui/material";
import { AppTableCell } from "../CustomMUI";
import { TypographySkeleton } from "./TypographySkeleton";

export const DestinationRowSkeleton = () => (
  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <AppTableCell scope="row">
      <TypographySkeleton width={80} />
    </AppTableCell>
    <AppTableCell>
      <TypographySkeleton />
    </AppTableCell>
    <AppTableCell>
      <TypographySkeleton />
    </AppTableCell>
    <AppTableCell>
      <TypographySkeleton />
    </AppTableCell>
    <AppTableCell>
      <TypographySkeleton />
    </AppTableCell>
    <AppTableCell>
      <TypographySkeleton />
    </AppTableCell>
  </TableRow>
);
