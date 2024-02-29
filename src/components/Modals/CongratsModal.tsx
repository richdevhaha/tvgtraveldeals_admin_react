import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ModalProps, Typography, Paper, IconButton, Box, SxProps } from "@mui/material";

import { BaseModal } from "./BaseModal";
import { FlexCol, FlexRow } from "../Commons";
import { appColors } from "../../theme";

interface Props extends Partial<ModalProps> {
  containerStyle?: SxProps;
  title: string;
  description: string;
  confirmTitle?: string;
  cancelTitle?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

export const CongratsModal = ({
  containerStyle,
  title = "Congrats!!!",
  description,
  confirmTitle = "Yes",
  cancelTitle = "Cancel",
  children,
  onConfirm = () => {},
  onClose = () => {},
  ...rest
}: Props) => (
  <BaseModal {...rest} open={!!rest.open} onClose={onClose}>
    <Box
      component={Paper}
      sx={{
        px: 4,
        py: 2,
        borderRadius: 2,
        position: "relative",
        flexDirection: "column",
        maxWidth: 420,
        bgcolor: appColors.primary.main,
        ...containerStyle,
      }}
    >
      <IconButton sx={{ position: "absolute", top: 10, right: 10 }} onClick={onClose}>
        <CloseRoundedIcon />
      </IconButton>
      <FlexCol>
        <Typography variant="subtitle1" fontWeight="600">
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ py: 2 }}>
          {description}
        </Typography>
      </FlexCol>
      {!!children && <FlexCol sx={{ my: 2 }}>{children}</FlexCol>}
      <FlexRow sx={{ justifyContent: "flex-end", mt: 2 }}>
        <Typography color="primary.contrastText" onClick={onConfirm}>
          OK !!!
        </Typography>
      </FlexRow>
    </Box>
  </BaseModal>
);
