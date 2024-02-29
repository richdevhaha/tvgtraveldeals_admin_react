import { Outlet } from "react-router-dom";

import { FlexCol } from "../Commons";
import { AppConfig } from "../../config";
import { ScrollTop } from "../ScrollTop";

export const PublicLayout = () => (
  <FlexCol sx={{ height: "100vh" }} id="back-to-top-anchor">
    <FlexCol sx={{ mt: AppConfig.NAV_BAR_HEIGHT / 8, flex: 1 }}>
      <Outlet />
    </FlexCol>
    <ScrollTop />
  </FlexCol>
);
