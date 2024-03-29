import { format } from 'date-fns';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { IReserveListItem } from 'src/types/reserveList';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import styled from 'styled-components';
import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

type Props = {
  row: IReserveListItem;
  selected: boolean;
  onViewRow: VoidFunction;
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

export default function ReserveTableRow({
  row,
  selected,
  onViewRow,
  onSelectRow,
  onDeleteRow,
  refetch,
}: Props) {
  const { id, space, reserveDate, modDate, startTime, endTime, createMemberName, purpose, status } =
    row;

  const confirm = useBoolean();

  // const collapse = useBoolean();

  const popover = usePopover();

  const handleApprove = () => {
    axiosInstance
      .patch(`${endpoints.reserve.edit}/${id}`, {
        status: '승인',
      })
      .then(() => {
        refetch();
      });
  };

  const handleReject = () => {
    axiosInstance
      .patch(`${endpoints.reserve.edit}/${id}`, {
        status: '거절',
      })
      .then(() => {
        refetch();
      });
  };

  const handleDelete = () => {
    axiosInstance.delete(`${endpoints.reserve.delete}/${id}`).then(() => {
      refetch();
    });
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>
        <Box
          onClick={onViewRow}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {id}
        </Box>
      </TableCell>

      <TableCell>
        <ListItemText
          primary={space.name}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={format(new Date(reserveDate), 'yyyy / MM / dd')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={`${startTime} - ${endTime}`}
          primaryTypographyProps={{ variant: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            variant: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={format(new Date(modDate), 'yyyy / MM / dd')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={createMemberName}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={purpose}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (status === '승인' && 'success') ||
            (status === '미승인' && 'warning') ||
            (status === '거절' && 'error') ||
            'default'
          }
        >
          {status}
        </Label>
      </TableCell>

      {status === '미승인' && (
        <TableCell sx={{ paddingRight: '30px' }}>
          <Rows>
            <Button variant="outlined" color="primary" onClick={handleApprove}>
              승인
            </Button>
            <Button variant="outlined" color="error" onClick={handleReject}>
              거절
            </Button>
          </Rows>
        </TableCell>
      )}

      {status === '승인' && (
        <TableCell sx={{ paddingRight: '30px' }}>
          <Rows>
            <div />
            <Button variant="outlined" style={{ color: 'gray' }} onClick={handleReject}>
              취소
            </Button>
          </Rows>
        </TableCell>
      )}

      {status === '거절' && (
        <TableCell sx={{ paddingRight: '30px' }}>
          <Rows>
            <div />
            <Button variant="outlined" style={{ color: 'gray' }} onClick={handleDelete}>
              삭제
            </Button>
          </Rows>
        </TableCell>
      )}
    </TableRow>
  );

  // const renderSecondary = (
  //   <TableRow>
  //     <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
  //       <Collapse
  //         in={collapse.value}
  //         timeout="auto"
  //         unmountOnExit
  //         sx={{ bgcolor: 'background.neutral' }}
  //       >
  //         {/* <Stack component={Paper} sx={{ m: 1.5 }}>
  //           {items.map((item) => (
  //             <Stack
  //               key={item.id}
  //               direction="row"
  //               alignItems="center"
  //               sx={{
  //                 p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
  //                 '&:not(:last-of-type)': {
  //                   borderBottom: (theme) => `solid 2px ${theme.palette.background.neutral}`,
  //                 },
  //               }}
  //             >
  //               <Avatar
  //                 src={item.coverUrl}
  //                 variant="rounded"
  //                 sx={{ width: 48, height: 48, mr: 2 }}
  //               />

  //               <ListItemText
  //                 primary={item.name}
  //                 secondary={item.sku}
  //                 primaryTypographyProps={{
  //                   typography: 'body2',
  //                 }}
  //                 secondaryTypographyProps={{
  //                   component: 'span',
  //                   color: 'text.disabled',
  //                   mt: 0.5,
  //                 }}
  //               />

  //               <Box>x{item.quantity}</Box>

  //               <Box sx={{ width: 110, textAlign: 'right' }}>{fCurrency(item.price)}</Box>
  //             </Stack>
  //           ))}
  //         </Stack> */}
  //       </Collapse>
  //     </TableCell>
  //   </TableRow>
  // );

  return (
    <>
      {renderPrimary}

      {/* {renderSecondary} */}

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
