import { Card, CardProps } from "@mui/material";
import { appColors, rgba } from "../../theme";

export const AppCard = ({ children, sx, ...rest }: CardProps) => (
  <Card
    sx={{
      backdropFilter: "blur(2px)",
      p: { xs: 1, sm: 3 },
      bgcolor: rgba(appColors.primary.main, 0.9),
      "& ::-webkit-scrollbar-track": { background: "#fffff045" },
      "& ::-webkit-scrollbar-thumb": { background: "#ffffffb0" },
      "& ::-webkit-scrollbar-thumb:hover": { background: "#ffffff" },
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Card>
);
