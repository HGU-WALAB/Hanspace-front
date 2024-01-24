// @mui
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { IUserItem } from 'src/types/user';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
//
import styled from 'styled-components';
import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IUserItem;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  refetch: VoidFunction;
};

const Rows = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  refetch,
}: Props) {
  const { member, deptRole, approve } = row;

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            primary={member.name}
            secondary={member.sid}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{member.deptName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{member.email}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (approve === '미승인' && 'error') ||
              (deptRole === '관리자' && 'success') ||
              (deptRole === '사용자' && 'secondary') ||
              'default'
            }
          >
            {deptRole}
          </Label>
        </TableCell>

        {approve === '미승인' && (
          <TableCell>
            <Rows>
              <Button variant="outlined" color="primary">
                승인
              </Button>
              <Button variant="outlined" color="error">
                거절
              </Button>
            </Rows>
          </TableCell>
        )}
        {approve !== '미승인' && <div />}

        {approve !== '미승인' && (
          <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        )}
        {approve === '미승인' && <div />}
      </TableRow>

      <UserQuickEditForm
        currentUser={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        refetch={refetch}
      />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem onClick={quickEdit.onTrue}>
          <Iconify icon="solar:pen-bold" />
          권한 수정
        </MenuItem>
      </CustomPopover>
    </>
  );
}
