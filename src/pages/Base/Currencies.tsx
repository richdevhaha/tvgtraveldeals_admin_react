import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  MenuItem,
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
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import {
  AppCard,
  AppPageTitle,
  AppSelect,
  AppTableCell,
  ConfirmModal,
  CurrencyRowSkeleton,
  FlexCol,
  FlexRow,
  InfoEditBoxWithRef,
  LoadingViewInComponent,
} from "../../components";
import { CurrencyDto } from "../../dtos";
import { currencySelector } from "../../redux/currency/selector";
import {
  createCurrencyAction,
  deleteCurrencyAction,
  fetchCurrenciesAction,
  updateCurrencyAction,
} from "../../redux/currency/actions";
import { Currency, initCurrencyValue, STATUS } from "../../types";
import { Formatter, StringUtil } from "../../utils";

export const currencyData = [
  { id: "id1", name: "Ringgit", symbol: "RM", country: "Malaysian Ringgit", rate: 1, status: true },
  { id: "id2", name: "AUD", symbol: "A$", country: "Australian Dollar", rate: 0.33, status: false },
  { id: "id3", name: "GBP", symbol: "£", country: "British Pound", rate: 0.17, status: true },
  { id: "id4", name: "CAD", symbol: "CA$", country: "Canadian Dollar", rate: 0.29, status: false },
  { id: "id5", name: "EUR", symbol: "€", country: "Euro", rate: 0.2, status: true },
  { id: "id6", name: "USD", symbol: "$", country: "United States Dollar", rate: 0.21, status: true },
];

const resolver = classValidatorResolver(CurrencyDto);

