// react
import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// components
import { CalendarView } from 'src/sections/calendar/view';
import { useSettingsContext } from 'src/components/settings';
// api
import { GetSpace } from 'src/api/spaceApi';
import { useQuery } from 'react-query';

import ReserveDailyForm1 from './reserve-daily-form1';
import ReserveDailyForm2 from './reserve-daily-form2';
import SpaceCardList from './reserve-space';
import RowRadioButtonsGroup from './reserve-radio';
import ReserveRegularyForm1 from './reserve-regularly-form1';
import ReserveRegularyForm2 from './reserve-regularly-form2';
import ReserveCSVForm from './reserve-csv';


export default function ReserveView() {
  const settings = useSettingsContext();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedData1, setSelected1Data1] = useState({
    reserveDate: null,
    startTime: null,
    endTime: null,
    headCount: null,
    spaceId: null,
  });
  const [selectedData2, setSelected1Data2] = useState({
    startDate: null,
    endDate: null,
    week: null,
    startTime: null,
    endTime: null,
    headCount: null,
    spaceId: null,
  });

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const { data: spaces } = useQuery(
    ['GetSpace', GetSpace],
    () => GetSpace().then((response) => response.data),
    {
      onSuccess: (data) => {
        console.log('GetSpace', data);
      },
    }
  );

  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

  const handleNextClick1 = (data: any) => {
    setSelected1Data1(data);
    setCurrentPage1(currentPage1 + 1);
  };
  const handleNextClick2 = (data: any) => {
    setSelected1Data2(data);
    setCurrentPage2(currentPage2 + 1);
  };
  const goToPrevPage1 = () => {
    setCurrentPage1(currentPage1 - 1);
  };
  const goToPrevPage2 = () => {
    setCurrentPage2(currentPage2 - 1);
  };

  const [selectedValue, setSelectedValue] = useState('daily');

  const handleRadioChange = (newValue: string) => {
    setSelectedValue(newValue); // 선택한 값을 업데이트
  };

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: '30px' }}> 
          Page Reserve 
          <Button onClick={toggleCalendar} variant="outlined"> Calendar</Button>
      </Typography>
      {showCalendar && <CalendarView />}

    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', flex: 2.5 }}>
        {spaces && spaces.map((space: any) => (
          <div key={space.id} style={{ flex: '50%' }}>
            <SpaceCardList space={space} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <RowRadioButtonsGroup selectedValue={selectedValue} onValueChange={handleRadioChange}/>
        {selectedValue === 'daily' && currentPage1 === 1 &&
          <ReserveDailyForm1 onNextClick={handleNextClick1} />
        }
        {selectedValue === 'daily' && currentPage1 === 2 && 
          <ReserveDailyForm2 onPrevClick={goToPrevPage1} selectedData={selectedData1} />
        }
        {selectedValue === 'regularly' && currentPage2 === 1 && 
          <ReserveRegularyForm1 onNextClick={handleNextClick2} />
        }
        {selectedValue === 'regularly' && currentPage2 === 2 && 
          <ReserveRegularyForm2 onPrevClick={goToPrevPage2} selectedData={selectedData2} />
        }
        {selectedValue === 'csv' && 
          <ReserveCSVForm />
        }
      </div>
    </div>
    </>
  );

}
