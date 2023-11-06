// @mui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
// types
import { IReserveTableFilters, IReserveTableFilterValue } from 'src/types/reserveList';
// components
import Iconify from 'src/components/iconify';
import { shortDateLabel } from 'src/components/custom-date-range-picker';

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IReserveTableFilters;
  onFilters: (name: string, value: IReserveTableFilterValue) => void;
  //
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function ReserveTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  const shortLabel = shortDateLabel(filters.startDate, filters.endDate);

  const handleRemoveStatus = () => {
    onFilters('status', '전체');
  };

  const handleRemoveDate = () => {
    onFilters('startDate', null);
    onFilters('endDate', null);
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          개의 예약 내역을 찾았습니다
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {filters.status !== '전체' && (
          <Block label="상태 :">
            <Chip size="small" label={filters.status} onDelete={handleRemoveStatus} />
          </Block>
        )}

        {filters.startDate && filters.endDate && (
          <Block label="날짜 :">
            <Chip size="small" label={shortLabel} onDelete={handleRemoveDate} />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          취소
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
