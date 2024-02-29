import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Carousel, { Modal as ImagesModal, ModalGateway } from "react-images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  GlobalStyles,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  useMediaQuery,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  AppCard,
  AppPageTitle,
  AppTableCell,
  ConfirmModal,
  FlexRow,
  HelpAllRowSkeleton,
  LoadingViewInComponent,
} from "../../components";
import { SITE } from "../../config";
import { Formatter } from "../../utils";
import { RoutePath } from "../../routes";
import { HelpRequest, STATUS } from "../../types";
import { helpSelector } from "../../redux/helpRequest/selector";
import { deleteRequestAction, fetchHelpRequestsAction } from "../../redux/helpRequest/actions";
import { appColors } from "../../theme";
import { NavLink } from "react-router-dom";

const AllButtonOption = [
  { id: "all", name: "All Requests" },
  { id: "active", name: "Active Requests" },
  { id: "solved ", name: "Solved Requests" },
];

export const AllHelpRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<null | HelpRequest>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(-1);
  const [previewImages, setPreviewImages] = useState([""]);
  const [selectedOption, setSelectedOption] = useState(AllButtonOption[0]);

  const anchorRef = useRef<HTMLDivElement>(null);

  const { items, isLoading, isSucceeded } = useSelector(helpSelector);
  const fetchData = useCallback(() => dispatch(fetchHelpRequestsAction()), [dispatch]);
  const deleteItem = useCallback((id: string) => dispatch(deleteRequestAction(id)), [dispatch]);
  const filteredData = useMemo(() => {
    if (selectedOption.id === "all") return items;
    if (selectedOption.id === "active") return items.filter((one) => one.status === STATUS.ACTIVE);
    return items.filter((one) => one.status === STATUS.SOLVED);
  }, [selectedOption, items]);

  const emptyMsg = useMemo(() => {
    if (selectedOption.id === "all") return "There is no request now";
    if (selectedOption.id === "active") return "There is no active request now";
    return "There is no solved request now";
  }, [selectedOption]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    !isLoading && isSucceeded && closeDeleteWin();
  }, [isLoading, isSucceeded]);

  const toggleButtonGroup = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const closeButtonGroup = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setIsOpen(false);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const viewDetails = (id: string) => {
    navigate(`${RoutePath.HelpRequest}/detail?id=${id}`);
  };

  const confirmDeleteItem = (data: any) => {
    setSelectedData(data);
    setIsDelete(true);
  };

  const closeDeleteWin = () => {
    setIsDelete(false);
    setSelectedData(null);
  };

  return (
    <Box sx={{ gap: 2, mt: 0, display: "flex", flexDirection: "column" }}>
      <GlobalStyles styles={{ ".MuiButton-root": { px: "6px" } }} />
      {previewImageIndex > -1 && previewImages.length > 0 && (
        <ModalGateway>
          <ImagesModal onClose={() => setPreviewImageIndex(-1)}>
            <Carousel
              currentIndex={previewImageIndex}
              styles={{
                // container: (base, state) => ({ backdropFilter: "blur(7px)" }),
                headerFullscreen: (base, state) => ({ display: "none" }),
                view: (base, state) => ({
                  ...base,
                  ...state,
                  maxHeight: "95vh",
                  "&>img": { width: "auto", height: "100%", objectFit: "contain" },
                }),
              }}
              views={previewImages.map((one, index) => ({
                source: one,
                caption: `Attatchment image - ${previewImageIndex + 1}`,
                alt: `Attatchment image - ${previewImageIndex + 1}`,
                loading: "lazy",
              }))}
            />
          </ImagesModal>
        </ModalGateway>
      )}
      {selectedData && (
        <ConfirmModal
          open={isDelete}
          title="Confirm Delete"
          description={`Would you like to delete this request "${selectedData.question}"?`}
          onConfirm={() => deleteItem(selectedData.id)}
          onClose={closeDeleteWin}
        >
          <LoadingViewInComponent visible={isLoading} sx={{ backgroundColor: "#00000080" }} />
        </ConfirmModal>
      )}

      <Popper open={isOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal sx={{ zIndex: 1 }}>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "right top" : "right bottom" }}>
            <Paper>
              <ClickAwayListener onClickAway={closeButtonGroup}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {AllButtonOption.map((option: any, index) => (
                    <MenuItem
                      key={option.name}
                      selected={option.id === selectedOption.id}
                      onClick={(event) => handleMenuItemClick(event, option)}
                      sx={{ fontSize: 14 }}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <AppPageTitle
        title={selectedOption.name}
        rightAction={
          <ButtonGroup
            variant="contained"
            size="small"
            color="success"
            ref={anchorRef}
            aria-label="destination button"
            sx={{ mr: 1 }}
          >
            <Button
              onClick={toggleButtonGroup}
              sx={{ "& .MuiButton-endIcon": { ml: 0, mr: -1 }, textTransform: "uppercase" }}
              endIcon={<ArrowDropDownIcon sx={{ width: 24, height: 24 }} />}
            >
              {selectedOption.name}
            </Button>
          </ButtonGroup>
        }
      />
      <AppCard
        sx={{
          "& th": { borderBottom: "1px solid #ffffff80" },
          "& .MuiTableRow-root:not(:last-child)": { "& td": { borderBottom: "1px solid #ffffff30" } },
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <AppTableCell value="No" isTitle isFirstCell sx={{ width: { xs: 40, sm: 70 } }} />
                <AppTableCell value="Question" isTitle sx={{ width: { sm: 180, md: 240 } }} />
                <AppTableCell value="Email" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell value="Name" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell value="Details" isTitle sx={{ flexGrow: 1 }} />
                <AppTableCell value="Attatchments" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell value="Action" isTitle align="center" sx={{ width: 100 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 &&
                isLoading &&
                Formatter.nArray(5).map((index) => <HelpAllRowSkeleton key={index} />)}

              {filteredData.length === 0 && !isLoading && (
                <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                  <AppTableCell value={emptyMsg} sx={{ py: 3 }} isTitle align="center" colSpan={8} />
                </TableRow>
              )}

              {filteredData.map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <AppTableCell scope="row" value={index + 1} isFirstCell isVerticalTop />
                  <AppTableCell lineCount={3} isVerticalTop>
                    <NavLink
                      to={`${RoutePath.HelpRequest}/detail?id=${row.id}`}
                      style={{ color: row.status === STATUS.SOLVED ? appColors.info.main : appColors.error.main }}
                    >
                      {row.question}
                    </NavLink>
                  </AppTableCell>
                  <AppTableCell value={row.email} isVerticalTop />
                  <AppTableCell value={row.fullName} isVerticalTop />
                  <AppTableCell value={row.content} lineCount={3} isVerticalTop />
                  <AppTableCell>
                    {row.attatchments && row.attatchments.length === 0 && "No attatched files"}
                    {row.attatchments && row.attatchments.length > 0 && (
                      <FlexRow sx={{ display: "flex", flexDirection: "row" }}>
                        <AvatarGroup
                          max={4}
                          total={row.attatchments.length}
                          sx={{ ".MuiAvatar-root": { fontSize: 14, borderWidth: 0, color: "black !important" } }}
                        >
                          {row.attatchments.map((one, index) => (
                            <Avatar
                              key={index}
                              src={one}
                              alt="name"
                              variant="rounded"
                              sx={{ cursor: "pointer", borderRadius: 2.5 }}
                              onClick={() => {
                                setPreviewImages(row.attatchments ?? []);
                                setPreviewImageIndex(index);
                              }}
                            />
                          ))}
                        </AvatarGroup>
                      </FlexRow>
                    )}
                  </AppTableCell>
                  <AppTableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "start", gap: { xs: 0.5, sm: 1 } }}>
                      <NavLink to={`${RoutePath.HelpRequest}/detail?id=${row.id}`}>
                        <Button
                          variant="contained"
                          color={row.status === STATUS.SOLVED ? "info" : "success"}
                          size="small"
                        >
                          {row.status === STATUS.SOLVED ? (
                            <VisibilityIcon sx={{ width: 20, height: 20 }} />
                          ) : (
                            <EditIcon sx={{ width: 20, height: 20 }} />
                          )}
                        </Button>
                      </NavLink>
                      <Button variant="contained" color="error" size="small" onClick={() => confirmDeleteItem(row)}>
                        <DeleteIcon sx={{ width: 20, height: 20 }} />
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
