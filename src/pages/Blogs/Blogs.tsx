import { useCallback, useEffect, useMemo, useState } from "react";
import Carousel, { Modal as ImagesModal, ModalGateway } from "react-images";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Chip,
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  AppCard,
  AppPageTitle,
  AppTableCell,
  AppTextField,
  ConfirmModal,
  FlexCol,
  LoadingViewInComponent,
  BlogAllRowSkeleton,
} from "../../components";
import { RoutePath } from "../../routes";
import { blogSelector } from "../../redux/blog/selector";
import { deleteBlogAction, fetchBlogsAction } from "../../redux/blog/actions";
import { Formatter, StringUtil } from "../../utils";
import { STATUS } from "../../types";

export const Blogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [selectedData, setSelectedData] = useState<null | any>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(-1);
  const [previewImages, setPreviewImages] = useState([""]);
  const [search, setSearch] = useState("");

  const { items, isLoading, isSucceeded } = useSelector(blogSelector);
  const fetchData = useCallback(() => dispatch(fetchBlogsAction()), [dispatch]);
  const deleteItem = useCallback((id: string) => dispatch(deleteBlogAction(id)), [dispatch]);

  const filteredBlogs = useMemo(() => search.length == 0
      ? items
      : items.filter((one) => one.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())), [items, search]);

  useEffect(() => {
    if (items.length === 0 && !isSucceeded) {
      fetchData();
    }
  }, [items, isSucceeded]);

  useEffect(() => {
    !isLoading && isSucceeded && closeDeleteWin();
  }, [isLoading, isSucceeded]);

  const editBlog = (id: string) => {
    navigate(`${RoutePath.editBlog}?id=${id}`);
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
                caption: `Blog image - ${previewImageIndex + 1}`,
                alt: `Blog image - ${previewImageIndex + 1}`,
                loading: "lazy",
              }))}
            />
          </ImagesModal>
        </ModalGateway>
      )}
      <ConfirmModal
        open={isDelete}
        title="Confirm Delete"
        description={`Would you like to delete the ticket "${selectedData?.title}"?`}
        onConfirm={() => deleteItem(selectedData?.id)}
        onClose={closeDeleteWin}
      >
        <LoadingViewInComponent visible={isLoading} sx={{ backgroundColor: "#00000080" }} />
      </ConfirmModal>
      <AppPageTitle
        title="All Blogs"
        sx={{ "& .MuiTextField-root input": { width: 200 } }}
        rightAction={
          <>
            <AppTextField
              fullWidth={false}
              placeholder="Search blog with title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mr: 1, display: { xs: "none", md: "unset" } }}
            />
            <Button
              variant="contained"
              color="light"
              size="small"
              sx={{ textTransform: "unset" }}
              onClick={() => navigate("/blogs/edit-blog?id=new")}
            >
              {isSmallScreen ? <AddIcon sx={{ width: 23, height: 23 }} /> : "New Blog"}
            </Button>
          </>
        }
        bottomChild={
          isSmallScreen && (
            <AppTextField
              fullWidth
              placeholder="Search blog with title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ display: { xs: "unset", md: "none" } }}
            />
          )
        }
      />
      <AppCard
        sx={{
          p: 1,
          "& th": { borderBottom: "1px solid #ffffff80" },
          "& .MuiTableRow-root:not(:last-child)": { "& td": { borderBottom: "1px solid #ffffff30" } },
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <AppTableCell value="No" isTitle isFirstCell sx={{ width: { xs: 40, sm: 70 } }} />
                <AppTableCell value="Title" isTitle sx={{ flexGrow: 1, width: { xs: 120, sm: 200 } }} />
                <AppTableCell value="Content" isTitle />
                <AppTableCell value="Banner" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell isTitle>
                  <FlexCol sx={{ alignItems: "center", ".MuiTypography-root": { fontSize: 12, fontWeight: "bold" } }}>
                    <Typography>STATUS</Typography>
                  </FlexCol>
                </AppTableCell>
                <AppTableCell value="Action" isTitle align="center" sx={{ width: { sm: 120, md: 180 } }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBlogs.length === 0 &&
                isLoading &&
                Formatter.nArray(5).map((index) => <BlogAllRowSkeleton key={index} />)}

              {filteredBlogs.length === 0 && !isLoading && (
                <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                  <AppTableCell value="There is no featured blog" sx={{ py: 3 }} isTitle align="center" colSpan={6} />
                </TableRow>
              )}
              {filteredBlogs.map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <AppTableCell scope="row" value={index + 1} isFirstCell isVerticalTop />
                  <AppTableCell value={row.title} isVerticalTop />
                  <AppTableCell value={StringUtil.stripHtmlTags(row.content)} lineCount={3} isVerticalTop />
                  <AppTableCell>
                    <Avatar
                      key={index}
                      src={row.banner}
                      alt="name"
                      sx={{ cursor: "pointer", borderRadius: 2.5 }}
                      onClick={() => {
                        setPreviewImages([row.banner]);
                        setPreviewImageIndex(index);
                      }}
                    />
                  </AppTableCell>
                  <AppTableCell isVerticalTop>
                    <FlexCol sx={{ alignItems: "center" }}>
                      <Chip
                        label={row.status === STATUS.ACTIVE ? "Active" : "Inactive"}
                        variant="filled"
                        color={row.status === STATUS.ACTIVE ? "info" : "error"}
                        sx={{ height: 20, borderRadius: 1 }}
                      />
                    </FlexCol>
                  </AppTableCell>
                  <AppTableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      <Button variant="contained" color="success" size="small" onClick={() => editBlog(row.id)}>
                        <EditIcon sx={{ width: 20, height: 20 }} />
                      </Button>
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
