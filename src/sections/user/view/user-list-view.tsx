import isEqual from 'lodash/isEqual';
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
// routes
// import { useRouter } from 'src/routes/hooks';
// _mock
import { USER_ROLE_OPTIONS } from 'src/_mock';
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
import { IUserItem, IUserTableFilters, IUserTableFilterValue } from 'src/types/user';
//
// import { useQuery } from 'react-query';
// import { GetUser } from 'src/api/userApi';
import { Button, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userDeptState } from 'src/utils/atom';
import axiosInstance, { endpoints } from 'src/utils/axios';
import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
import UserTableFiltersResult from '../user-table-filters-result';

// ----------------------------------------------------------------------

const ROLE_OPTIONS = [{ value: '전체', label: '전체' }, ...USER_ROLE_OPTIONS];

const TABLE_HEAD = [
  { id: 'name', label: '이름', width: 300 },
  { id: 'deptName', label: '학부', width: 300 },
  { id: 'email', label: '이메일', width: 300 },
  { id: 'role', label: '권한', width: 180 },
  { id: 'manage', label: '관리', width: 180 },
  { id: '', width: 100 },
];

const defaultFilters: IUserTableFilters = {
  name: '',
  role: '전체',
};

// ----------------------------------------------------------------------

export default function UserListView() {
  const table = useTable({ defaultOrderBy: 'name' });

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const userDeptInfo = useRecoilValue(userDeptState);
  let deptId = '';
  if (typeof userDeptInfo === 'object') {
    deptId = `${userDeptInfo.deptId}`;
  }

  const [tableData, setTableData] = useState<IUserItem[]>([]);

  const { refetch } = useQuery<IUserItem[]>(['userlist', deptId], async () => {
    try {
      const response = await axiosInstance.get<IUserItem[]>(`${endpoints.user.list}/${deptId}`);
      console.log('member list', response.data);
      setTableData(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: IUserTableFilterValue) => {
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
      const deleteRow = tableData.filter((row) => row.deptMemberId !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleFilterRole = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('role', newValue);
      console.log('newValue', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h5"> 사용자 관리하기 </Typography>
      <div style={{ height: '30px' }} />
      <Card>
        <Tabs
          value={filters.role}
          onChange={handleFilterRole}
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {ROLE_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={
                    ((tab.value === '전체' || tab.value === filters.role) && 'filled') || 'soft'
                  }
                  color={
                    (tab.value === '미승인' && 'error') ||
                    (tab.value === '관리자' && 'success') ||
                    (tab.value === '사용자' && 'secondary') ||
                    'default'
                  }
                >
                  {tab.value === '전체' && tableData.length}
                  {tab.value === '미승인' &&
                    tableData.filter((user) => user.approve === '미승인').length}
                  {tab.value === '관리자' &&
                    tableData.filter((user) => user.deptRole === '관리자').length}
                  {tab.value === '사용자' &&
                    tableData.filter((user) => user.deptRole === '사용자').length}
                  {tab.value === '블랙리스트' &&
                    tableData.filter((user) => user.deptRole === '블랙리스트').length}
                </Label>
              }
            />
          ))}
        </Tabs>

        <UserTableToolbar filters={filters} onFilters={handleFilters} roleOptions={tableData} />

        {canReset && (
          <UserTableFiltersResult
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
                tableData.map((row) => row.deptMemberId)
              )
            }
            action={
              <>
                <Tooltip title="Add">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Button variant="outlined" color="primary">
                      선택 승인
                    </Button>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Button variant="outlined" color="error">
                      선택 삭제
                    </Button>
                  </IconButton>
                </Tooltip>
              </>
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
                    tableData.map((row) => row.deptMemberId)
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
                    <UserTableRow
                      key={row.deptMemberId}
                      row={row}
                      selected={table.selected.includes(row.deptMemberId)}
                      onSelectRow={() => table.onSelectRow(row.deptMemberId)}
                      onDeleteRow={() => handleDeleteRow(row.deptMemberId)}
                      onEditRow={() => handleDeleteRow(row.deptMemberId)}
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
}: {
  inputData: IUserItem[];
  comparator: (a: any, b: any) => number;
  filters: IUserTableFilters;
}) {
  const { name, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.member.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (role !== '전체') {
    inputData = inputData.filter((user) => user.deptRole === role);
  }

  return inputData;
}
