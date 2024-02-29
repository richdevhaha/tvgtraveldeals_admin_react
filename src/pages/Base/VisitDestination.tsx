import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SourceIcon from "@mui/icons-material/Source";
import SaveIcon from "@mui/icons-material/Save";

import {
  AppCard,
  AppPageTitle,
  AppSelect,
  AppTableCell,
  ConfirmModal,
  DestinationRowSkeleton,
  FlexCol,
  FlexRow,
  InfoEditBoxWithRef,
  LoadingViewInComponent,
  VisuallyHiddenInput,
} from "../../components";
import { Destination, STATUS, initDestinationValue } from "../../types";
import { destinationSelector } from "../../redux/destination/selector";
import {
  createDestinationAction,
  deleteDestinationAction,
  fetchDestinationsAction,
  updateDestinationAction,
} from "../../redux/destination/actions";
import { RoutePath } from "../../routes";
import { Formatter, StringUtil } from "../../utils";

const initErrors = { name: undefined || "", logo: undefined || "" };

export const VisitDestination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedData, setSelectedData] = useState<Destination>(initDestinationValue);
  const [selectedImg, setSelectedImg] = useState<null | File>(null);
  const [previewImg, setPreviewImg] = useState<null | string>(null);
  const [errors, setErrors] = useState(initErrors);

  const { items, isLoading, isSucceeded } = useSelector(destinationSelector);

  const fetchData = useCallback(() => dispatch(fetchDestinationsAction()), [dispatch]);
  const createItem = useCallback((data: any) => dispatch(createDestinationAction(data)), [dispatch]);
  const updateItem = useCallback(
    (id: string, data: any) => dispatch(updateDestinationAction({ id, data })),
    [dispatch]
  );
  const deleteItem = useCallback((id: string) => dispatch(deleteDestinationAction(id)), [dispatch]);

  useEffect(() => {
    fetchData();
    setErrors(initErrors);
  }, [fetchData]);

  useEffect(() => {
    !isLoading && isSucceeded && closeEditWin();
  }, [isLoading, isSucceeded]);

  const gotoDetail = (data: Destination) => {
    navigate(`${RoutePath.destinationTickets}?id=${data.id}`);
  };

  const openNewWin = () => {
    setSelectedData(initDestinationValue);
    setIsEdit(true);
  };

  const openEditWin = (data: Destination) => {
    setSelectedData(data);
    setIsEdit(true);
  };

  const closeEditWin = () => {
    setIsEdit(false);
    setIsDelete(false);
    setSelectedImg(null);
    setSelectedData(initDestinationValue);
  };

  const confirmDeleteItem = (data: Destination) => {
    setSelectedData(data);
    setIsDelete(true);
  };

  const onChangeImage = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImg(event.target.files[0]);
      // setImages(URL.createObjectURL(event.target.files[0]));
    }
  };

  const saveData = () => {
    let fullForm = true;
    const formError = { name: undefined || "", logo: undefined || "" };
    if (selectedData.name === "") {
      fullForm = false;
      formError.name = "Name should not be empty";
    }
    if (selectedImg === null && selectedData.logo === "") {
      fullForm = false;
      formError.logo = "Logo should not be empty";
    }

    setErrors(formError);
    if (fullForm) {
      const id = selectedData.id;
      var data: { [k: string]: any } = {};
      data = {
        name: selectedData.name,
        isShowHome: selectedData.isShowHome,
        status: selectedData.status,
      };

      if (id === "new") {
        data.file = selectedImg;
      } else {
        data.logo = selectedData.logo;
        if (selectedImg) {
          data.file = selectedImg;
        }
      }
      id === "new" ? createItem(data) : updateItem(id, data);
    } else {
      console.log("selectedData otehr===>");
    }
  };

  return (
    <Box sx={{ gap: 1, mt: 0, display: "flex", flexDirection: "column" }}>
      <AppPageTitle
        title="Visit Destination"
        rightAction={
          <Button variant="contained" color="light" size="small" onClick={openNewWin}>
            {isSmallScreen ? <AddIcon sx={{ width: 23, height: 23 }} /> : "New Destination"}
          </Button>
        }
      />

      {previewImg && (
        <Modal
          open={Boolean(previewImg)}
          onClose={() => setPreviewImg(null)}
          aria-labelledby="modal-image-preview"
          aria-describedby="modal-image-preview"
          closeAfterTransition
          // slots={{ backdrop: Backdrop }}
          // slotProps={{ backdrop: { timeout: 300 } }}
        >
          <Box
            sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "50vh" }}
          >
            <Avatar
              src={previewImg}
              alt="Destination Logo"
              variant="rounded"
              sx={{ alignSelf: "center", width: "100%", height: "100%" }}
            />
          </Box>
        </Modal>
      )}

      {isDelete && selectedData && (
        <ConfirmModal
          open={isDelete}
          title="Confirm Delete"
          description={`Would you like to delete this destination "${selectedData.name}"?`}
          onConfirm={() => deleteItem(selectedData.id)}
          onClose={closeEditWin}
        >
          <LoadingViewInComponent visible={isLoading} sx={{ backgroundColor: "#00000080" }} />
        </ConfirmModal>
      )}

      {isEdit && selectedData && (
        <Collapse in={isEdit}>
          <AppCard sx={{ p: 2, flexDirection: "column" }}>
            <FlexRow sx={{ justifyContent: "space-between", mb: 4, mx: 2 }}>
              <Typography variant="h6" color="white" fontWeight="bold" sx={{ fontSize: 18 }}>
                {selectedData.id === "new" ? "New" : "Edit"} Destination
              </Typography>
              <IconButton
                aria-label="view"
                color="primary"
                size="small"
                sx={{ width: 30, height: 30, border: `2px solid white`, borderRadius: 2 }}
                onClick={closeEditWin}
              >
                <CloseIcon sx={{ width: 18, height: 18, color: "white" }} />
              </IconButton>
            </FlexRow>
            <Grid container spacing={2} sx={{ px: { xs: 0, sm: 2 } }}>
              <Grid item xs={12}>
                <InfoEditBoxWithRef
                  isRequired
                  title="Destination"
                  error={!!errors.name}
                  helperText={errors.name}
                  value={selectedData.name}
                  onChange={(e) => setSelectedData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl error={!!errors.logo} variant="standard">
                  <InfoEditBoxWithRef
                    isRequired
                    title="Logo Photo"
                    isSelect
                    selectItem={
                      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        <Box>
                          <Button
                            component="label"
                            variant="contained"
                            color="light"
                            size="small"
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload Photo
                            <VisuallyHiddenInput
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={onChangeImage}
                            />
                          </Button>
                        </Box>
                        {selectedImg && (
                          <Avatar
                            src={URL.createObjectURL(selectedImg)}
                            alt="name"
                            variant="rounded"
                            sx={{ alignSelf: "center", cursor: "pointer" }}
                            onClick={() => setPreviewImg(URL.createObjectURL(selectedImg))}
                          />
                        )}
                        {!selectedImg && selectedData.logo && (
                          <Avatar
                            src={selectedData.logo}
                            alt="name"
                            variant="rounded"
                            sx={{ alignSelf: "center", cursor: "pointer" }}
                            onClick={() => setPreviewImg(selectedData.logo)}
                          />
                        )}
                      </Box>
                    }
                  />
                  <FormHelperText>{errors.logo}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InfoEditBoxWithRef
                  title="Top Destination"
                  isSelect
                  selectItem={
                    <RadioGroup
                      row
                      aria-labelledby="info-isShowHome-label"
                      sx={{ ml: 2, color: "white", justifyContent: { xs: "center", sm: "left" } }}
                      name="isShowHome"
                      value={selectedData.isShowHome}
                      onChange={(e) =>
                        setSelectedData((prev) => ({
                          ...prev,
                          isShowHome: (e.target as HTMLInputElement).value == "true",
                        }))
                      }
                    >
                      <FormControlLabel value={true} control={<Radio color="light" />} label="Yes" />
                      <FormControlLabel value={false} control={<Radio color="light" />} label="No" />
                    </RadioGroup>
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoEditBoxWithRef
                  title="Status"
                  isSelect
                  selectItem={
                    <AppSelect
                      value={selectedData.status}
                      onChange={(e) => setSelectedData((prev) => ({ ...prev, status: e.target.value as STATUS }))}
                    >
                      <MenuItem value={STATUS.ACTIVE}>Active</MenuItem>
                      <MenuItem value={STATUS.INACTIVE}>Inactive</MenuItem>
                    </AppSelect>
                  }
                />
              </Grid>
            </Grid>
            <FlexCol
              sx={{
                mt: 3,
                mr: { xs: 0, md: 2 },
                justifyContent: { xs: "center", sm: "center", md: "end" },
                flexDirection: "unset",
              }}
            >
              <Button
                variant="contained"
                color="light"
                size="medium"
                onClick={saveData}
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress color="primary" size={20} /> : <SaveIcon />}
                sx={{ lineHeight: "100%", px: 2 }}
              >
                {selectedData.id === "new" ? "Save" : "Update"}
              </Button>
            </FlexCol>
          </AppCard>
        </Collapse>
      )}
      <AppCard
        sx={{
          "& th": { borderBottom: "1px solid #ffffff80" },
          "& .MuiTableRow-root:not(:last-child)": { "& td": { borderBottom: "1px solid #ffffff30" } },
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: { xs: "max-content", md: 500 } }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <AppTableCell value="No" isTitle isFirstCell sx={{ width: { xs: 40, sm: 70 } }} />
                <AppTableCell value="Logo" isTitle sx={{ flexGrow: 1 }} />
                <AppTableCell value="Name" isTitle />
                <AppTableCell value="Top Destination" isTitle sx={{ width: { xs: 90, sm: 140 } }} />
                <AppTableCell value="Status" isTitle align="center" sx={{ width: 100 }} />
                <AppTableCell value="Action" isTitle align="center" sx={{ width: { sm: 150, md: 270 } }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 &&
                isLoading &&
                Formatter.nArray(5).map((index) => <DestinationRowSkeleton key={index} />)}
              {items.length === 0 && !isLoading && (
                <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                  <AppTableCell
                    value="There is no destinations now"
                    sx={{ py: 3 }}
                    isTitle
                    align="center"
                    colSpan={4}
                  />
                </TableRow>
              )}
              {items
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((row, index) => (
                  <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <AppTableCell scope="row" value={index + 1} isFirstCell />
                    <AppTableCell>
                      <Avatar
                        src={row.logo}
                        alt="name"
                        variant="rounded"
                        sx={{ alignSelf: "center", cursor: "pointer" }}
                        onClick={() => setPreviewImg(row.logo)}
                      />
                    </AppTableCell>
                    <AppTableCell value={row.name} />
                    <AppTableCell
                      value={row.isShowHome ? "Yes" : "No"}
                      sx={{ color: row.isShowHome ? "white" : "yellow" }}
                    />
                    <AppTableCell align="center">
                      <Chip
                        label={StringUtil.capitalizeFLetter(row.status)}
                        variant="outlined"
                        color={row.status === "active" ? "info" : "error"}
                        sx={{ height: 28 }}
                      />
                    </AppTableCell>
                    <AppTableCell
                      align="center"
                      sx={{
                        alignContent: "center",
                        alignItems: "center",
                        "& div": { justifyContent: "center" },
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <Button variant="contained" color="success" size="small" onClick={() => openEditWin(row)}>
                          {isSmallScreen ? <EditIcon sx={{ width: 20, height: 20 }} /> : "Edit"}
                        </Button>
                        <Button variant="contained" color="warning" size="small" onClick={() => gotoDetail(row)}>
                          {isSmallScreen ? <SourceIcon sx={{ width: 20, height: 20 }} /> : "View Tickets"}
                        </Button>

                        <Button variant="contained" color="error" size="small" onClick={() => confirmDeleteItem(row)}>
                          {isSmallScreen ? <DeleteIcon sx={{ width: 20, height: 20 }} /> : "Delete"}
                        </Button>
                      </Box>
                    </AppTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AppCard>
    </Box>
  );
};
