import { useCallback, useEffect, useMemo, useState } from "react";
import Carousel, { Modal as ImagesModal, ModalGateway } from "react-images";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  Table, 
  TableBody, 
  TableContainer, 
  TableHead, 
  TableRow
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";

import {
  AppCard,
  AppPageTitle,
  AppSelect,
  AppTextField,
  AppTextFieldSX,
  FlexCol,
  FlexRow,
  InfoEditBox,
  InfoEditBoxWithRef,
  LoadingView,
  TicketInfoTitle,
  TicketSectionGrid,
  VisuallyHiddenInput,
  AppTableCell
} from "../../components";
import { InfoChangeType, BOOKING_TYPE, WeekType, initInclude, initTicket, STATUS, QR_GENERATION_TYPE, QrCode, ClosingDate } from "../../types";
import { CreateTicketDto } from "../../dtos";
import { currencySelector } from "../../redux/currency/selector";
import { destinationSelector } from "../../redux/destination/selector";
import { ticketSelector } from "../../redux/ticket/selector";
import {
  createDraftTicketAction,
  createTicketAction,
  fetchOneTicketAction,
  initCreateFlagsAction,
  onQrAction,
  updateTicketAction,
} from "../../redux/ticket/actions";
import { appColors } from "../../theme";
import { AppError, ToastService, uploadFiles } from "../../services";
import { fetchCurrenciesAction } from "../../redux/currency/actions";
import { fetchDestinationsAction } from "../../redux/destination/actions";
import { StringUtil, MomentUtil } from "../../utils";
import * as XLSX from 'xlsx';

const resolver = classValidatorResolver(CreateTicketDto);

