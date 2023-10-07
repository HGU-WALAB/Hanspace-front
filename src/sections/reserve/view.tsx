// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// components
import { useSettingsContext } from 'src/components/settings';
import { CalendarView } from 'src/sections/calendar/view';

// react
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function ReserveView() {
  const settings = useSettingsContext();
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> 대여 가능한 공간 </Typography>
      <Button onClick={toggleCalendar} variant="outlined"> Calendar</Button>
      {showCalendar && <CalendarView />}

      {/* <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      /> */}

    </Container>
  );
}
