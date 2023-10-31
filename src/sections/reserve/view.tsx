// react
import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// types
import { ISpaceItem, EXSpaceItem } from 'src/types/space';
import { DailyReserveForm1, DailyReserveForm2, RegularyReserveForm1, RegularyReserveForm2 } from 'src/types/reserve';
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

const spaces: EXSpaceItem[] = [
  {
    spaceId: 1,
    id: '1',
    name: '뉴턴홀 110호',
    headCount: 30,
    availableStart: '10:00',
    availableEnd: '16:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 2,
    id: '2',
    name: '뉴턴홀 112호',
    headCount: 30,
    availableStart: '10:00',
    availableEnd: '17:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 3,
    id: '3',
    name: '뉴턴홀 113호',
    headCount: 30,
    availableStart: '10:00',
    availableEnd: '20:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 4,
    id: '4',
    name: '뉴턴홀 114호',
    headCount: 30,
    availableStart: '13:00',
    availableEnd: '22:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 5,
    id: '5',
    name: '뉴턴홀 119호',
    headCount: 30,
    availableStart: '12:00',
    availableEnd: '19:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 6,
    id: '6',
    name: '뉴턴홀 220호',
    headCount: 30,
    availableStart: '12:00',
    availableEnd: '17:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 7,
    id: '7',
    name: '뉴턴홀 221호',
    headCount: 30,
    availableStart: '11:00',
    availableEnd: '21:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 8,
    id: '8',
    name: '뉴턴홀 222호',
    headCount: 30,
    availableStart: '15:00',
    availableEnd: '23:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
];


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

  // const { data: spaces } = useQuery(
  //   ['GetSpace', GetSpace],
  //   () => GetSpace().then((response) => response.data),
  //   {
  //     onSuccess: (data) => {
  //       console.log('GetSpace', data);
  //     },
  //   }
  // );

  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

  const handleDailyReserveInfo = (data: DailyReserveForm1) => {
    setSelectedDailyData1(data);
  }
  const handleNextClick1 = (data: DailyReserveForm2) => {
    setSelectedDailyData2(data);
    setCurrentPage1(currentPage1 + 1);
  };
  const handleRegularlyReserveInfo = (data: RegularyReserveForm1) => {
    setSelectedRegularyData1(data);
  }
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
        <RowRadioButtonsGroup selectedValue={selectedValue} onValueChange={handleRadioChange}/>
        {selectedValue === 'daily' && currentPage1 === 1 &&
        <>
          <ReserveDailyForm1 handleDailyReserveInfo={handleDailyReserveInfo} />
          <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
          sx={{marginTop: '50px'}}
        >
        {spaces && spaces.map((space: EXSpaceItem) => (
          <Box key={space.id}>
            <DailySpaceCardList space={space} selectedData={selectedDailyData1} onNextClick={handleNextClick1}/>
          </Box>
        ))}
        </Box>
        </>
        }
        {selectedValue === 'daily' && currentPage1 === 2 && 
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <ReserveDaily2 selectedData={selectedDailyData2}/>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <ReserveDailyForm2 onPrevClick={goToPrevPage1} selectedData={selectedDailyData2} />
          </div>
        </div>
        }
        {selectedValue === 'regularly' && currentPage2 === 1 && 
        <>
          <ReserveRegularyForm1 handleRegularlyReserveInfo={handleRegularlyReserveInfo} />
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            sx={{marginTop: '50px'}}
        >
        {spaces && spaces.map((space: EXSpaceItem) => (
          <Box key={space.id}>
            <RegularlySpaceCardList space={space} selectedData={selectedRegularyData1} onNextClick={handleNextClick2}/>
          </Box>
        ))}
        </Box>
      </>
      }
      {selectedValue === 'regularly' && currentPage2 === 2 && 
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <ReserveRegularly2 selectedData={selectedRegularyData2}/>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <ReserveRegularyForm2 onPrevClick={goToPrevPage2} selectedData={selectedRegularyData2} />
          </div>
        </div>
      }
      {selectedValue === 'csv' && 
        <ReserveCSVForm />
      }
    </Container>
  );

}
