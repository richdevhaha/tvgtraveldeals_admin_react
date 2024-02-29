import React from "react";
import { useSelector } from "react-redux";
import { Box, Collapse, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import { collapseItem, collapseIconBox, collapseText } from "./styles";
import { sideNavSelector } from "../../redux/ui/selector";
import { SideNavColor } from "../../types";
import { appColors } from "../../theme";

type Props = {
  color: SideNavColor;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  name: string;
  children?: React.ReactNode;
  active?: boolean;
  open?: boolean;
  // noCollapse?: boolean;
};

export const SidenavCollapse = (props: Props) => {
  const { color = "info", Icon, name, children, active = false, open = false, ...rest } = props;
  const { miniSidenav, transparentSidenav } = useSelector(sideNavSelector);

  return (
    <>
      <ListItem component="li" sx={{ py: { xs: 0.2, sm: 0 } }}>
        <Box {...rest} sx={(theme) => collapseItem(theme, { active, transparentSidenav })}>
          <ListItemIcon sx={(theme) => collapseIconBox(theme, { active, transparentSidenav, color })}>
            <Icon style={{ color: active ? "white" : "primary", width: 18, height: 18 }} />
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                transparentSidenav,
                active,
                color: active ? appColors.primary.main : "white",
              })
            }
          />
        </Box>
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
};
