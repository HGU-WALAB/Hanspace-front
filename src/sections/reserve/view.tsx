// react
import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// components
import { CalendarView } from 'src/sections/calendar/view';
import { useSettingsContext } from 'src/components/settings';

import ReserveForm1 from './reserve-form1';


export default function ReserveView() {
  const settings = useSettingsContext();
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <>
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" style={{ marginBottom: '30px' }}> 
          Page Reserve 
          <Button onClick={toggleCalendar} variant="outlined"> Calendar</Button>
      </Typography>
      {showCalendar && <CalendarView />}

    <ReserveForm1 />
    </Container>
     </>
  );
}