export const TicketEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const idVal = new URLSearchParams(location.search).get("id");
  const qrData = useSelector((store: any) => store.qr?.items[0]?.Qr);
  const { main: errorColor } = appColors.error;
  const [files, setImageFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [qrCodesFromExcel, setQrCodesFromExcel] = useState<QrCode[]>([])
  const [removedOldImages, setRemovedOldImages] = useState<string[]>([]);
  const [previewImageIndex, setPreviewImageIndex] = useState(-1);
  const [highlights, setHighlights] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [closingDate, setClosingDate] = useState<ClosingDate[]>([{ startDate: "", endDate: "" }]);
  const [timeSlots, setTimeSlots] = useState<string[]>([""]);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const { items: currencies } = useSelector(currencySelector);
  const { items: destinations } = useSelector(destinationSelector);
  const { items: tickets, isLoading: ticketLoading, isSucceeded, error } = useSelector(ticketSelector);

  const fetchOneTicket = useCallback((id: string) => dispatch(fetchOneTicketAction(id)), [dispatch]);
  const fetchCurrencies = useCallback(() => dispatch(fetchCurrenciesAction()), [dispatch]);
  const fetchDestinations = useCallback(() => dispatch(fetchDestinationsAction()), [dispatch]);
  const createItem = useCallback((data: any) => dispatch(createTicketAction(data)), [dispatch]);
  const onQr = useCallback((id: string, data: any) => dispatch(onQrAction({ id, data })), [dispatch]);
  const createDraftItem = useCallback((data: any) => dispatch(createDraftTicketAction(data)), [dispatch]);
  const updateItem = useCallback((id: string, data: any) => dispatch(updateTicketAction({ id, data })), [dispatch]);
  const initCreateFlags = useCallback(() => dispatch(initCreateFlagsAction()), [dispatch]);
  const emptyMsg = "There is no barcode now";
  
  const editData = useMemo(() => {
    if (idVal && idVal !== "new") {
      let temp = tickets.filter((one) => one.id == idVal)[0];
      const destination = temp.destination?.id ?? destinations[0].id ?? null;
      const currency = temp.currency?.id ?? currencies[0].id ?? null;
      if (!temp.qrCodeGenerationType) {
        temp.qrCodeGenerationType = QR_GENERATION_TYPE.SELF_GENERATION;
      }
      if (temp.highlights?.length) {
        setHighlights(temp.highlights);
      }
      if (temp.instructions?.length) {
        setInstructions(temp.instructions);
      }
      if (temp.closingDate?.length) {
        setClosingDate(temp.closingDate);
      }
      if (temp.timeSlots?.length) {
        setTimeSlots(temp.timeSlots);
      }
      return { ...temp, destination, currency };
    }

    if (destinations.length > 0 && currencies.length > 0) {
      const destination = destinations.length > 0 ? destinations[0].id : "";
      const currency = currencies.length > 0 ? currencies[0].id : "";
      return { ...initTicket, destination, currency };
    }

    return initTicket;
  }, [idVal, tickets, destinations, currencies]);

  const pageTitle = useMemo(() => `${idVal && idVal !== "new" ? "Edit" : "New"} Ticket`, [idVal]);
  const buttonText = useMemo(() => `${idVal && idVal !== "new" ? "Update" : "Save"} Ticket`, [idVal]);

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    watch,
  } = useForm<CreateTicketDto>({ resolver, defaultValues: { ...editData } });

  const { fields: hoursFields } = useFieldArray({ control, name: "openingHours" });

  const {
    fields: includesFields,
    insert: includesInsert,
    remove: includesRemove,
  } = useFieldArray({ control, name: "includes" });

  useEffect(() => {
    idVal && idVal.length > 0 && idVal !== "new" && fetchOneTicket(idVal);
  }, [idVal]);

  useEffect(() => {
    currencies.length === 0 && fetchCurrencies();
  }, [currencies]);

  useEffect(() => {
    destinations.length === 0 && fetchDestinations();
  }, [destinations]);

  useEffect(() => {
    initCreateFlags();
    if (idVal && idVal !== "new") {
      setSelectedImages(editData.images);
    }
  }, [idVal]);

  useEffect(() => {
    if (error) {
      setIsUploading(false);
    }
  }, [error]);

  useEffect(() => {
    if (isUploading && isSucceeded && !ticketLoading) {
      navigate(-1);
      // navigate("/all-tickets");
    }
  }, [isUploading, isSucceeded, ticketLoading]);

  const onAddImage = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImageFiles((imgFiles) => [...imgFiles, event.target.files[0]]);
      const newData = [...selectedImages, URL.createObjectURL(event.target.files[0])];
      setSelectedImages(newData);
      setValue("images", newData);
      setError("images", {});
    }
  };

  const deleteImage = (index: number) => {
    const one = selectedImages[index];
    if (one.startsWith("http")) {
      setRemovedOldImages((list) => [...list, one]);
    }

    let data = [...selectedImages];
    data.splice(index, 1);
    setSelectedImages(data);

    let temp = [...files];
    temp.splice(index, 1);
    setImageFiles(temp);

    setValue("images", data);
  };

  const onAddQRCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;

      const data = new Uint8Array(event.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData:string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (excelData.length) {
        const tempQrdata = excelData.filter(subArray => subArray.length > 0);
        tempQrdata.shift();
        let newQrCodes = tempQrdata?.map(item => ({
          "barcodes": item[0],
          "type": item[1],
          "date": item[2],
          "isUsed": false
        }));
        setQrCodesFromExcel(newQrCodes);
      }

    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(()=>{
    if (editData.id !== "new") {
      onQr(editData.id, qrCodesFromExcel);
    } 
  },[qrCodesFromExcel])

  const onChangeHighLights = (type: InfoChangeType, index: number, value: string = "") => {
    switch (type) {
      case "change":
        const temp = [...highlights];
        temp[index] = value;
        setHighlights(temp);
        setError("highlights", {});
        setValue("highlights", temp);
        break;
      case "add":
        const addedVal = [...highlights.slice(0, index), "", ...highlights.slice(index)];
        setHighlights(addedVal);
        setValue("highlights", addedVal);
        break;
      case "remove":
        const removedVal = [...highlights.slice(0, index), ...highlights.slice(index + 1)];
        setHighlights(removedVal);
        setValue("highlights", removedVal);
        break;
    }
  };

  const onChangeCloseDate = (type: InfoChangeType, index: number, value: string = "", rangeType: string = "") => {
    switch (type) {
      case "change":
        const temp = [...closingDate];
        temp[index] = {
          ...temp[index], // Spread the properties of the object
          [rangeType]: value
        };
        setClosingDate(temp);
        setValue("closingDate", temp);
        break;
      case "add":
        const addedVal = [...closingDate.slice(0, index), { startDate: "", endDate: "" }, ...closingDate.slice(index)] as ClosingDate[];
        setClosingDate(addedVal);
        setValue("closingDate", addedVal);
        break;
      case "remove":
        const removedVal = [...closingDate.slice(0, index), ...closingDate.slice(index + 1)];
        setClosingDate(removedVal);
        setValue("closingDate", removedVal);
        break;
    }
  };

  const onChangeTimeSlots = (type: InfoChangeType, index: number, value: string = "") => {
    switch (type) {
      case "change":
        const temp = [...timeSlots];
        temp[index] = value;
        setTimeSlots(temp);
        setError("timeSlots", {});
        setValue("timeSlots", temp);
        break;
      case "add":
        const addedVal = [...timeSlots.slice(0, index), "", ...timeSlots.slice(index)];
        setTimeSlots(addedVal);
        setValue("timeSlots", addedVal);
        break;
      case "remove":
        const removedVal = [...timeSlots.slice(0, index), ...timeSlots.slice(index + 1)];
        setTimeSlots(removedVal);
        setValue("timeSlots", removedVal);
        break;
    }
  };

  const onChangeInstructions = (type: InfoChangeType, index: number, value: string = "") => {
    switch (type) {
      case "change":
        const temp = [...instructions];
        temp[index] = value;
        setInstructions(temp);
        setError("instructions", {});
        setValue("instructions", temp);
        break;
      case "add":
        const addedVal = [...instructions.slice(0, index), "", ...instructions.slice(index)];
        setInstructions(addedVal);
        setValue("instructions", addedVal);
        break;
      case "remove":
        const removedVal = [...instructions.slice(0, index), ...instructions.slice(index + 1)];
        setInstructions(removedVal);
        setValue("instructions", removedVal);
        break;
    }
  };

  const onSubmit = async (data: any) => {
    delete data["id"];
    const isNew = editData.id === "new";
    setIsUploading(true);
    const highlights = data.highlights.filter((one: string) => one.length > 0);
    const instructions = data.instructions.filter((one: string) => one.length > 0);
    const closingDate = data.closingDate.filter((one: ClosingDate) => one.startDate !== "" && one.endDate !== "");
    const timeSlots = data.timeSlots.filter((one: string) => one.length > 0);

    data.highlights = highlights;
    data.instructions = instructions;
    data.closingDate = closingDate;
    data.timeSlots = timeSlots.sort((a: string, b: string) => MomentUtil.timeToMinutes(a) - MomentUtil.timeToMinutes(b));

    if (data.qrCodeGenerationType === QR_GENERATION_TYPE.UPLOADING_QR_CODE) {
      data.qrCodes = [...qrToDisplay?.usedCodes, ...qrToDisplay?.notUsedCodes];
    }

    if (files.length > 0) {
      try {
        setLoadingMsg(`Uploading ticket ${isNew ? "" : "added "}images...`);

        const folder = StringUtil.replaceSpaceToSymbol(data.title, "-");
        const { urls } = await uploadFiles({ url: "/upload/ticket", files, folder });

        if (isNew) data.images = urls;
        else {
          delete data["_id"];
          delete data["__v"];
          delete data["createdAt"];
          delete data["updatedAt"];

          const oldImages = editData.images.filter((item) => removedOldImages.findIndex((ri) => ri === item) === -1);
          data.images = [...oldImages, ...urls];
          data.removedImages = removedOldImages;
        }
      } catch (error: any) {
        setIsUploading(false);
        ToastService.showErrorMessage(AppError(error).message);
      }
    }

    setLoadingMsg(`${isNew ? "Creating new" : "Updating current"} ticket...`);
    editData.id === "new" ? createItem(data) : updateItem(editData.id, data);
  };

  const saveDraftTicket = async () => {
    const draft = getValues() as any;
    if (draft["title"] == "") {
      setError("title", { message: "Title should not be empty for draft ticket." });
      return;
    } else {
      setError("title", {});
    }
    const highlights = draft.highlights.filter((one: string) => one.length > 0);
    const instructions = draft.instructions.filter((one: string) => one.length > 0);
    const closingDate = draft.closingDate.filter((one: ClosingDate) => one.startDate !== "" && one.endDate !== "");
    const timeSlots = draft.timeSlots.filter((one: string) => one.length > 0);
    draft.highlights = highlights;
    draft.instructions = instructions;
    draft.closingDate = closingDate;
    draft.timeSlots = timeSlots;

    if (draft.qrCodeGenerationType === QR_GENERATION_TYPE.UPLOADING_QR_CODE) {
      draft.qrCodes = [...qrToDisplay?.usedCodes, ...qrToDisplay?.notUsedCodes];
    }

    draft["status"] = STATUS.DRAFT;
    const isNew = editData.id === "new";

    // setIsUploading(true);
    delete draft["id"];
    if (!isNew) {
      delete draft["_id"];
      delete draft["__v"];
      delete draft["createdAt"];
      delete draft["updatedAt"];
    }

    if (files.length > 0) {
      try {
        setLoadingMsg(`Uploading ticket ${isNew ? "" : "added "}images...`);

        const folder = StringUtil.replaceSpaceToSymbol(draft.title, "-");
        const { urls } = await uploadFiles({ url: "/upload/ticket", files, folder });

        if (isNew) draft.images = urls;
        else {
          const oldImages = editData.images.filter((item) => removedOldImages.findIndex((ri) => ri === item) === -1);
          draft.images = [...oldImages, ...urls];
          draft.removedImages = removedOldImages;
        }
      } catch (error: any) {
        setIsUploading(false);
        ToastService.showErrorMessage(AppError(error).message);
      }
    }

    setLoadingMsg(`${isNew ? "Creating new" : "Updating current"} draft ticket...`);
    editData.id === "new" ? createDraftItem(draft) : updateItem(editData.id, draft);
  };

  /** looping closing date rows for adding, removing */
  const ClosingDateRow = useMemo(
    () =>
      closingDate.map((one, dateIndex) => (
        <FlexCol key={dateIndex}>
          <FlexRow sx={{ gap: 0.5 }}>
            <TextField
              type="date"
              // type="datetime-local"
              size="small"
              label=""
              variant="outlined"
              value={one.startDate}
              sx={AppTextFieldSX()}
              {...register(`closingDate.${dateIndex}.startDate`)}
              onChange={(e) => onChangeCloseDate("change", dateIndex, e.target.value as string, "startDate")}
            />
            <Typography sx={{ mt: 0.5, color: "white" }}>-</Typography>
            <TextField
              type="date"
              // type="datetime-local"
              size="small"
              label=""
              variant="outlined"
              value={one.endDate}
              sx={AppTextFieldSX()}
              {...register(`closingDate.${dateIndex}.endDate`)}
              onChange={(e) => onChangeCloseDate("change", dateIndex, e.target.value as string, "endDate")}
            />
            <Box sx={{ gap: 0.5, display: "flex", flexDirection: "row" }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => onChangeCloseDate("remove", dateIndex)}
                disabled={closingDate.length === 1}
              >
                <RemoveIcon sx={{ width: 20, height: 20 }} />
              </Button>
              <Button
                variant="contained"
                color="light"
                size="small"
                onClick={() => onChangeCloseDate("add", dateIndex + 1)}
              >
                <AddIcon sx={{ width: 20, height: 20 }} />
              </Button>
            </Box>
          </FlexRow>

          {errors.openingHours && errors.openingHours[dateIndex] && (
            <FormHelperText sx={{ ml: 0.5, color: errorColor }}>
              {errors.openingHours && errors.openingHours[dateIndex]?.endTime?.message}
            </FormHelperText>
          )}
        </FlexCol>
      )),
    [closingDate, errors]
  );

  const OpenHoursRows = useMemo(
    () =>
      hoursFields.map((one, hourIndex) => (
        <FlexCol key={hourIndex}>
          <FlexRow sx={{ gap: 0.5 }}>
            <Controller
              control={control}
              rules={{ required: true }}
              name={`openingHours.${hourIndex}.isActive`}
              render={({ field: { onChange, ...field } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      color="light"
                      sx={{ p: 0 }}
                      checked={getValues(`openingHours.${hourIndex}.isActive`)}
                      onChange={(e) => setValue(`openingHours.${hourIndex}.isActive`, e.target.checked)}
                      {...field}
                    />
                  }
                  label={WeekType[hourIndex]}
                  sx={{
                    color: "white",
                    width: { xs: 70, sm: 90 },
                    ".MuiTypography-root": { fontSize: { xs: 12, sm: 14 }, ml: 0.5 },
                  }}
                />
              )}
            />
            <TextField
              type="time"
              size="small"
              label=""
              variant="outlined"
              sx={AppTextFieldSX()}
              error={!!errors.openingHours && !!errors.openingHours[hourIndex]?.startTime}
              {...register(`openingHours.${hourIndex}.startTime`)}
            />
            <Typography sx={{ mt: 0.5, color: "white" }}>-</Typography>
            <TextField
              type="time"
              size="small"
              label=""
              variant="outlined"
              sx={AppTextFieldSX()}
              error={!!errors.openingHours && !!errors.openingHours[hourIndex]?.endTime}
              {...register(`openingHours.${hourIndex}.endTime`)}
            />
          </FlexRow>

          {errors.openingHours && errors.openingHours[hourIndex] && (
            <FormHelperText sx={{ ml: 0.5, color: errorColor }}>
              {errors.openingHours && errors.openingHours[hourIndex]?.endTime?.message}
            </FormHelperText>
          )}
        </FlexCol>
      )),
    [hoursFields, errors]
  );

  const IncludeRows = useMemo(
    () =>
      includesFields.map((one, includesIndex) => (
        <FlexCol key={includesIndex}>
          <FlexRow sx={{ gap: 1 }}>
            <FlexCol>
              <Controller
                control={control}
                rules={{ required: true }}
                name={`includes.${includesIndex}.isActive`}
                render={({ field: { onChange, ...field } }) => (
                  <Checkbox
                    size="small"
                    color="light"
                    sx={{ p: 0 }}
                    checked={getValues(`includes.${includesIndex}.isActive`)}
                    onChange={(e) => setValue(`includes.${includesIndex}.isActive`, e.target.checked)}
                    {...field}
                  />
                )}
              />
            </FlexCol>
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label=""
              variant="outlined"
              sx={AppTextFieldSX()}
              error={!!errors.includes && !!errors.includes[includesIndex]?.content}
              defaultValue={getValues(`includes.${includesIndex}.content`)}
              {...register(`includes.${includesIndex}.content`)}
            />
            <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => includesRemove(includesIndex)}
                disabled={includesFields.length === 1}
              >
                <RemoveIcon sx={{ width: 20, height: 20 }} />
              </Button>
              <Button
                variant="contained"
                color="light"
                size="small"
                onClick={() => includesInsert(includesIndex + 1, { ...initInclude })}
              >
                <AddIcon sx={{ width: 20, height: 20 }} />
              </Button>
            </Box>
          </FlexRow>

          {errors.instructions && (
            <FormHelperText sx={{ ml: 3.5, color: errorColor }}>{errors.instructions.root?.message}</FormHelperText>
          )}
        </FlexCol>
      )),
    [includesFields, errors]
  );

  const HighLightsRows = useMemo(
    () =>
      highlights.map((one, highIndex) => (
        <FlexCol key={highIndex}>
          <FlexRow sx={{ gap: 0.5 }}>
            <AppTextField
              multiline
              required
              rows={3}
              value={one}
              onChange={(e) => onChangeHighLights("change", highIndex, e.target.value as string)}
            />
            <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => onChangeHighLights("remove", highIndex)}
                disabled={highlights.length === 1}
              >
                <RemoveIcon sx={{ width: 20, height: 20 }} />
              </Button>
              <Button
                variant="contained"
                color="light"
                size="small"
                onClick={() => onChangeHighLights("add", highIndex + 1)}
              >
                <AddIcon sx={{ width: 20, height: 20 }} />
              </Button>
            </Box>
          </FlexRow>
          {errors.highlights && (
            <FormHelperText sx={{ ml: 0.5, color: errorColor }}>{errors.highlights.message}</FormHelperText>
          )}
        </FlexCol>
      )),
    [highlights, errors]
  );

  const InstructionRows = useMemo(
    () =>
      instructions.map((one, index) => (
        <FlexCol key={index}>
          <FlexRow sx={{ gap: 0.5 }}>
            <AppTextField
              multiline
              rows={3}
              required
              value={one}
              onChange={(e) => onChangeInstructions("change", index, e.target.value as string)}
            />
            <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => onChangeInstructions("remove", index)}
                disabled={instructions.length === 1}
              >
                <RemoveIcon sx={{ width: 20, height: 20 }} />
              </Button>
              <Button
                variant="contained"
                color="light"
                size="small"
                onClick={() => onChangeInstructions("add", index + 1)}
              >
                <AddIcon sx={{ width: 20, height: 20 }} />
              </Button>
            </Box>
          </FlexRow>
          {errors.instructions && (
            <FormHelperText sx={{ ml: 0.5, color: errorColor }}>{errors.instructions.message}</FormHelperText>
          )}
        </FlexCol>
      )),
    [instructions, errors]
  );

  const qrToDisplay = useMemo(
    () => {
      if (idVal && idVal !== "new") {
        let usedCodes:QrCode[] = [];
        let notUsedCodes:QrCode[] = [];
        if (editData?.qrCodes && editData?.qrCodes?.length) {
          editData?.qrCodes.forEach(el => {
            if (el.isUsed) {
              usedCodes.push(el);
            } else {
              notUsedCodes.push(el);
            }
          });
        }
        if (qrData && qrData?.length) {
          notUsedCodes = [...notUsedCodes, ...qrData];
        }

        const temp = {
          usedCodes: usedCodes,
          notUsedCodes: notUsedCodes
        }
        return temp;
      } else {
        return {
          notUsedCodes: qrCodesFromExcel,
          usedCodes: []
        };
      }
    }, [editData, qrData, qrCodesFromExcel]
  );

  const TimeSlotsRows = useMemo(
    () =>
      timeSlots.map((one, timeIndex) => (
        <FlexCol key={timeIndex}>
          <FlexRow sx={{ gap: 0.5 }}>
            <TextField
              type="time"
              size="small"
              label=""
              variant="outlined"
              value={one}
              sx={AppTextFieldSX()}
              error={!!errors.timeSlots && !!errors.timeSlots[timeIndex]}
              {...register(`timeSlots.${timeIndex}`)}
              onChange={(e) => onChangeTimeSlots("change", timeIndex, e.target.value as string)}
            />
            <Box sx={{ gap: 0.5, display: "flex", flexDirection: "row" }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => onChangeTimeSlots("remove", timeIndex)}
                disabled={timeSlots.length === 1}
              >
                <RemoveIcon sx={{ width: 20, height: 20 }} />
              </Button>
              <Button
                variant="contained"
                color="light"
                size="small"
                onClick={() => onChangeTimeSlots("add", timeIndex + 1)}
              >
                <AddIcon sx={{ width: 20, height: 20 }} />
              </Button>
            </Box>
          </FlexRow>
          {errors.timeSlots && (
            <FormHelperText sx={{ ml: 0.5, color: errorColor }}>{errors.timeSlots.message}</FormHelperText>
          )}
        </FlexCol>
      )),
    [timeSlots, errors]
  );

  return (
    <FlexCol sx={{ gap: 2 }}>
      <LoadingView visible={isUploading} message={loadingMsg} />
      {previewImageIndex > -1 && (
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
              views={selectedImages.map((one, index) => ({
                source: one,
                caption: `Ticket image - ${previewImageIndex + 1}`,
                alt: `Ticket image - ${previewImageIndex + 1}`,
                loading: "lazy",
              }))}
            />
          </ImagesModal>
        </ModalGateway>
      )}
      <AppPageTitle
        title={pageTitle}
        rightAction={
          <Button variant="contained" color="light" size="small" sx={{ mr: 1 }} onClick={handleSubmit(onSubmit)}>
            {isSmallScreen ? <SaveIcon sx={{ width: 23, height: 23 }} /> : buttonText}
          </Button>
        }
      />
      <Box component="form" role="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <AppCard sx={{ p: 2, px: { xs: 1, sm: 3 } }}>
          <Grid container spacing={2} columnSpacing={2}>
            <TicketSectionGrid title="Main Information" isTop />
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
              <InfoEditBoxWithRef
                title="Description"
                isRequired
                lineCount={5}
                error={!!errors.description}
                helperText={errors.description?.message}
                {...register("description")}
              />
            </Grid>
            <Grid item xs={6}>
              <InfoEditBoxWithRef
                title={watch("bookingType") === BOOKING_TYPE.AFFILATE_LINK ? "Price" : "Adult Price"}
                isRequired
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                {...register("price", { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl error={!!errors.currency} variant="standard" fullWidth>
                <InfoEditBoxWithRef
                  title="Currency"
                  isRequired
                  isSelect
                  selectItem={
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="currency"
                      render={({ field: { onChange, ...field }, formState, fieldState }) => (
                        <AppSelect
                          onChange={(e) => setValue("currency", e.target.value as string)}
                          sx={{ fontSize: 14 }}
                          {...field}
                        >
                          {currencies
                            .sort((a, b) => (a.name > b.name ? 1 : -1))
                            .map((row) => (
                              <MenuItem key={row.id} value={row.id} sx={{ fontSize: 12 }}>
                                {row.name}({row.symbol})
                              </MenuItem>
                            ))}
                        </AppSelect>
                      )}
                    />
                  }
                />
                <FormHelperText>{errors?.currency?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5} lg={4} xl={3}>
              <FormControl error={!!errors.bookingType} variant="standard" fullWidth>
                <InfoEditBoxWithRef
                  title="Booking Type"
                  isRequired
                  isSelect
                  selectItem={
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="bookingType"
                      defaultValue={editData.bookingType}
                      render={({ field: { onChange, ...field } }) => (
                        <RadioGroup
                          row
                          onChange={(e) => setValue("bookingType", e.target.value as BOOKING_TYPE)}
                          aria-labelledby="info-bookingType-label"
                          sx={{ ml: 2, color: "white" }}
                          {...field}
                        >
                          <FormControlLabel
                            value={BOOKING_TYPE.AFFILATE_LINK}
                            control={<Radio color="light" value={BOOKING_TYPE.AFFILATE_LINK} />}
                            label="Affiliate link"
                          />
                          <FormControlLabel
                            value={BOOKING_TYPE.DIRECTLY}
                            control={<Radio color="light" value={BOOKING_TYPE.DIRECTLY} />}
                            label="Directly"
                          />
                        </RadioGroup>
                      )}
                    />
                  }
                />
                {errors.bookingType && <FormHelperText sx={{ mt: 0 }}>{errors.bookingType.message}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={7} lg={8} xl={9}>
              {watch("bookingType") === BOOKING_TYPE.AFFILATE_LINK && (
                <InfoEditBoxWithRef
                  title="Affiliate link"
                  isRequired
                  type="url"
                  error={!!errors.affiliateLink}
                  helperText={errors.affiliateLink?.message}
                  {...register("affiliateLink")}
                />
              )}

              {watch("bookingType") === BOOKING_TYPE.DIRECTLY && (
                <Grid container spacing={2} columnSpacing={2}>
                  <Grid item xs={4}>
                    <InfoEditBoxWithRef
                      title="Child Price"
                      isRequired
                      type="number"
                      error={!!errors.childPrice}
                      helperText={errors.childPrice?.message}
                      {...register("childPrice", { valueAsNumber: true })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InfoEditBoxWithRef
                      title="Senior Price"
                      isRequired
                      type="number"
                      error={!!errors.seniorPrice}
                      helperText={errors.seniorPrice?.message}
                      {...register("seniorPrice", { valueAsNumber: true })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InfoEditBoxWithRef
                      title="Infant Price"
                      isRequired
                      type="number"
                      error={!!errors.infantPrice}
                      helperText={errors.infantPrice?.message}
                      {...register("infantPrice", { valueAsNumber: true })}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Box
              sx={{
                width: "100%",
                pl: 2,
                pt: 2,
                gap: 0.5,
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "row" },
              }}
            >
              <Grid item xs={12} md={5} lg={4} xl={3}>
                <TicketInfoTitle title="Featured *" />
                <FormControl error={!!errors.isFeatured} variant="standard" fullWidth>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="isFeatured"
                    defaultValue={editData.isFeatured}
                    render={({ field: { onChange, ...field } }) => (
                      <RadioGroup
                        row
                        aria-labelledby="info-featured-label"
                        sx={{ ml: 2, color: "white", justifyContent: { xs: "center", sm: "left" } }}
                        {...field}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio color="light" value={true} onChange={(e) => onChange(true)} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio color="light" value={false} onChange={(e) => onChange(false)} />}
                          label="No"
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.isFeatured && <FormHelperText sx={{ mt: 0 }}>{errors.isFeatured.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={7} lg={8} xl={9}>
                <InfoEditBox
                  title="Destinaion"
                  isRequired
                  isSelect
                  selectItem={
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="destination"
                      render={({ field: { onChange, ...field } }) => (
                        <AppSelect
                          onChange={(e) => setValue("destination", e.target.value as string)}
                          sx={{ "& .MuiSelect-select": { display: "flex", flexDirection: "row", fontSize: 14 } }}
                          {...field}
                        >
                          {destinations
                            .sort((a, b) => (a.name > b.name ? 1 : -1))
                            .map((row) => (
                              <MenuItem key={row.id} value={row.id} sx={{ fontSize: 12 }}>
                                <Avatar
                                  src={row.logo}
                                  variant="square"
                                  sx={{ width: 22, height: 22, marginRight: 1 }}
                                />
                                {row.name}
                              </MenuItem>
                            ))}
                        </AppSelect>
                      )}
                    />
                  }
                />
              </Grid>
            </Box>
            <Grid item xs={12} md={5} lg={4} xl={3}>
              <TicketInfoTitle title="Likely Sell *" />
              <FormControl error={!!errors.isLikelySell} variant="standard" fullWidth>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="isLikelySell"
                  defaultValue={editData.isLikelySell}
                  render={({ field: { onChange, ...field } }) => (
                    <RadioGroup
                      row
                      aria-labelledby="info-isLikelySell-label"
                      sx={{ ml: 2, color: "white", justifyContent: { xs: "center", sm: "left" } }}
                      {...field}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio color="light" value={true} onChange={(e) => onChange(true)} />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio color="light" value={false} onChange={(e) => onChange(false)} />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.isLikelySell && <FormHelperText sx={{ mt: 0 }}>{errors.isLikelySell.message}</FormHelperText>}
              </FormControl>
            </Grid>
            {/* Images */}
            <Grid item xs={12} md={7} lg={8} xl={9} sx={{ display: "flex", flexDirection: "column" }}>
              <FormControl error={!!errors.images} variant="standard">
                <InfoEditBoxWithRef
                  isRequired
                  title="Images"
                  isSelect
                  selectItem={
                    <FlexRow sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                      <Box>
                        <Button
                          component="label"
                          variant="contained"
                          size="small"
                          color="light"
                          startIcon={<CloudUploadIcon />}
                          sx={{ width: "max-content" }}
                        >
                          Upload Photo
                          <VisuallyHiddenInput
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={onAddImage}
                          />
                        </Button>
                      </Box>
                      {selectedImages && (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            ".MuiAvatar-root": {
                              width: { xs: 75, sm: 100 },
                              height: { xs: 45, sm: 60 },
                              borderRadius: "6%",
                            },
                          }}
                        >
                          {selectedImages.map((one, index) => (
                            <Badge
                              key={`image_${index}`}
                              overlap="circular"
                              anchorOrigin={{ vertical: "top", horizontal: "right" }}
                              badgeContent={
                                <DeleteIcon
                                  sx={{ cursor: "pointer", color: "red", width: 20, height: 20 }}
                                  onClick={() => deleteImage(index)}
                                />
                              }
                            >
                              <Avatar
                                src={one}
                                alt="name"
                                sx={{ cursor: "pointer" }}
                                onClick={() => setPreviewImageIndex(index)}
                              />
                            </Badge>
                          ))}
                        </Box>
                      )}
                    </FlexRow>
                  }
                />
                <FormHelperText>{errors.images?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={12} md={6}>
              <TicketInfoTitle title="Closed Date *" />
              <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>{ClosingDateRow}</Box>
            </Grid>
            <Grid item sm={12} md={6}>
              <TicketInfoTitle title="Time Slot *" />
              <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>{TimeSlotsRows}</Box>
            </Grid>

            {watch("bookingType") === BOOKING_TYPE.DIRECTLY && (
              <>
                <TicketSectionGrid title="QR Codes" />
                <Grid item xs={12} md={5} lg={4} xl={3}>
                  <TicketInfoTitle title="QR Code Generation Type *" />
                  <FormControl error={!!errors.qrCodeGenerationType} variant="standard" fullWidth>
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="qrCodeGenerationType"
                      defaultValue={editData.qrCodeGenerationType}
                      render={({ field: { onChange, ...field } }) => (
                        <RadioGroup
                          row
                          aria-labelledby="qr-codes-label"
                          sx={{ ml: 2, color: "white", justifyContent: { xs: "left", sm: "left" } }}
                          {...field}
                        >
                          <FormControlLabel
                            value={QR_GENERATION_TYPE.SELF_GENERATION}
                            control={<Radio color="light" value={QR_GENERATION_TYPE.SELF_GENERATION} onChange={(e) => onChange(QR_GENERATION_TYPE.SELF_GENERATION)} />}
                            label="Self-Generation"
                          />
                          <FormControlLabel
                            value={QR_GENERATION_TYPE.UPLOADING_QR_CODE}
                            control={<Radio color="light" value={QR_GENERATION_TYPE.UPLOADING_QR_CODE} onChange={(e) => onChange(QR_GENERATION_TYPE.UPLOADING_QR_CODE)} />}
                            label="Uploading QR codes"
                          />
                        </RadioGroup>
                      )}
                    />
                    {errors.qrCodeGenerationType && <FormHelperText sx={{ mt: 0 }}>{errors.qrCodeGenerationType.message}</FormHelperText>}
                  </FormControl>
                </Grid>
                {watch("qrCodeGenerationType") === QR_GENERATION_TYPE.UPLOADING_QR_CODE && (
                  <>
                    <Grid item xs={12} md={7} lg={8} xl={9} sx={{ display: "flex", flexDirection: "column" }}>
                      <FormControl error={!!errors.images} variant="standard">
                        <InfoEditBoxWithRef
                          isRequired
                          title="QR Code Images"
                          isSelect
                          selectItem={
                            <FlexRow sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                              <Box>
                                <Button
                                  component="label"
                                  variant="contained"
                                  size="small"
                                  color="light"
                                  startIcon={<CloudUploadIcon />}
                                  sx={{ width: "max-content" }}
                                >
                                  Upload QR Code
                                  <VisuallyHiddenInput
                                    type="file"
                                    accept=".xlsx"
                                    onChange={onAddQRCode}
                                  />
                                </Button>
                              </Box>
                            </FlexRow>
                          }
                        />
                        <FormHelperText>{errors.images?.message}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {watch("qrCodeGenerationType") === QR_GENERATION_TYPE.UPLOADING_QR_CODE && (
                        <>
                          <TicketInfoTitle fontWeight="bold" title={`Used Codes (${qrToDisplay?.usedCodes.length})`} />
                          <TableContainer sx={{ maxHeight: 400 }}>
                            <Table size="small" aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <AppTableCell value="No" isTitle isFirstCell sx={{ width: { xs: 30, sm: 50 } }} />
                                  <AppTableCell value="Barcodes" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                                  <AppTableCell value="Type" isTitle sx={{ width: { sm: 150, md: 200 } }} />
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {qrToDisplay?.usedCodes.length === 0 && (
                                  <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                                    <AppTableCell value={emptyMsg} sx={{ py: 3 }} isTitle align="center" colSpan={8} />
                                  </TableRow>
                                )}
                                {qrToDisplay?.usedCodes.map((row, index) => (
                                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <AppTableCell scope="row" value={index + 1} isFirstCell isVerticalTop />
                                    <AppTableCell value={row.barcodes} isVerticalTop />
                                    <AppTableCell value={row.type} isVerticalTop />
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {watch("qrCodeGenerationType") === QR_GENERATION_TYPE.UPLOADING_QR_CODE && (
                        <>
                          <TicketInfoTitle fontWeight="bold" title={`Not Used Codes (${qrToDisplay?.notUsedCodes.length})`} /> 
                          <TableContainer sx={{ maxHeight: 400 }}>
                            <Table size="small" aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <AppTableCell value="No" isTitle isFirstCell sx={{ width: { xs: 30, sm: 50 } }} />
                                  <AppTableCell value="Barcodes" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                                  <AppTableCell value="Type" isTitle sx={{ width: { sm: 150, md: 200 } }} />
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {qrToDisplay?.notUsedCodes.length === 0 && (
                                  <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                                    <AppTableCell value={emptyMsg} sx={{ py: 3 }} isTitle align="center" colSpan={8} />
                                  </TableRow>
                                )}
                                {qrToDisplay?.notUsedCodes.map((row, index) => (
                                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <AppTableCell scope="row" value={index + 1} isFirstCell isVerticalTop />
                                    <AppTableCell value={row.barcodes} isVerticalTop />
                                    <AppTableCell value={row.type} isVerticalTop />
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </>
                      )}
                    </Grid>
                  </>
                )}
              </>
            )}


            <TicketSectionGrid title="Review Information" />
            <Grid item xs={6} md={2.5} lg={2.25} xl={2}>
              <InfoEditBoxWithRef
                title="Review Marks"
                isRequired
                type="number"
                minValue={0}
                maxValue={5}
                error={!!errors.reviewMark}
                helperText={errors.reviewMark?.message}
                {...register("reviewMark", { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={6} md={2.5} lg={2.25} xl={2}>
              <InfoEditBoxWithRef
                title="Review Count"
                isRequired
                type="number"
                error={!!errors.reviewCount}
                helperText={errors.reviewCount?.message}
                {...register("reviewCount", { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} md={7} lg={7.5} xl={8}>
              <InfoEditBoxWithRef
                title="Review Reference ID"
                isRequired
                error={!!errors.reviewID}
                helperText={errors.reviewID?.message}
                {...register("reviewID")}
              />
            </Grid>

            <TicketSectionGrid title="Ticket Information" />
            <Grid item xs={12}>
              <InfoEditBoxWithRef
                title="Overview"
                isRequired
                lineCount={6}
                error={!!errors.overview}
                helperText={errors.overview?.message}
                {...register("overview")}
              />
            </Grid>
            <Grid item xs={12} xl={6}>
              <TicketInfoTitle title="Highlights *" />
              <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>{HighLightsRows}</Box>
            </Grid>
            <Grid item xs={12} xl={6}>
              <TicketInfoTitle title="Instructions *" />
              <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>{InstructionRows}</Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TicketInfoTitle title="Opening Hours *" />
              <Box sx={{ gap: 1, display: "flex", flexDirection: "column", ml: 3 }}>{OpenHoursRows}</Box>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <FlexCol sx={{ gap: 0.5 }}>
                <TicketInfoTitle title="Includes *" />
                {IncludeRows}
              </FlexCol>
            </Grid>
            <TicketSectionGrid title="How to get there" />
            <Grid item xs={12} sm={6}>
              <InfoEditBoxWithRef
                title="Address"
                isRequired
                error={!!errors.location?.address}
                helperText={errors.location?.address?.message}
                {...register("location.address")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoEditBoxWithRef
                title="Map"
                isRequired
                error={!!errors.location?.link}
                helperText={errors.location?.link?.message}
                {...register("location.link")}
              />
            </Grid>
            <Grid item xs={12}>
              <InfoEditBoxWithRef
                title="Video link for place"
                isRequired
                error={!!errors.videoUrl}
                helperText={errors.videoUrl?.message}
                {...register("videoUrl")}
              />
            </Grid>

            <TicketSectionGrid title="Ticket Status" />
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <TicketInfoTitle title="Show at Home *" />
              <FormControl error={!!errors.isShowHome} variant="standard" fullWidth>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="isShowHome"
                  defaultValue={editData.isShowHome}
                  render={({ field: { onChange, ...field } }) => (
                    <RadioGroup
                      row
                      aria-labelledby="info-isShowHome-label"
                      sx={{ ml: 2, color: "white", justifyContent: { xs: "center", sm: "left" } }}
                      {...field}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio color="light" value={true} onChange={(e) => onChange(true)} />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio color="light" value={false} onChange={(e) => onChange(false)} />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.isFeatured && <FormHelperText sx={{ mt: 0 }}>{errors.isFeatured.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
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
                {errors.isFeatured && <FormHelperText sx={{ mt: 0 }}>{errors.isFeatured.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>

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
            <Button
              variant="contained"
              color="warning"
              size={isSmallScreen ? "small" : "medium"}
              type="button"
              onClick={saveDraftTicket}
              endIcon={<SaveAsIcon sx={{ width: 23, height: 23 }} />}
            >
              Save as Draft
            </Button>
          </FlexRow>
        </AppCard>
      </Box>
    </FlexCol>
  );
};
