import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ModalProps, Typography, Paper, IconButton, Box, SxProps, Button } from "@mui/material";

import { BaseModal } from "./BaseModal";
import { FlexCol, FlexRow } from "../Commons";
import { appColors } from "../../theme";

interface Props extends Partial<ModalProps> {
  containerStyle?: SxProps;
  title: string;
  description: string | React.ReactNode;
  confirmTitle?: string;
  cancelTitle?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

export const ConfirmModal = ({
  containerStyle,
  title = "Confirm",
  description,
  confirmTitle = "Yes",
  cancelTitle = "Cancel",
  children,
  onConfirm = () => {},
  onClose = () => {},
  ...rest
}: Props) => (
  <BaseModal
    {...rest}
    open={!!rest.open}
    onClose={onClose}
    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
  >
    <Box
      component={Paper}
      sx={{
        px: { xs: 2, sm: 4 },
        py: 2,
        borderRadius: 2,
        position: "relative",
        flexDirection: "column",
        maxWidth: { xs: 350, sm: 420, md: 550 },
        bgcolor: appColors.primary.main,
        ...containerStyle,
      }}
    >
      <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={onClose}>
        <CloseRoundedIcon sx={{ color: "white" }} />
      </IconButton>
      <FlexCol>
        <Typography variant="subtitle1" fontWeight="600" color="white">
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ py: 2 }} color="white">
          {description}
        </Typography>
      </FlexCol>
      {!!children && <FlexCol sx={{ my: 2 }}>{children}</FlexCol>}
      <FlexRow sx={{ justifyContent: "flex-end", mt: 2, mr: -1 }}>
        <Button
          variant="outlined"
          sx={{ mr: 1, borderColor: "white", ":hover": { borderColor: "#ffffff80" } }}
          onClick={onClose}
        >
          <Typography color="white" fontSize={12}>
            {cancelTitle}
          </Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{ borderColor: "white", ":hover": { borderColor: "#ffffff80" } }}
          onClick={onConfirm}
        >
          <Typography color="white" fontSize={12}>
            {confirmTitle}
          </Typography>
        </Button>
      </FlexRow>
    </Box>
  </BaseModal>
);
