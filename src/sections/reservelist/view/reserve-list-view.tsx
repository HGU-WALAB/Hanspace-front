import { useState, useCallback, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// _mock
import { RESERVE_STATUS_OPTIONS } from 'src/_mock';
// utils
import { fTimestamp } from 'src/utils/format-time';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
// types
import {
  IReserveListItem,
  IReserveTableFilters,
  IReserveTableFilterValue,
} from 'src/types/reserveList';
//
import { Typography } from '@mui/material';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { useRecoilValue } from 'recoil';
import { userDeptState } from 'src/utils/atom';
import { useQuery } from 'react-query';
import ReserveTableRow from '../reserve-table-row';
import ReserveTableToolbar from '../reserve-table-toolbar';
import ReserveTableFiltersResult from '../reserve-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: '전체', label: '전체' }, ...RESERVE_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'no', label: '번호', width: 80 },
  { id: 'space', label: '공간명', width: 100 },
  { id: 'reserveDate', label: '예약일', width: 140 },
  { id: 'reserveTime', label: '예약시간', width: 140 },
  { id: 'modDate', label: '신청일', width: 140 },
  { id: 'name', label: '예약자명', width: 120 },
  { id: 'purpose', label: '목적', width: 140 },
  { id: 'status', label: '상태', width: 110 },
  { id: 'manage', label: '관리', width: 110 },
];

const defaultFilters: IReserveTableFilters = {
  no: '',
  space: '',
  reserveDate: null,
  reserveTime: null,
  modDate: null,
  name: '',
  purpose: '',
  status: '전체',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function ReserveListView() {
  const table = useTable({ defaultOrderBy: 'no' });

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState<IReserveListItem[]>([]);

  const userDeptInfo = useRecoilValue(userDeptState);
  let deptId = '';
  if (typeof userDeptInfo === 'object') {
    deptId = `${userDeptInfo.deptId}`;
  }

  const { data, refetch } = useQuery(['reserveList', deptId], async () => {
    const response = await axiosInstance.get(`${endpoints.reserve.list}/${deptId}`).then((res) => {
      setTableData(res.data);
    });
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [filters, setFilters] = useState(defaultFilters);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset =
    !!filters.name || filters.status !== '전체' || (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: IReserveTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  // const handleDeleteRows = useCallback(() => {
  //   const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
  //   setTableData(deleteRows);

  //   table.onUpdatePageDeleteRows({
  //     totalRows: tableData.length,
  //     totalRowsInPage: dataInPage.length,
  //     totalRowsFiltered: dataFiltered.length,
  //   });
  // }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // const handleViewRow = useCallback(
  //   (id: string) => {
  //     router.push(paths.dashboard.order.details(id));
  //   },
  //   [router]
  // );

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h5"> 예약 내역 보기 </Typography>
      <div style={{ height: '30px' }} />
      <Card>
        <Tabs
          value={filters.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={
                    ((tab.value === '전체' || tab.value === filters.status) && 'filled') || 'soft'
                  }
                  color={
                    (tab.value === '승인' && 'primary') ||
                    (tab.value === '미승인' && 'warning') ||
                    (tab.value === '거절' && 'error') ||
                    'default'
                  }
                >
                  {tab.value === '전체' && tableData.length}
                  {tab.value === '승인' &&
                    tableData.filter((reserve) => reserve.status === '승인').length}

                  {tab.value === '미승인' &&
                    tableData.filter((reserve) => reserve.status === '미승인').length}
                  {tab.value === '거절' &&
                    tableData.filter((reserve) => reserve.status === '거절').length}
                  {tab.value === '자동취소' &&
                    tableData.filter((reserve) => reserve.status === '자동취소').length}
                </Label>
              }
            />
          ))}
        </Tabs>

        <ReserveTableToolbar
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
        />

        {canReset && (
          <ReserveTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            //
            onResetFilters={handleResetFilters}
            //
            results={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ReserveTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onViewRow={() => handleDeleteRow(row.id)}
                      refetch={refetch}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          //
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
  dateError,
}: {
  inputData: IReserveListItem[];
  comparator: (a: any, b: any) => number;
  filters: IReserveTableFilters;
  dateError: boolean;
}) {
  const {
    no,
    space,
    reserveDate,
    reserveTime,
    modDate,
    name,
    purpose,
    status,
    startDate,
    endDate,
  } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (order) =>
        order.id.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.createMemberName.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== '전체') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (order) =>
          fTimestamp(order.modDate) >= fTimestamp(startDate) &&
          fTimestamp(order.modDate) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
