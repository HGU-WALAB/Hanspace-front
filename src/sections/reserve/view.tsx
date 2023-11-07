// react
import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// types
import { ISpaceItem, EXSpaceItem } from 'src/types/space';
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
// import ReserveDailyForm2 from './reserve-daily-form2';
import DailySpaceCardList from './reserve-daily-space';
import RegularlySpaceCardList from './reserve-regularly-space';
import RowRadioButtonsGroup from './reserve-radio';
import ReserveRegularyForm1 from './reserve-regularly-form1';
import ReserveCSVForm from './reserve-csv';
import DailyReserveFormDialog from './reserve-daily-dialog';
import RegularlyReserveDialog from './reserve-regularly-dialog';

const spaces: EXSpaceItem[] = [
  {
    spaceId: 1,
    id: '1',
    name: '뉴턴홀 110호',
    headCount: 30,
    availableStart: '10:00',
    availableEnd: '16:00',
    detail: '빔 프로젝트 있음',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 2,
    id: '2',
    name: '뉴턴홀 112호',
    headCount: 20,
    availableStart: '10:00',
    availableEnd: '17:00',
    detail: 'TV있음',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 3,
    id: '3',
    name: '뉴턴홀 113호',
    headCount: 50,
    availableStart: '10:00',
    availableEnd: '20:00',
    detail: '의자 없음',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 4,
    id: '4',
    name: '뉴턴홀 114호',
    headCount: 10,
    availableStart: '13:00',
    availableEnd: '22:00',
    detail: '책상 없음',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 5,
    id: '5',
    name: '뉴턴홀 119호',
    headCount: 80,
    availableStart: '12:00',
    availableEnd: '19:00',
    detail: '모니터 있음',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 6,
    id: '6',
    name: '뉴턴홀 220호',
    headCount: 100,
    availableStart: '12:00',
    availableEnd: '17:00',
    detail: '학생 사용 불가능',
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
    detail: '회의실 전용',
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
    detail: '와이파이 안됨',
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
    // headCount: 0,
  });
  const [selectedDailyData2, setSelectedDailyData2] = useState({
    reserveDate: new Date(),
    startTime: '',
    endTime: '',
    // headCount: 0,
    spaceId: 0,
    spaceName: '',
  });
  const [selectedRegularyData1, setSelectedRegularyData1] = useState({
    startDate: new Date(),
    endDate: new Date(),
    week: '',
    startTime: '',
    endTime: '',
    // headCount: 0,
  });
  const [selectedRegularyData2, setSelectedRegularyData2] = useState({
    startDate: new Date(),
    endDate: new Date(),
    week: '',
    startTime: '',
    endTime: '',
    // headCount: 0,
    spaceId: 0,
    spaceName: '',
  });

  // space 정보들 API
  // const { data: spaces } = useQuery(
  //   ['GetSpace', GetSpace],
  //   () => GetSpace().then((response) => response.data),
  //   {
  //     onSuccess: (data) => {
  //       console.log('GetSpace', data);
  //     },
  //   }
  // );

  const handleDailyReserveInfo = (data: DailyReserveForm1) => {
    setSelectedDailyData1(data);
  };
  const handleRegularlyReserveInfo = (data: RegularyReserveForm1) => {
    setSelectedRegularyData1(data);
  };

  // modal code
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDailyModalControl = (data: DailyReserveForm2) => {
    setIsDialogOpen(true);
    setSelectedDailyData2(data);
  };

  const handleReguluarlyModalControl = (data: RegularyReserveForm2) => {
    setIsDialogOpen(true);
    setSelectedRegularyData2(data);
  };

  const [selectedValue, setSelectedValue] = useState('daily');

  const handleRadioChange = (newValue: string) => {
    setSelectedValue(newValue); // 선택한 값을 업데이트
  };

  let DailySpaceCradList = null;

  if (spaces) {
    DailySpaceCradList = spaces.reduce((result, space) => {
      const dailySpaceCardList = (
        <DailySpaceCardList
          space={space}
          selectedData={selectedDailyData1}
          handleModalControl={handleDailyModalControl}
        />
      );
      if (dailySpaceCardList !== null) {
        result.push(<>{dailySpaceCardList}</>);
      }
      return result;
    }, [] as JSX.Element[]);
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <RowRadioButtonsGroup selectedValue={selectedValue} onValueChange={handleRadioChange} />
      {selectedValue === 'daily' && (
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
            sx={{ marginTop: '50px' }}
          >
            {DailySpaceCradList}
            <DailyReserveFormDialog
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              selectedData={selectedDailyData2}
            />
          </Box>
        </>
      )}
      {selectedValue === 'regularly' && (
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
            sx={{ marginTop: '50px' }}
          >
            {spaces &&
              spaces.map((space: EXSpaceItem) => (
                <Box key={space.id}>
                  <RegularlySpaceCardList
                    space={space}
                    selectedData={selectedRegularyData1}
                    handleModalControl={handleReguluarlyModalControl}
                  />
                </Box>
              ))}
            <RegularlyReserveDialog
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              selectedData={selectedRegularyData2}
            />
          </Box>
        </>
      )}
      {selectedValue === 'csv' && <ReserveCSVForm />}
    </Container>
  );
}
