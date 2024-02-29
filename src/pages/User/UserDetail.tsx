import { useCallback, useEffect, useState } from "react";
import Carousel, { Modal as ImagesModal, ModalGateway } from "react-images";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

import { AppCard, AppPageTitle, FlexCol, FlexRow, InfoItemBox, LoadingView } from "../../components";
import { STATUS } from "../../types";
import { MomentUtil } from "../../utils";
import { userSelector } from "../../redux/user/selector";
import { changeUserStatusAction, deleteUserAction, fetchOneUserAction } from "../../redux/user/actions";

export const UserDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const idVal = new URLSearchParams(location.search).get("id");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { oneUser, isLoading: uLoading, isSucceeded, error } = useSelector(userSelector);

  const fetchOneData = useCallback((id: string) => dispatch(fetchOneUserAction(id)), [dispatch]);
  const updateItem = useCallback((data: any) => dispatch(changeUserStatusAction(data)), [dispatch]);
  const deleteItem = useCallback((id: string) => dispatch(deleteUserAction(id)), [dispatch]);

  useEffect(() => {
    idVal && fetchOneData(idVal);
  }, [idVal]);

  useEffect(() => console.log("oneUser===>", oneUser), [oneUser]);

  if (!oneUser && uLoading) return <LoadingView visible />;

  if (!oneUser && !uLoading) {
    return (
      <AppCard sx={{ p: 2, px: { xs: 2, sm: 3 } }}>
        <Typography sx={{ fontSize: 18, textAlign: "center", color: "white" }}>User not found </Typography>
      </AppCard>
    );
  }

  const updateUserStatus = (status: STATUS) => {
    updateItem({ id: idVal, status: status });
  };

  const statusColor = (status: STATUS) => {
    if (status == STATUS.ACTIVE) return "blue";
    else if (status == STATUS.INACTIVE) return "yellow";
    else if (status == STATUS.DELETED) return "row";
  };

  return (
    <FlexCol sx={{ gap: 2 }}>
      <LoadingView visible={uLoading} />
      {selectedImage && (
        <ModalGateway>
          <ImagesModal onClose={() => setSelectedImage(null)}>
            <Carousel
              currentIndex={0}
              styles={{
                headerFullscreen: (base, state) => ({ display: "none" }),
                view: (base, state) => ({
                  ...base,
                  ...state,
                  maxHeight: "95vh",
                  "&>img": { width: "100%", height: "100%", objectFit: "contain" },
                }),
              }}
              views={[
                {
                  source: selectedImage,
                  caption: `Use photo - ${oneUser?.fullName}`,
                  alt: `Use photo - ${oneUser?.fullName}`,
                },
              ]}
            />
          </ImagesModal>
        </ModalGateway>
      )}

      <AppPageTitle
        title="User detail"
        rightAction={
          <Typography component="span" sx={{ fontSize: 13, fontWeight: "bold", color: "white" }}>
            Status:
            {oneUser && (
              <Typography
                component="span"
                sx={{ fontSize: 14, ml: 1, color: statusColor(oneUser.status), textTransform: "uppercase" }}
              >
                {oneUser?.status}
              </Typography>
            )}
          </Typography>
        }
      />

      {oneUser && (
        <AppCard sx={{ p: 2, px: { xs: 2, sm: 3 }, pb: 3 }}>
          <Grid container spacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  ".MuiAvatar-root": {
                    width: { xs: 120, sm: 120, md: 150 },
                    height: { xs: 120, sm: 120, md: 150 },
                    borderRadius: "6%",
                    objectFit: "cover",
                  },
                }}
              >
                <Avatar
                  src={oneUser.photoUrl}
                  alt="name"
                  sx={{ cursor: oneUser.photoUrl.length > 0 ? "pointer" : "default" }}
                  variant="rounded"
                  onClick={() => {
                    oneUser.photoUrl.length > 0 && setSelectedImage(oneUser.photoUrl);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <InfoItemBox title="Email" content={oneUser.email} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <InfoItemBox title="Full Name" content={oneUser.fullName} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <InfoItemBox title="Email Verify" content={oneUser.emailVerified ? "Yes" : "No"} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <InfoItemBox title="Enrolled Date" content={MomentUtil.getDateStr(oneUser.createdAt)} />
            </Grid>
          </Grid>
        </AppCard>
      )}

      <AppCard sx={{ px: { xs: 2, sm: 3 }, py: "12px !important" }}>
        <FlexRow sx={{ mt: 0, justifyContent: "center", gap: { xs: 1, sm: 2 } }}>
          {oneUser?.status !== STATUS.ACTIVE && (
            <Button variant="contained" color="info" size="small" onClick={() => updateUserStatus(STATUS.ACTIVE)}>
              Active
            </Button>
          )}
          {oneUser?.status !== STATUS.INACTIVE && (
            <Button variant="contained" color="warning" size="small" onClick={() => updateUserStatus(STATUS.INACTIVE)}>
              InActive
            </Button>
          )}
          {oneUser?.status !== STATUS.DELETED && (
            <Button variant="contained" color="error" size="small" onClick={() => updateUserStatus(STATUS.DELETED)}>
              Delete
            </Button>
          )}
        </FlexRow>
      </AppCard>
    </FlexCol>
  );
};
