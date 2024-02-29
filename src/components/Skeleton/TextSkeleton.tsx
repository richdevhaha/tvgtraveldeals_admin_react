import { Skeleton, SkeletonProps } from "@mui/material";

type Props = {
  visible: boolean;
} & SkeletonProps;

export const TextSkeleton = ({ visible, sx }: Props) => {
  if (visible) return <Skeleton variant="text" animation="wave" sx={{ height: 35, width: 50, ...sx }} />;
  return null;
};
