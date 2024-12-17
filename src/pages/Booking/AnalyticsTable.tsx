import React, { useEffect, ReactNode, forwardRef } from 'react';
import { visuallyHidden } from '@mui/utils';

import {
    Box,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Theme,
    Typography,
    useMediaQuery
} from "@mui/material";

import DatePicker from "react-datepicker";
import {createPortal} from 'react-dom';

import "react-datepicker/dist/react-datepicker.css";

import { AppCard, AppPageTitle, AppTableCell, AppTextFieldSX, FlexRow } from "../../components";
import { Booking } from "../../types/Booking";

interface Data {
    ticketId: string;
    ticketTitle: string;
    adultCount: number;
    childCount: number;
    seniorCount: number;
    infantCount: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'ticketId',
        numeric: false,
        disablePadding: true,
        label: 'Ticket ID',
    },
    {
        id: 'ticketTitle',
        numeric: false,
        disablePadding: false,
        label: 'Ticket Title',
    },
    {
        id: 'adultCount',
        numeric: true,
        disablePadding: false,
        label: 'Adult',
    },
    {
        id: 'childCount',
        numeric: true,
        disablePadding: false,
        label: 'Child',
    },
    {
        id: 'seniorCount',
        numeric: true,
        disablePadding: false,
        label: 'Senior',
    },
    {
        id: 'infantCount',
        numeric: true,
        disablePadding: false,
        label: 'Infant',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            color: "white",
                            p: 1,
                            textTransform: "uppercase",
                            fontSize: 12,
                            fontWeight: "bold"
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface CustomInputProps {
    value?: string;
    onClick?: () => void;
}

const DatepickerCustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(({ value, onClick }, ref: any) => (
    <TextField
        ref={ref}
        size="small"
        label=""
        variant="outlined"
        sx={AppTextFieldSX()}
        value={value}
        onClick={onClick}
    />
));

type Props = {
    items: Booking[];
};

export const AnalyticsTable = ({
    items
}: Props) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('adultCount');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [dateRange, setDateRange] = React.useState([null, null]);
    const [startDate, endDate] = dateRange;

    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

    const filteredTableData: any = Object.values(
        items
            .filter(({ bookingDate }) => {
                const booking = new Date(bookingDate);
    
                // Handle null startDate and endDate
                const start = startDate ? new Date(startDate) : null;
                let end: Date | null = endDate ? new Date(endDate) : null;
    
                // If endDate is not null, set it to the last moment of the day
                if (end) {
                    end.setHours(23, 59, 59, 999);
                }
    
                // Filter conditions
                if (start && end) {
                    return booking >= start && booking <= end;
                } else if (start) {
                    return booking >= start;
                } else if (end) {
                    return booking <= end;
                } else {
                    return true; // No date filtering if both startDate and endDate are null
                }
            })
            .reduce((acc, { ticketId, ticketTitle, adultCount, childCount, seniorCount, infantCount }) => {
                if (!acc[ticketId]) {
                    acc[ticketId] = { ticketId, ticketTitle, adultCount: 0, childCount: 0, seniorCount: 0, infantCount: 0 };
                }
    
                acc[ticketId].adultCount += adultCount;
                acc[ticketId].childCount += childCount;
                acc[ticketId].seniorCount += seniorCount;
                acc[ticketId].infantCount += infantCount;
                return acc;
            }, {} as any)
    );
    
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredTableData.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(filteredTableData, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, filteredTableData],
    );

    return (
        <Box sx={{ width: '100%', gap: 2, mt: 0, display: "flex", flexDirection: "column" }}>
            <AppPageTitle
                title={"Ticket counts"}
                sx={{ pr: 3 }}
                rightAction={
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update: any) => {
                            setDateRange(update);
                        }}
                        isClearable={true}
                        popperContainer={({children}: { children: ReactNode }) => createPortal(children,document.body)}
                        customInput={<DatepickerCustomInput />}
                    />
                }
            />
            <AppCard sx={{ p: { xs: 1.5, sm: 2 }, pb: { xs: 2, sm: 3 }, borderRadius: 1 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => (
                                <TableRow
                                    key={row.ticketId}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <AppTableCell value={row.ticketId} isVerticalTop align="left" />
                                    <AppTableCell value={row.ticketTitle} isVerticalTop align="left" />
                                    <AppTableCell value={row.adultCount} isVerticalTop align="right" />
                                    <AppTableCell value={row.childCount} isVerticalTop align="right" />
                                    <AppTableCell value={row.seniorCount} isVerticalTop align="right" />
                                    <AppTableCell value={row.infantCount} isVerticalTop align="right" />
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredTableData.length}
                    page={page}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage={isSmallScreen ? "Rows/page:" : "Rows per page:"}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        mb: { xs: 4, sm: 0 },
                        color: "white",
                        ".MuiSvgIcon-root": { fill: "white !important" },
                        ".Mui-disabled .MuiSvgIcon-root": { fill: "#00000050 !important" },
                    }}
                    showFirstButton={!isSmallScreen}
                    showLastButton={!isSmallScreen}
                />
            </AppCard>
        </Box>
    );
}
