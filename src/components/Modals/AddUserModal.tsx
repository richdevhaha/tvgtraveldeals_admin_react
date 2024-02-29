import { Button, Modal, ModalProps, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { FlexCol, FlexRow } from "../Commons";
import { appColors, rgba } from "../../theme";

interface Props extends Partial<ModalProps> {
  open: boolean;
  onClose?: () => void;
  data?: any;
}

export const AddUserModal = (props: Props) => (
  <Modal
    {...props}
    sx={{ display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(7px)" }}
  >
    <FlexCol
      sx={{
        px: 4.5,
        pt: 3,
        pb: 7,
        width: "400px",
        maxWidth: "90%",
        borderRadius: 2,
        background: rgba(appColors.primary.main, 0.8),
        position: "relative",
      }}
      onClick={props.onClose}
    >
      <CloseIcon sx={{ cursor: "pointer", position: "absolute", right: 25, top: 20 }} onClick={props.onClose} />
      <Typography sx={{ color: "#ffffff", fontWeight: 500, fontSize: 16, lineHeight: "24px" }}>Assign Role</Typography>
      <FlexRow sx={{ mt: 5, alignItems: "center" }}>
        <TextField
          name="username"
          placeholder="Enter username"
          inputProps={{
            style: {
              backgroundColor: "#fff",
              border: "0.5px solid rgba(255, 255, 255, 0.15)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "21px",
              height: "20px",
              padding: "7px",
              paddingLeft: "13px",
              paddingRight: "40px",
              borderRadius: "6px",
            },
          }}
        />
        <Button variant="contained" sx={{ textTransform: "none", height: 34, borderRadius: 29 / 2, px: 3, ml: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 14, lineHeight: "18.55px" }}>
            Confirm
          </Typography>
        </Button>
      </FlexRow>
    </FlexCol>
  </Modal>
);
