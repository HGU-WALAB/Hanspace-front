// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// components
import { useSettingsContext } from 'src/components/settings';
// utils
// ----------------------------------------------------------------------
import UserCalendarView from './calendar/view/user-calendar-view';
import UserTimeLine from './timeline/user-timeline';

// ----------------------------------------------------------------------

export default function UserDashboardView() {
  const settings = useSettingsContext();

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