export const Currencies = () => {
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editData, setEditData] = useState<Currency>(initCurrencyValue);

  const { items, isLoading, isSucceeded } = useSelector(currencySelector);

  const fetchData = useCallback(() => dispatch(fetchCurrenciesAction()), [dispatch]);
  const createItem = useCallback((data: any) => dispatch(createCurrencyAction(data)), [dispatch]);
  const updateItem = useCallback((id: string, data: any) => dispatch(updateCurrencyAction({ id, data })), [dispatch]);
  const deleteItem = useCallback((id: string) => dispatch(deleteCurrencyAction(id)), [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    !isLoading && isSucceeded && closeEditWin();
  }, [isLoading, isSucceeded]);

  const confirmDeleteItem = (data: Currency) => {
    setEditData(data);
    setIsDelete(true);
  };

  const openNew = () => {
    setEditData(initCurrencyValue);
    setIsEdit(true);
  };

  const openEdit = (data: Currency) => {
    setIsEdit(false);
    setEditData(data);
    setIsEdit(true);
  };

  const closeEditWin = () => {
    setIsEdit(false);
    setIsDelete(false);
    setEditData(initCurrencyValue);
  };

  const onSubmit = (data: any) => {
    delete data["id"];
    editData.id === "new" ? createItem(data) : updateItem(editData.id, data);
  };

  const {
    reset,
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CurrencyDto>({ resolver, defaultValues: { ...editData } });

  useEffect(() => {
    setTimeout(() => reset(editData), 100);
  }, [reset, editData]);

  return (
    <Box sx={{ gap: 1, mt: 0, display: "flex", flexDirection: "column" }}>
      <ConfirmModal
        open={isDelete}
        title="Confirm Delete"
        description={`Would you like to delete currency "${editData?.name}(${editData?.symbol})"?`}
        onConfirm={() => deleteItem(editData.id)}
        onClose={closeEditWin}
      >
        <LoadingViewInComponent visible={isLoading} sx={{ backgroundColor: "#00000080" }} />
      </ConfirmModal>

      <AppPageTitle
        title="Currencies"
        rightAction={
          <Button variant="contained" color="light" size="small" onClick={openNew}>
            {isSmallScreen ? <AddIcon sx={{ width: 23, height: 23 }} /> : "New Currency"}
          </Button>
        }
      />
      <Collapse in={isEdit}>
        <Box component="form" role="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <AppCard sx={{ pt: { xs: 2, sm: 3 }, px: { xs: 3, sm: 4 }, pb: { xs: 3, sm: 3 }, flexDirection: "column" }}>
            <FlexRow sx={{ justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6" color="white" fontWeight="bold" sx={{ fontSize: 18 }}>
                {editData.id === "0" ? "New" : "Edit"} Currency
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
            <Grid container spacing={2} sx={{ px: { xs: 0, sm: 0 } }}>
              <Grid item xs={12} sm={6} lg={4}>
                <InfoEditBoxWithRef
                  title="Currency Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register("name")}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <InfoEditBoxWithRef
                  title="Symbol"
                  error={!!errors.symbol}
                  helperText={errors.symbol?.message}
                  {...register("symbol")}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <InfoEditBoxWithRef
                  title="Currency Country"
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  {...register("country")}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <InfoEditBoxWithRef
                  isRequired
                  title="Currency Rate"
                  type="number"
                  error={!!errors.rate}
                  helperText={errors.rate?.message}
                  {...register("rate", { valueAsNumber: true })}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <InfoEditBoxWithRef
                  title="Status"
                  isSelect
                  selectItem={
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="status"
                      defaultValue={editData.status}
                      render={({ field: { onChange, ...field }, formState, fieldState }) => (
                        <AppSelect onChange={(e) => setValue("status", e.target.value as STATUS)} {...field}>
                          <MenuItem value={STATUS.ACTIVE}>Active</MenuItem>
                          <MenuItem value={STATUS.INACTIVE}>Inactive</MenuItem>
                        </AppSelect>
                      )}
                    />
                  }
                />
              </Grid>
            </Grid>
            <FlexCol sx={{ mt: 3, justifyContent: { xs: "center", sm: "center", md: "end" }, flexDirection: "unset" }}>
              <Button
                variant="contained"
                color="light"
                size="medium"
                type="submit"
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress color="primary" size={20} /> : <SaveIcon />}
                sx={{ lineHeight: "100%", px: 2 }}
              >
                {editData.id === "new" ? "Save" : "Update"}
              </Button>
            </FlexCol>
          </AppCard>
        </Box>
      </Collapse>
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
                <AppTableCell value="Currency Name" isTitle sx={{ width: { xs: 80, sm: 130 } }} />
                <AppTableCell value="Symbol" isTitle sx={{ width: { xs: 80, sm: 100 } }} />
                <AppTableCell value="Country" isTitle />
                <AppTableCell value="Rate" isTitle align="right" />
                <AppTableCell value="Status" isTitle align="center" />
                <AppTableCell value="Action" isTitle align="center" sx={{ width: { sm: 110, md: 150 } }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading &&
                items.length === 0 &&
                Formatter.nArray(5).map((index) => <CurrencyRowSkeleton key={index} />)}
              {!isLoading && items.length === 0 && (
                <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                  <AppTableCell value="There is no currencies now" sx={{ py: 3 }} isTitle align="center" colSpan={7} />
                </TableRow>
              )}
              {items.map((row, index) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <AppTableCell scope="row" value={index + 1} isFirstCell />
                  <AppTableCell value={row.name} />
                  <AppTableCell value={row.symbol} />
                  <AppTableCell value={row.country} />
                  <AppTableCell align="right" value={row.rate} />
                  <AppTableCell align="right">
                    <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
                      <Chip
                        label={StringUtil.capitalizeFLetter(row.status)}
                        variant="outlined"
                        color={row.status === "active" ? "info" : "error"}
                        sx={{ height: 28 }}
                      />
                    </Box>
                  </AppTableCell>
                  <AppTableCell
                    align="center"
                    sx={{
                      alignContent: "center",
                      alignItems: "center",
                      flexGrow: 1,
                      flex: 1,
                      "& div": { justifyContent: "center" },
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => openEdit(row)}
                    >
                      {isSmallScreen ? <EditIcon sx={{ width: 20, height: 20 }} /> : "Edit"}
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={() => confirmDeleteItem(row)}>
                      {isSmallScreen ? <DeleteIcon sx={{ width: 20, height: 20 }} /> : "Delete"}
                    </Button>
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
