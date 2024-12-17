import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

import {
  AppCard,
  AppPageTitle,
  FlexCol,
  FlexRow,
  InfoEditBoxWithRef,
  TicketInfoTitle,
  VisuallyHiddenInput,
} from "../../components";
import { Blog, initBlog, STATUS } from "../../types";
import { CreateBlogDto } from "../../dtos";
import { blogSelector } from "../../redux/blog/selector";
import {
  createBlogAction,
  updateBlogAction
} from "../../redux/blog/actions";

const resolver = classValidatorResolver(CreateBlogDto);

export const BlogEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

    const [selectedData, setSelectedData] = useState<Blog>(initBlog);
    const [selectedImg, setSelectedImg] = useState<null | File>(null);
    const [previewImg, setPreviewImg] = useState<null | string>(null);
    const [isUploading, setIsUploading] = useState(false);

    const createItem = useCallback((data: any) => dispatch(createBlogAction(data)), [dispatch]);
    const updateItem = useCallback((id: string, data: any) => dispatch(updateBlogAction({ id, data })), [dispatch]);
    const { items: blogs, isLoading: blogLoading, isSucceeded, error } = useSelector(blogSelector);

    const idVal = new URLSearchParams(location.search).get("id");
    const pageTitle = useMemo(() => `${idVal && idVal !== "new" ? "Edit" : "New"} Blog`, [idVal]);
    const buttonText = useMemo(() => `${idVal && idVal !== "new" ? "Update" : "Save"} Blog`, [idVal]);

    const onSubmit = async (data: any) => {
      delete data["id"];
      setIsUploading(true);
      data.file = selectedImg;
      idVal === "new" ? createItem(data) : updateItem(editData.id, data);
    };

    const editData = useMemo(() => {
      if (idVal && idVal !== "new") {
        let temp = blogs.filter((one) => one.id == idVal)[0];
        return temp;
      }
      return initBlog;
    }, [idVal, blogs]);
    
    const {
      control,
      formState: { errors },
      handleSubmit,
      register,
      setError,
      setValue
    } = useForm<CreateBlogDto>({ resolver, defaultValues: { ...editData } });


    useEffect(() => {
      if (isUploading && isSucceeded && !blogLoading) {
        navigate(-1);
      }
    }, [isUploading, isSucceeded, blogLoading]);

    useEffect(() => {
      if (idVal && idVal !== "new") {
        setSelectedData(editData);
      }
    }, [idVal]);

    useEffect(() => {
      if (error) {
        setIsUploading(false);
      }
    }, [error]);

    const onChangeImage = (event: any) => {
      if (event.target.files && event.target.files[0]) {
        setSelectedImg(event.target.files[0]);
        setValue("banner", URL.createObjectURL(event.target.files[0]));
        setError("banner", {});
      }
    };

    const handleChange = (content: string) => {
      setValue("content", content);
      selectedData.content = content;

      setError("content", {});
    };

    return (
        <FlexCol sx={{ gap: 2 }}>
          <AppPageTitle
            title={pageTitle}
            rightAction={
              <Button variant="contained" color="light" size="small" sx={{ mr: 1 }} onClick={handleSubmit(onSubmit)}>
                  {isSmallScreen ? <SaveIcon sx={{ width: 23, height: 23 }} /> : buttonText}
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

          <Box component="form" role="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <AppCard sx={{ p: 2, px: { xs: 1, sm: 3 } }}>
              <Grid container spacing={2} columnSpacing={2}>
                <Grid item xs={12}>
                  <InfoEditBoxWithRef
                    title="Title"
                    isRequired
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    {...register("title")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl error={!!errors.banner} variant="standard">
                    <InfoEditBoxWithRef
                      isRequired
                      title="Banner Photo"
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
                          {!selectedImg && selectedData.banner && (
                            <Avatar
                              src={selectedData.banner}
                              alt="name"
                              variant="rounded"
                              sx={{ alignSelf: "center", cursor: "pointer" }}
                              onClick={() => setPreviewImg(selectedData.banner)}
                            />
                          )}
                        </Box>
                      }
                    />
                    <FormHelperText>{errors.banner ? errors.banner.message : null}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ mt: 0.5, color: "white", fontSize: 13 }}>Content *</Typography>
                  <Paper>
                    <FormControl error={!!errors.content} variant="standard" sx={{ width: '100%' }}>
                      <ReactQuill
                        value={selectedData.content}
                        onChange={handleChange}
                      />
                      <FormHelperText>{errors.content ? errors.content.message : null}</FormHelperText>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <TicketInfoTitle title="Status *" />
                  <FormControl error={!!errors.status} variant="standard" fullWidth>
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="status"
                      defaultValue={editData.status}
                      render={({ field: { onChange, ...field } }) => (
                        <RadioGroup
                          row
                          aria-labelledby="info-status-label"
                          sx={{ ml: 2, color: "white", justifyContent: { xs: "center", sm: "left" } }}
                          {...field}
                        >
                          <FormControlLabel
                            value={STATUS.ACTIVE}
                            control={
                              <Radio color="light" value={STATUS.ACTIVE} onChange={(e) => onChange(STATUS.ACTIVE)} />
                            }
                            label="Active"
                          />
                          <FormControlLabel
                            value={STATUS.INACTIVE}
                            control={
                              <Radio color="light" value={STATUS.INACTIVE} onChange={(e) => onChange(STATUS.INACTIVE)} />
                            }
                            label="Inactive"
                          />
                        </RadioGroup>
                      )}
                    />
                    {errors.status && <FormHelperText sx={{ mt: 0 }}>{errors.status.message}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FlexRow sx={{ mt: { xs: 4, sm: 5 }, mb: { xs: 1, sm: 2 }, justifyContent: "center", gap: 1.5 }}>
                    <Button
                      variant="contained"
                      color="light"
                      size={isSmallScreen ? "small" : "medium"}
                      type="submit"
                      // onClick={saveTicket}
                      endIcon={<SaveIcon sx={{ width: 23, height: 23 }} />}
                    >
                      {buttonText}
                    </Button>
                  </FlexRow>
                </Grid>
              </Grid>
            </AppCard>
          </Box>  
        </FlexCol> 
    );  
};