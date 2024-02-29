import { Modal, ModalProps } from "@mui/material";

export const BaseModal = ({ children, sx, ...rest }: ModalProps) => (
  <Modal
    {...rest}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backdropFilter: "blur(7px)",
      ...sx,
    }}
  >
    {children}
  </Modal>
);
