import { useSelector } from "react-redux";
import { Avatar, Box, Button, Card, CardContent, CardProps, Link, Typography } from "@mui/material";

import { card, cardContent, cardIconBox, cardIcon } from "./styles/sidenavCard";
import { sideNavSelector } from "../../redux/ui/selector";
import { appColors, linearGradient } from "../../theme";
import { APP_LOGO, SITE } from "../../config";

type Props = {
  color?: string;
} & CardProps;

export const SidenavCard = ({ color, sx, ...rest }: Props) => {
  const { miniSidenav } = useSelector(sideNavSelector);

  return (
    <Card sx={(theme) => ({ ...card(theme, { miniSidenav }) })} {...rest}>
      <CardContent sx={(theme) => cardContent(theme)}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}>
          <Box width="2rem" height="2rem" borderRadius="md" mb={2} sx={cardIconBox}>
            <Avatar
              src={APP_LOGO.Green1024}
              sx={(theme) => ({ width: "100%", height: "100%", ...cardIcon(theme, { color }) })}
              variant="rounded"
            />
          </Box>
          <Box>
            <Typography variant="h6" color="white" fontWeight="bold">
              Would you like
            </Typography>
            <Box mb={1.825} mt={-0.8}>
              <Typography variant="body2" color="white" fontWeight="bold">
                to visit a live webiste?
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          component={Link}
          href={SITE.WEB}
          target="_blank"
          rel="noreferrer"
          size="small"
          sx={{
            color: "white !important",
            background: linearGradient(appColors.primary.main, "blue", 0),
            "&:hover": {
              background: linearGradient(appColors.primary.main, "blue", 180),
            },
          }}
          fullWidth
        >
          Go LIVE Site
        </Button>
      </CardContent>
    </Card>
  );
};
