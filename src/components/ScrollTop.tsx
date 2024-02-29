import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { uiSelector } from "../redux/ui/selector";
import { appColors } from "../theme";

export const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const canControlScrollRestoration = "scrollRestoration" in window.history;
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  const { isShowBottomNav } = useSelector(uiSelector);

  const trigger = useScrollTrigger({
    target: window || undefined,
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: isShowBottomNav ? 110 : 16, right: 16 }}
      >
        <Fab size="small" aria-label="scroll back to top" color="light">
          <KeyboardArrowUpIcon sx={{ color: appColors.primary.main }} />
        </Fab>
      </Box>
    </Fade>
  );
};
