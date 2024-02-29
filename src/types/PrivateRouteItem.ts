import React from "react";

export type PrivateRouteItem = {
  type: string;
  name: string;
  key: string;
  route: string;
  // icon: HTMLElement;
  // icon: React.ReactNode;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  component: any;
  noCollapse: boolean;
};
