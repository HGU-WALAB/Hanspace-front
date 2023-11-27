// @mui
import { alpha, useTheme } from '@mui/material/styles';
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
import { Link } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import styled from 'styled-components';
import AnalyticsWidgetSummary from './analytics-widget-summary';
// import AdminCalendarView from './calendar/view/admin-calendar-view';

// ----------------------------------------------------------------------

export default function AdminDashboardView() {
  const settings = useSettingsContext();
  const theme = useTheme();

  const rangeCalendarPicker = useDateRangePicker(new Date(), null);
  const [value, setValue] = useState<Date | null>(new Date());

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${theme.palette.text.primary};

    &:hover {
      color: ${theme.palette.text.primary};
    }
  `;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* <Typography variant="h4"> Dashboard </Typography> */}
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        대시보드
      </Typography>

      {/* 분석 카드 4개 */}
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <StyledLink to={paths.dept.reservelist('CSEE')}>
            <AnalyticsWidgetSummary
              title="미승인 예약"
              total={210}
              color="primary"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_check.png" />}
            />
          </StyledLink>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <StyledLink to={paths.dept.reservelist('CSEE')}>
            <AnalyticsWidgetSummary
              title="미승인 대기 유저"
              total={13}
              color="secondary"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </StyledLink>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <StyledLink to={paths.dept.reservelist('CSEE')}>
            <AnalyticsWidgetSummary
              title="오늘 예정된 예약"
              total={17}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </StyledLink>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <StyledLink to={paths.dept.reservelist('CSEE')}>
            <AnalyticsWidgetSummary
              title="전체 예약"
              total={234}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            />
          </StyledLink>
        </Grid>

        {/* 2번째  */}
        <Grid xs={12} md={12} lg={12}>
          {/* <AdminCalendarView /> */}
        </Grid>
      </Grid>

      {/* </DemoItem> */}
      {/* </Box> */}
    </Container>
  );
}
