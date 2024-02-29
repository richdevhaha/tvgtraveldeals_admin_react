import { TableRow } from "@mui/material";
import { AppTableCell } from "../CustomMUI";
import { TypographySkeleton } from "./TypographySkeleton";

export const CurrencyRowSkeleton = () => (
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
    <AppTableCell align="right" sx={{ display: "flex", justifyContent: "end" }}>
      <TypographySkeleton width={30} />
    </AppTableCell>
    <AppTableCell>
      <TypographySkeleton />
    </AppTableCell>
    <AppTableCell>
      <TypographySkeleton />
    </AppTableCell>
  </TableRow>
);
