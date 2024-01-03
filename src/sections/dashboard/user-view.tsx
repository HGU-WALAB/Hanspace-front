// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
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
import UserCalendarView from './calendar/view/user-calendar-view';
import UserTimeLine from './timeline/user-timeline';

// ----------------------------------------------------------------------

export default function UserDashboardView() {
  const settings = useSettingsContext();

  // const rangeCalendarPicker = useDateRangePicker(new Date(), null);
  // const [value, setValue] = useState<Date | null>(new Date());

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={12} md={9}>
          <UserCalendarView />
        </Grid>
        <Grid xs={12} sm={12} md={3}>
          <UserTimeLine />
        </Grid>
      </Grid>
    </Container>
  );
}
