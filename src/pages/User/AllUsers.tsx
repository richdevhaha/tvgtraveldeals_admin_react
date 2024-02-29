import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Carousel, { Modal as ImagesModal, ModalGateway } from "react-images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
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
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  AppCard,
  AppPageTitle,
  AppTableCell,
  ConfirmModal,
  LoadingViewInComponent,
  UserRowSkeleton,
} from "../../components";
import { Formatter } from "../../utils";
import { RoutePath } from "../../routes";
import { STATUS, User } from "../../types";
import { userSelector } from "../../redux/user/selector";
import { deleteUserAction, fetchUsersAction } from "../../redux/user/actions";

const AllButtonOption = [
  { id: "all", name: "All Users" },
  { id: "active", name: "Active Users" },
  { id: "inactive ", name: "Inactive Users" },
  { id: "deleted ", name: "Deleted Users" },
];

export const AllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isLoading, isSucceeded } = useSelector(userSelector);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<User | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState(AllButtonOption[0]);

  const anchorRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(() => dispatch(fetchUsersAction()), [dispatch]);
  const deleteItem = useCallback((id: string) => dispatch(deleteUserAction(id)), [dispatch]);
  const filteredData = useMemo(() => {
    if (selectedOption.id === "all") return users;
    if (selectedOption.id === "active") return users.filter((one) => one.status === STATUS.ACTIVE);
    if (selectedOption.id === "inactive") return users.filter((one) => one.status === STATUS.INACTIVE);
    return users.filter((one) => one.status === STATUS.DELETED);
  }, [selectedOption, users]);

  const emptyMsg = useMemo(() => {
    if (selectedOption.id === "all") return "There is no users yet";
    if (selectedOption.id === "active") return "There is active user now";
    if (selectedOption.id === "inactive") return "There is inactive user now";
    return "There is no deleted user now";
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

  const closeDeleteWin = () => {
    setSelectedData(null);
  };

  return (
    <Box sx={{ gap: 2, mt: 0, display: "flex", flexDirection: "column" }}>
      <GlobalStyles styles={{ ".MuiButton-root": { px: "6px" } }} />
      {previewImage && (
        <ModalGateway>
          <ImagesModal onClose={() => setPreviewImage(null)}>
            <Carousel
              currentIndex={0}
              styles={{
                headerFullscreen: (base, state) => ({ display: "none" }),
                view: (base, state) => ({
                  ...base,
                  ...state,
                  maxHeight: "95vh",
                  "&>img": { width: "auto", height: "100%", objectFit: "contain" },
                }),
              }}
              views={[{ source: previewImage, caption: `User photo`, alt: `User photo` }]}
            />
          </ImagesModal>
        </ModalGateway>
      )}
      {selectedData && (
        <ConfirmModal
          open
          title="Confirm Delete"
          description={
            <>
              <Typography variant="subtitle2">
                All history of this user will be deleted and can&apos;t restore it.
              </Typography>
              <Typography variant="subtitle2">
                Would you like to delete this user &quot;{selectedData.fullName}&quot;?
              </Typography>
            </>
          }
          confirmTitle="Delete"
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
        title="User List"
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
                <AppTableCell value="No" isTitle isFirstCell sx={{ width: { xs: 40, sm: 60 } }} />
                <AppTableCell value="Photo" isTitle sx={{ width: 80 }} />
                <AppTableCell value="Email" isTitle sx={{ width: { sm: 120, md: 160, lg: 200 } }} />
                <AppTableCell value="Full Name" isTitle />
                <AppTableCell value="Phone" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell value="Status" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell value="Action" isTitle align="center" sx={{ width: 100 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 && isLoading && Formatter.nArray(5).map((index) => <UserRowSkeleton key={index} />)}

              {filteredData.length === 0 && !isLoading && (
                <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                  <AppTableCell value={emptyMsg} sx={{ py: 3 }} isTitle align="center" colSpan={8} />
                </TableRow>
              )}

              {filteredData.map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <AppTableCell scope="row" value={index + 1} isFirstCell />
                  <AppTableCell>
                    <Avatar
                      key={index}
                      src={row.photoUrl}
                      alt="name"
                      variant="rounded"
                      sx={{
                        cursor: row.photoUrl && row.photoUrl?.length > 0 ? "pointer" : "default",
                        borderRadius: 2.5,
                      }}
                      onClick={() => setPreviewImage(row.photoUrl && row.photoUrl.length > 0 ? row.photoUrl : null)}
                    />
                  </AppTableCell>
                  <AppTableCell value={row.email} lineCount={3} />
                  <AppTableCell value={row.fullName} />
                  <AppTableCell value={row.phone} />
                  <AppTableCell
                    value={row.status}
                    sx={{ textTransform: "lowercase", ":first-letter": { textTransform: "uppercase" } }}
                  />
                  <AppTableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "start", gap: { xs: 0.5, sm: 1 } }}>
                      <Button variant="contained" color="warning" size="small" href={`/users/detail?id=${row.id}`}>
                        <VisibilityIcon sx={{ width: 20, height: 20 }} />
                      </Button>
                      <Button variant="contained" color="error" size="small" onClick={() => setSelectedData(row)}>
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
