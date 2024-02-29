import { Divider, Grid, Typography } from "@mui/material";

type Props = {
  isTop?: boolean;
  title: string;
};

export const TicketSectionGrid = ({ isTop = false, title }: Props) => (
  <Grid item xs={12} sx={{ mb: -1.5 }}>
    {!isTop && (
      <Divider light sx={{ mt: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 3 }, backgroundImage: "white !important" }} />
    )}
    <Typography sx={{ fontSize: 18, fontWeight: "bold", textUnderlineOffset: 3, textDecoration: "underline" }}>
      {title}
    </Typography>
  </Grid>
);
