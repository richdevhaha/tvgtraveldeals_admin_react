import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Container, Grid, Theme, useMediaQuery } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { AppCard, AppPageTitle, FlexCol, InfoEditBox, LoadingView } from "../../components";
import { authSelector } from "../../redux/auth/selector";
import { changePasswordAction } from "../../redux/auth/actions";

export const MyAccount = () => {
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { user, isLoading, isSucceeded, error } = useSelector(authSelector);
  const changePassword = useCallback((data: any) => dispatch(changePasswordAction(data)), [dispatch]);

  const [curPwd, setCurPwd] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPwd, setConfPwd] = useState("");
  const [errCurPwd, setErrCurPwd] = useState("");
  const [errNewPwd, setErrNewPwd] = useState("");
  const [errConfPwd, setErrConfPwd] = useState("");

  useEffect(() => {
    curPwd && errCurPwd && setErrCurPwd("");
  }, [curPwd]);

  useEffect(() => {
    newPassword && errNewPwd && setErrNewPwd("");
  }, [newPassword]);

  useEffect(() => {
    confPwd && errConfPwd && setErrConfPwd("");
  }, [confPwd]);

  const saveTicket = () => {
    let isValid = true;
    if (curPwd.length === 0) {
      setErrCurPwd("Current password should not be empty");
      isValid = false;
    } else {
      setErrCurPwd("");
    }
    if (newPassword.length === 0) {
      setErrNewPwd("New password should not be empty");
      isValid = false;
    } else if (newPassword.length < 5) {
      setErrNewPwd("New password should be 5 characters at least");
      isValid = false;
    } else {
      setErrNewPwd("");
    }

    if (confPwd.length === 0) {
      setErrConfPwd("Confirm password should not be empty");
      isValid = false;
    } else if (confPwd !== newPassword) {
      setErrConfPwd("Confirm password should be match with New password");
      isValid = false;
    } else {
      setErrConfPwd("");
    }

    if (isValid) changePassword({ password: curPwd, newPassword });
  };

  return (
    <FlexCol sx={{ gap: 2 }}>
      <LoadingView visible={isLoading} message="Updating current password..." />
      <AppPageTitle title="Account Setting" />

      <Container disableGutters maxWidth="lg" sx={{ justifyContent: "flex-start", mx: 0 }}>
        <AppCard component="form" sx={{ p: 3, py: 2 }}>
          <Grid container spacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <InfoEditBox title="Name" value={user?.fullName} disabled />
            </Grid>
            <Grid item xs={12}>
              <InfoEditBox
                isRequired
                title="Current Password"
                type="password"
                value={curPwd}
                onChange={(val) => setCurPwd(val)}
                error={!!errCurPwd}
                helperText={errCurPwd}
              />
            </Grid>
            <Grid item xs={12}>
              <InfoEditBox
                isRequired
                title="New Password"
                type="password"
                value={newPassword}
                onChange={(val) => setNewPassword(val)}
                error={!!errNewPwd}
                helperText={errNewPwd}
              />
            </Grid>
            <Grid item xs={12}>
              <InfoEditBox
                isRequired
                title="Confirm Password"
                value={confPwd}
                type="password"
                onChange={(val) => setConfPwd(val)}
                error={!!errConfPwd}
                helperText={errConfPwd}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: { xs: 4, sm: 5 }, mb: { xs: 1, sm: 2 }, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="light"
              size={isSmallScreen ? "small" : "medium"}
              onClick={saveTicket}
              endIcon={<SaveIcon sx={{ width: 23, height: 23 }} />}
            >
              Update Password
            </Button>
          </Box>
        </AppCard>
      </Container>
    </FlexCol>
  );
};
