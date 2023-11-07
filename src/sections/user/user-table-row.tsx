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
}: Props) {
  const { name, sid, deptName, email, role } = row;

  // const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}

          <ListItemText
            primary={name}
            secondary={sid}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{deptName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (role === '미승인' && 'error') ||
              (role === '관리자' && 'success') ||
              (role === '사용자' && 'secondary') ||
              'default'
            }
          >
            {role}
          </Label>
        </TableCell>

        {role === '미승인' && (
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

        {role !== '미승인' && <div />}

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

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
