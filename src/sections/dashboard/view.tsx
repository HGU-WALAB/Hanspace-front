// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { Rating } from '@mui/lab';
// @mui
// ims
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CustomDateRangePicker, { useDateRangePicker } from 'src/components/custom-date-range-picker';
// utils
import { fDate } from 'src/utils/format-time';
// ----------------------------------------------------------------------

import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const settings = useSettingsContext();

  const rangeCalendarPicker = useDateRangePicker(new Date(), null);
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Dashboard </Typography>
      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {/* <DemoItem label="Responsive variant" component="DateRangePicker"> */}

        {/* <ComponentBlock title="Calendar"> */}
        <Button variant="contained" onClick={rangeCalendarPicker.onOpen}>
          Click me!
        </Button>

        <Stack sx={{ typography: 'body2', mt: 3 }}>
          <div>
            <strong>Start:</strong> {fDate(rangeCalendarPicker.startDate)}
          </div>
          <div>
            <strong>End:</strong> {fDate(rangeCalendarPicker.endDate)}
          </div>
        </Stack>

        <CustomDateRangePicker
          variant="calendar"
          open={rangeCalendarPicker.open}
          startDate={rangeCalendarPicker.startDate}
          endDate={rangeCalendarPicker.endDate}
          onChangeStartDate={rangeCalendarPicker.onChangeStartDate}
          onChangeEndDate={rangeCalendarPicker.onChangeEndDate}
          onClose={rangeCalendarPicker.onClose}
          error={rangeCalendarPicker.error}
        />
        {/* </ComponentBlock> */}
        <Rating />

        <DesktopTimePicker
          ampm={false}
          label="For desktop"
          value={value}
          minutesStep={30} // 30분 단위로 설정
          views={['hours', 'minutes']}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
            },
          }}
        />

        {/* </DemoItem> */}
      </Box>
    </Container>
  );
}
