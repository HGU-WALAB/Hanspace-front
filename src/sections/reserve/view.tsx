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
import ReserveForm2 from './reserve-form2';

export default function ReserveView() {
  const settings = useSettingsContext();
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" style={{ marginBottom: '30px' }}> 
          Page Reserve 
          <Button onClick={toggleCalendar} variant="outlined"> Calendar</Button>
      </Typography>
      {showCalendar && <CalendarView />}

      {currentPage === 1 && <ReserveForm1 onNextClick = {goToNextPage} />}
      {currentPage === 2 && <ReserveForm2 onPrevClick = {goToPrevPage} />}
    </Container>
    </>
  );
}
