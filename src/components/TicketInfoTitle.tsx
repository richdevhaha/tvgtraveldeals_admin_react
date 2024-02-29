import { Typography, TypographyProps } from "@mui/material";

type Props = {
  title: string;
} & TypographyProps;

export const TicketInfoTitle = (props: Props) => {
  const { title, sx, ...rest } = props;
  return (
    <Typography variant="caption" color="white" sx={{ fontSize: 13, ...sx }} {...rest}>
      {title}
    </Typography>
  );
};
