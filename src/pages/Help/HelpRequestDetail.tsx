import { useCallback, useEffect, useState } from "react";
import Carousel, { Modal as ImagesModal, ModalGateway } from "react-images";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button, Grid, Theme, Typography, useMediaQuery } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { AppCard, AppPageTitle, AppTextField, FlexCol, FlexRow, LoadingView } from "../../components";
import { fetchOneRequestAction, updateRequestAction } from "../../redux/helpRequest/actions";
import { helpSelector } from "../../redux/helpRequest/selector";
import { HelpInfoBox } from "./HelpInfoBox";
import { STATUS } from "../../types";

export const HelpRequestDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const idVal = new URLSearchParams(location.search).get("id");

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [previewImageIndex, setPreviewImageIndex] = useState(-1);
  const [solveMessage, setSolveMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { oneRequest, isLoading: hLoading, isSucceeded, error } = useSelector(helpSelector);

  const fetchOneHelpRequest = useCallback((idVal: string) => dispatch(fetchOneRequestAction(idVal)), [dispatch]);
  const updateItem = useCallback((data: any) => dispatch(updateRequestAction(data)), [dispatch]);

  const buttonText = "Solve";

  useEffect(() => {
    idVal && fetchOneHelpRequest(idVal);
  }, [idVal]);

  useEffect(() => {
    if (error) setIsUploading(false);
  }, [error]);

  useEffect(() => {
    if (isUploading && isSucceeded && !hLoading) {
      navigate(-1);
      // navigate("/all-tickets");
    }
  }, [isSucceeded, hLoading]);

  useEffect(() => {
    solveMessage.length > 0 && setErrMsg("");
  }, [solveMessage]);

  if (!oneRequest && hLoading) return <LoadingView visible />;

  if (!oneRequest && !hLoading) {
    return (
      <AppCard sx={{ p: 2, px: { xs: 2, sm: 3 } }}>
        <Typography sx={{ fontSize: 18, textAlign: "center", color: "white" }}>Not found</Typography>
      </AppCard>
    );
  }

  const sendResonse = () => {
    if (solveMessage.length === 0) {
      setErrMsg("Your response should not be empty");
    } else {
      setErrMsg("");
      setIsUploading(true);
      updateItem({ id: idVal, request: { solveMessage, status: STATUS.SOLVED } });
    }
  };

  return (
    <FlexCol sx={{ gap: 2 }}>
      <LoadingView visible={isUploading} />
      {previewImageIndex > -1 && (
        <ModalGateway>
          <ImagesModal onClose={() => setPreviewImageIndex(-1)}>
            <Carousel
              currentIndex={previewImageIndex}
              styles={{
                headerFullscreen: (base, state) => ({ display: "none" }),
                view: (base, state) => ({
                  ...base,
                  ...state,
                  maxHeight: "95vh",
                  "&>img": { width: "100%", height: "100%", objectFit: "contain" },
                }),
              }}
              views={selectedImages.map((one, index) => ({
                source: one,
                caption: `Attached image - ${previewImageIndex + 1}`,
                alt: `Attached image - ${previewImageIndex + 1}`,
                loading: "lazy",
              }))}
            />
          </ImagesModal>
        </ModalGateway>
      )}

      <AppPageTitle title="Help Request detail" />

      <AppCard sx={{ p: 2, px: { xs: 2, sm: 3 }, pb: 3 }}>
        <Grid container spacing={2} columnSpacing={2}>
          <Grid item xs={12} sx={{ mb: 0.5 }}>
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>Request Information</Typography>
          </Grid>

          <Grid item xs={12}>
            <HelpInfoBox title="Question" content={oneRequest!.question} />
          </Grid>

          {oneRequest?.email && (
            <Grid item xs={12} sm={6} md={3}>
              <HelpInfoBox title="Email" content={oneRequest.email} />
            </Grid>
          )}
          {oneRequest?.fullName && (
            <Grid item xs={12} sm={6} md={3}>
              <HelpInfoBox title="User name" content={oneRequest.fullName} />
            </Grid>
          )}
          {oneRequest?.bookingId && (
            <Grid item xs={12} sm={6} md={3}>
              <HelpInfoBox title="Booking Id" content={oneRequest.bookingId} />
            </Grid>
          )}
          {oneRequest?.activityDate && (
            <Grid item xs={12} sm={6} md={3}>
              <HelpInfoBox title="Activity Date" content={oneRequest.activityDate} />
            </Grid>
          )}
          {oneRequest?.existingActivity && (
            <Grid item xs={12} sm={6} md={3}>
              <HelpInfoBox title="Name / URL of activity" content={oneRequest.existingActivity} />
            </Grid>
          )}
          {oneRequest?.existingHelp && (
            <Grid item xs={12} sm={6} md={3}>
              <HelpInfoBox title="What can we help you with?" content={oneRequest.existingHelp} />
            </Grid>
          )}
          {oneRequest?.subject && (
            <Grid item xs={12} sm={6}>
              <HelpInfoBox title="Subject" content={oneRequest.subject} />
            </Grid>
          )}
          {oneRequest?.changeType && (
            <Grid item xs={12} sm={6}>
              <HelpInfoBox title="What would you like to change?" content={oneRequest.changeType} />
            </Grid>
          )}
          {oneRequest?.changeReason && (
            <Grid item xs={12} sm={6}>
              <HelpInfoBox title="Reason" content={oneRequest.changeReason} />
            </Grid>
          )}
          {oneRequest?.websiteUrl && (
            <Grid item xs={12} sm={6}>
              <HelpInfoBox title="Website URL" content={oneRequest.websiteUrl} />
            </Grid>
          )}

          {oneRequest?.content && (
            <Grid item xs={12}>
              <HelpInfoBox title="Request details" content={oneRequest.content} />
            </Grid>
          )}

          {oneRequest && oneRequest.attatchments && oneRequest.attatchments?.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="caption" color="black" sx={{ fontSize: 12, textDecoration: "underline" }}>
                Attatched Files
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  ".MuiAvatar-root": {
                    width: "auto",
                    height: { xs: 45, sm: 60 },
                    borderRadius: "6%",
                    objectFit: "contain",
                  },
                }}
              >
                {oneRequest.attatchments.map((one, index) => (
                  <Avatar
                    key={index}
                    src={one}
                    alt="name"
                    sx={{ cursor: "pointer" }}
                    variant="rounded"
                    onClick={() => {
                      setSelectedImages(oneRequest?.attatchments ?? []);
                      setPreviewImageIndex(index);
                    }}
                  />
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
      </AppCard>

      <AppCard sx={{ px: { xs: 2, sm: 3 }, py: "12px !important" }}>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            color: oneRequest?.status === STATUS.SOLVED ? "black" : "white",
            textDecoration: oneRequest?.status === STATUS.SOLVED ? "underline" : "unset",
          }}
        >
          Your Response
        </Typography>
        {oneRequest?.status === STATUS.SOLVED && (
          <Typography component="p" color="white" sx={{ fontSize: 14, my: 1 }}>
            {oneRequest.solveMessage ?? ""}
          </Typography>
        )}
        {oneRequest?.status === STATUS.ACTIVE && (
          <>
            <AppTextField
              value={solveMessage}
              multiline
              rows={5}
              onChange={(event: any) => setSolveMessage(event.target.value)}
              sx={{ mt: 1 }}
              error={!!errMsg}
              helperText={errMsg}
            />

            <FlexRow sx={{ mt: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                color="light"
                size={isSmallScreen ? "small" : "medium"}
                type="submit"
                onClick={sendResonse}
                sx={{ px: 2 }}
                endIcon={<SaveIcon sx={{ width: 23, height: 23 }} />}
              >
                Send
              </Button>
            </FlexRow>
          </>
        )}
      </AppCard>
    </FlexCol>
  );
};
