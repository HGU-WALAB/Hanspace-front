// react
import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// types
import { ISpaceItem } from 'src/types/space';
import { DailyReserveForm, RegularyReserveForm } from 'src/types/reserve';
// components
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
  const [selectedData1, setSelected1Data1] = useState({
    reserveDate: new Date(),
    startTime: '',
    endTime: '',
    headCount: 0,
    spaceId: 0,
  });
  const [selectedData2, setSelected1Data2] = useState({
    startDate: new Date(),
    endDate: new Date(),
    week: '',
    startTime: '',
    endTime: '',
    headCount: 0,
    spaceId: 0,
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

  const handleNextClick1 = (data: DailyReserveForm) => {
    setSelected1Data1(data);
    setCurrentPage1(currentPage1 + 1);
  };
  const handleNextClick2 = (data: RegularyReserveForm) => {
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
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>

    <Box style={{ display: 'flex' }}>
      <Box style={{ display: 'flex', flexWrap: 'wrap', flex: 2.5 }}>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
        {spaces && spaces.map((space: ISpaceItem) => (
          <Box key={space.id}>
            <SpaceCardList space={space} />
          </Box>
        ))}
        </Box>
      </Box>
      <Box style={{ flex: 1 }}>
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
      </Box>
    </Box>
    </Container>
  );

}
