import orderBy from 'lodash/orderBy';
import { useCallback } from 'react';
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
// utils
import { fDateTime } from 'src/utils/format-time';
// types
import { ICalendarFilters, ICalendarFilterValue, ICalendarEvent } from 'src/types/calendar';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ColorPicker } from 'src/components/color-utils';

// ----------------------------------------------------------------------

type Props = {
  //
  filters: ICalendarFilters;
  onFilters: (name: string, value: ICalendarFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
  //
  dateError: boolean;
  //
  open: boolean;
  onClose: VoidFunction;
  //
  events: ICalendarEvent[];
  colorOptions: string[];
  onClickEvent: (eventId: string) => void;
};

export default function CalendarFilters({
  open,
  onClose,
  //
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  dateError,
  //
  events,
  colorOptions,
  onClickEvent,
}: Props) {
  const handleFilterColors = useCallback(
    (newValue: string | string[]) => {
      onFilters('colors', newValue as string[]);
    },
    [onFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue: Date | null) => {
      onFilters('startDate', newValue);
    },
    [onFilters]
  );

  const handleFilterEndDate = useCallback(
    (newValue: Date | null) => {
      onFilters('endDate', newValue);
    },
    [onFilters]
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        필터링
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={onResetFilters}>
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderColors = (
    <Stack spacing={1} sx={{ my: 3, px: 2.5 }}>
      <Typography variant="subtitle2">색상</Typography>
      <ColorPicker
        colors={colorOptions}
        selected={filters.colors}
        onSelectColor={handleFilterColors}
      />
    </Stack>
  );

  const renderDateRange = (
    <Stack spacing={1.5} sx={{ mb: 3, px: 2.5 }}>
      <Typography variant="subtitle2">날짜 범위</Typography>

      <Stack spacing={2}>
        <DatePicker 
          label="시작 날짜" 
          format="yyyy/MM/dd"
          value={filters.startDate} 
          onChange={handleFilterStartDate}
        />

        <DatePicker
          label="끝 날짜"
          format="yyyy/MM/dd"
          value={filters.endDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              error: dateError,
              helperText: dateError && '끝 날짜는 시작 날짜보다 이전일 수 없습니다',
            },
          }}
        />
      </Stack>
    </Stack>
  );

  const renderEvents = (
    <>
      <Typography variant="subtitle2" sx={{ px: 2.5, mb: 1 }}>
        일정 ({events.length})
      </Typography>

      <Scrollbar sx={{ height: 1 }}>
        {orderBy(events, ['end'], ['desc']).map((event) => (
          <ListItemButton
            key={event.id}
            onClick={() => onClickEvent(`${event.id}`)}
            sx={{
              py: 1.5,
              borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Box
              sx={{
                top: 16,
                left: 0,
                width: 0,
                height: 0,
                position: 'absolute',
                borderRight: '10px solid transparent',
                borderTop: `10px solid ${event.color}`,
              }}
            />

            <ListItemText
              disableTypography
              primary={
                <Typography variant="subtitle2" sx={{ fontSize: 13, mt: 0.5 }}>
                  {event.title}
                </Typography>
              }
              secondary={
                <Typography
                  variant="caption"
                  component="div"
                  sx={{ fontSize: 11, color: 'text.disabled' }}
                >
                  {event.allDay ? (
                    fDateTime(event.start, 'yy/MM/dd')
                  ) : (
                    <>
                      {`${fDateTime(event.start, 'yy/MM/dd p')} - ${fDateTime(
                        event.end,
                        'yy/MM/dd p'
                      )}`}
                    </>
                  )}
                </Typography>
              }
              sx={{ display: 'flex', flexDirection: 'column-reverse' }}
            />
          </ListItemButton>
        ))}
      </Scrollbar>
    </>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: { width: '23vw' },
      }}
    >
      {renderHead}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderColors}

      {renderDateRange}

      {renderEvents}
    </Drawer>
  );
}
