export type PrivateRouteItem = {
  // icon?: React.ReactNode;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  name: string;
  children?: React.ReactNode;
  active?: boolean;
  noCollapse?: boolean;
  open?: boolean;
};
