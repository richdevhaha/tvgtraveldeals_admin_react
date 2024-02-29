import { useState } from "react";
import {
  Box,
  Button,
  Chip,
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
  FlexCol,
  FlexRow,
  InfoEditBox,
} from "../../components";
import { AdminUserItem } from "../../types";
import { PERMISSIONS, adminUserRowsTemp } from "../../config";

export const AdminUsers = () => {
  const initValue = { id: "0", name: "", permissions: [""], status: false };
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editData, setEditData] = useState<AdminUserItem>(initValue);
  const [permissions, setPermissions] = useState<string[]>([]);

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const confirmDeleteItem = (data: AdminUserItem) => {
    setEditData(data);
    setIsDelete(true);
  };

  const openNew = () => {
    setEditData(initValue);
    setIsEdit(true);
  };

  const openEdit = (data: AdminUserItem) => {
    setEditData(data);
    setIsEdit(true);
  };

  const closeEditWin = () => {
    setIsEdit(false);
    setIsDelete(false);
    setEditData(initValue);
  };

  const saveData = () => {
    closeEditWin();
  };

  const onChnage = (value: string | string[] | boolean, key: keyof AdminUserItem) => {
    let data = { ...editData };
    if (key === "name") data[key] = value as string;
    else if (key === "permissions") data[key] = value as string[];
    else if (key === "status") data[key] = value as boolean;
    setEditData(data);
  };

  const handleChangeStatus = (event: any) => {
    // setEditData(event.target.value as string);
    onChnage(Boolean(event.target.value as string), "status");
  };

  // const handleChangePermission = (event: SelectChangeEvent<typeof permissions>) => {
  const handleChangePermission = (event: any) => {
    const { value } = event.target;
    setPermissions(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box sx={{ gap: 1, mt: 0, display: "flex", flexDirection: "column" }}>
      <ConfirmModal
        open={isDelete}
        title="Confirm Delete"
        description={`Would you like to delete admin user "${editData?.name}"?`}
        onConfirm={() => alert("test")}
        onClose={closeEditWin}
      />

      <AppPageTitle
        title="Admin Users"
        rightAction={
          <Button variant="contained" color="light" size="small" onClick={openNew}>
            {isSmallScreen ? <AddIcon sx={{ width: 23, height: 23 }} /> : "New Admin"}
          </Button>
        }
      />
      <Collapse in={isEdit}>
        <AppCard sx={{ pt: { xs: 2, sm: 3 }, px: { xs: 3, sm: 4 }, pb: { xs: 3, sm: 3 }, flexDirection: "column" }}>
          <FlexRow sx={{ justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" color="white" fontWeight="bold" sx={{ fontSize: 18 }}>
              {editData.id === "0" ? "New" : "Edit"} Admin user
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
            <Grid item xs={6}>
              <InfoEditBox title="Admin Name" value={editData.name} onChange={(value) => onChnage(value, "name")} />
            </Grid>
            <Grid item xs={6}>
              <InfoEditBox
                title="Permistions"
                value={editData.status ? 1 : 0}
                isSelect
                selectItem={
                  <AppSelect value={permissions} multiple onChange={handleChangePermission}>
                    {/* {Object.keys(ADMIN_ENDPOINT)
                      .filter((v) => isNaN(Number(v)))
                      .map((key, index) => (
                        <MenuItem key={index} value={key}>
                          {ADMIN_ENDPOINT[key as keyof typeof ADMIN_ENDPOINT]}
                        </MenuItem>
                      ))} */}

                    {PERMISSIONS.map((one, index) => (
                      <MenuItem key={index} value={index}>
                        {one.label}
                      </MenuItem>
                    ))}
                  </AppSelect>
                }
                onChange={(value) => onChnage(value, "permissions")}
              />
            </Grid>
            <Grid item xs={6}>
              <InfoEditBox
                title="Status"
                value={editData.status ? 1 : 0}
                isSelect
                selectItem={
                  <AppSelect value={editData.status ? 1 : 0} onChange={handleChangeStatus}>
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={0}>Inactive</MenuItem>
                  </AppSelect>
                }
                onChange={(value) => onChnage(value, "status")}
              />
            </Grid>
          </Grid>
          <FlexCol sx={{ mt: 3, justifyContent: { xs: "center", sm: "center", md: "end" }, flexDirection: "unset" }}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={saveData}
              endIcon={<SaveIcon />}
              sx={{ lineHeight: "100%", px: 2 }}
            >
              {editData.id === "0" ? "Save" : "Update"}
            </Button>
          </FlexCol>
        </AppCard>
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
                <AppTableCell value="User Name" isTitle sx={{ width: { xs: 80, sm: 130 } }} />
                <AppTableCell value="Permistions" isTitle />
                <AppTableCell value="Status" isTitle sx={{ width: 120 }} />
                <AppTableCell value="Action" isTitle align="center" sx={{ width: { sm: 110, md: 150 } }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {adminUserRowsTemp.map((row, index) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <AppTableCell scope="row" value={index + 1} isFirstCell />
                  <AppTableCell value={row.fullName} />
                  <AppTableCell value={row.permissions.join(", ")} />
                  <AppTableCell>
                    <Chip
                      label={row.status ? "Active" : "Inactive"}
                      variant="outlined"
                      color={row.status ? "info" : "error"}
                    />
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
