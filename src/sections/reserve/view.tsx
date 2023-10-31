// react
import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// types
import { ISpaceItem } from 'src/types/space';
import {
  DailyReserveForm1,
  DailyReserveForm2,
  RegularyReserveForm1,
  RegularyReserveForm2,
} from 'src/types/reserve';
// components
import { useSettingsContext } from 'src/components/settings';
// api
import { GetSpace } from 'src/api/spaceApi';
import { useQuery } from 'react-query';
import ReserveDailyForm1 from './reserve-daily-form1';
import ReserveDailyForm2 from './reserve-daily-form2';
import DailySpaceCardList from './reserve-daily-space';
import RegularlySpaceCardList from './reserve-regularly-space';
import RowRadioButtonsGroup from './reserve-radio';
import ReserveRegularyForm1 from './reserve-regularly-form1';
import ReserveRegularyForm2 from './reserve-regularly-form2';
import ReserveCSVForm from './reserve-csv';
import ReserveDaily2 from './reserve-daily2';
import ReserveRegularly2 from './reserve-regularly2';

export default function ReserveView() {
  const settings = useSettingsContext();
  const [selectedDailyData1, setSelectedDailyData1] = useState({
    reserveDate: new Date(),
    startTime: '',
    endTime: '',
    headCount: 0,
  });
  const [selectedDailyData2, setSelectedDailyData2] = useState({
    reserveDate: new Date(),
    startTime: '',
    endTime: '',
    headCount: 0,
    spaceId: 0,
    spaceName: '',
  });
  const [selectedRegularyData1, setSelectedRegularyData1] = useState({
    startDate: new Date(),
    endDate: new Date(),
    week: '',
    startTime: '',
    endTime: '',
    headCount: 0,
  });
  const [selectedRegularyData2, setSelectedRegularyData2] = useState({
    startDate: new Date(),
    endDate: new Date(),
    week: '',
    startTime: '',
    endTime: '',
    headCount: 0,
    spaceId: 0,
    spaceName: '',
  });

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

  const handleDailyReserveInfo = (data: DailyReserveForm1) => {
    setSelectedDailyData1(data);
  };
  const handleNextClick1 = (data: DailyReserveForm2) => {
    setSelectedDailyData2(data);
    setCurrentPage1(currentPage1 + 1);
  };
  const handleRegularlyReserveInfo = (data: RegularyReserveForm1) => {
    setSelectedRegularyData1(data);
  };
  const handleNextClick2 = (data: RegularyReserveForm2) => {
    setSelectedRegularyData2(data);
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
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <RowRadioButtonsGroup selectedValue={selectedValue} onValueChange={handleRadioChange} />
      {selectedValue === 'daily' && currentPage1 === 1 && (
        <>
          <ReserveDailyForm1 handleDailyReserveInfo={handleDailyReserveInfo} />
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(4, 1fr)',
              md: 'repeat(4, 1fr)',
            }}
            sx={{ marginTop: '50px' }}
          >
            {spaces &&
              spaces.map((space: ISpaceItem) => (
                <Box key={space.id}>
                  <DailySpaceCardList
                    space={space}
                    selectedData={selectedDailyData1}
                    onNextClick={handleNextClick1}
                  />
                </Box>
              ))}
          </Box>
        </>
      )}
      {selectedValue === 'daily' && currentPage1 === 2 && (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <ReserveDaily2 selectedData={selectedDailyData2} />
          </div>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <ReserveDailyForm2 onPrevClick={goToPrevPage1} selectedData={selectedDailyData2} />
          </div>
        </div>
      )}
      {selectedValue === 'regularly' && currentPage2 === 1 && (
        <>
          <ReserveRegularyForm1 handleRegularlyReserveInfo={handleRegularlyReserveInfo} />
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(4, 1fr)',
              md: 'repeat(4, 1fr)',
            }}
            sx={{ marginTop: '50px' }}
          >
            {spaces &&
              spaces.map((space: ISpaceItem) => (
                <Box key={space.id}>
                  <RegularlySpaceCardList
                    space={space}
                    selectedData={selectedRegularyData1}
                    onNextClick={handleNextClick2}
                  />
                </Box>
              ))}
          </Box>
        </>
      )}
      {selectedValue === 'regularly' && currentPage2 === 2 && (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <ReserveRegularly2 selectedData={selectedRegularyData2} />
          </div>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <ReserveRegularyForm2
              onPrevClick={goToPrevPage2}
              selectedData={selectedRegularyData2}
            />
          </div>
        </div>
      )}
      {selectedValue === 'csv' && <ReserveCSVForm />}
    </Container>
  );
}
