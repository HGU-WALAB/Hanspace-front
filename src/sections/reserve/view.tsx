// react
import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// types
import { EXSpaceItem, IReservedItem } from 'src/types/space';
import {
  DailyReserveForm1,
  DailyReserveForm2,
  RegularyReserveForm1,
  RegularyReserveForm2,
} from 'src/types/reserve';
// components
import { useSettingsContext } from 'src/components/settings';
import { userDeptState } from 'src/utils/atom';
import { useRecoilValue } from 'recoil';
// api
import axiosInstance, { endpoints } from 'src/utils/axios';
import { useQuery } from 'react-query';
import { reservedListByDate } from 'src/api/reserveApi';
import { GetSpace } from 'src/api/spaceApi';
import ReserveDailyForm1 from './reserve-daily-form1';

// import ReserveDailyForm2 from './reserve-daily-form2';
import DailySpaceCardList from './reserve-daily-space';
import RegularlySpaceCardList from './reserve-regularly-space';
import ReserveRegularyForm1 from './reserve-regularly-form1';
// import ReserveCSVForm from './reserve-csv';
import DailyReserveFormDialog from './reserve-daily-dialog';
import RegularlyReserveDialog from './reserve-regularly-dialog';

export default function ReserveView() {
  const userDeptValue = useRecoilValue(userDeptState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reserveInfo, setReserveInfo] = useState(null);

  let deptId = 0;
  if (typeof userDeptValue === 'object') {
    ({ deptId } = userDeptValue);
  }
  // space에 따른 예약 정보들 확인
  const { data: spaces } = useQuery<EXSpaceItem[]>(
    ['GetSpace', GetSpace],
    async () => GetSpace(deptId).then((response) => response.data),
    {
      onSuccess: (data) => {
        // Log space IDs within the onSuccess callback
        data.forEach((space) => {
          console.log('GetSpace', space);
          axiosInstance.get(`${endpoints.reserve.schedule}/${space.spaceId}`).then((res) => {
            console.log('예약된 정보 확인 by spaceId', space.spaceId, res.data);
            setReserveInfo(res.data); // 해당 장소에 예약된 정보 리스트들 -> 날짜 선택시 해당 날자에
          });
        });
      },
    }
  );
  // 기관 id와 날짜에 해당하는 예약 정보들 확인
  // ToDo: API 수정 시 정보 받고 예약 수정
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: reserveds } = useQuery<IReservedItem[]>(
    ['reservedListByDate', reservedListByDate],
    async () =>
      reservedListByDate(deptId, selectedDailyData1.reserveDate.toISOString().split('T')[0]).then(
        (response) => response.data
      ),
    {
      onSuccess: (data) => {
        data.forEach((reserved) => {
          console.log('reservedListByDate', reserved);
        });
      },
    }
  );

  const settings = useSettingsContext();
  const [selectedDailyData1, setSelectedDailyData1] = useState({
    reserveDate: new Date(),
    startTime: '',
    endTime: '',
  });
  const [selectedDailyData2, setSelectedDailyData2] = useState({
    reserveDate: new Date(),
    startTime: '',
    endTime: '',
    spaceId: 0,
    spaceName: '',
    spaceImage: '',
  });
  const [selectedRegularyData1, setSelectedRegularyData1] = useState({
    startDate: new Date(),
    endDate: new Date(),
    week: '',
    startTime: '',
    endTime: '',
  });
  const [selectedRegularyData2, setSelectedRegularyData2] = useState({
    startDate: new Date(),
    endDate: new Date(),
    week: '',
    startTime: '',
    endTime: '',
    spaceId: 0,
    spaceName: '',
    spaceImage: '',
  });

  const [selectedValue, setSelectedValue] = useState('daily');

  const handleRadioChange = (data: string) => {
    setSelectedValue(data); // 일일 대여, 정기 대여
  };

  const handleDailyReserveInfo = (data: DailyReserveForm1) => {
    setSelectedDailyData1(data); // 단기 예약 날짜, 시작시간, 종료시간 데이터 정보
  };
  const handleRegularlyReserveInfo = (data: RegularyReserveForm1) => {
    setSelectedRegularyData1(data); // 정기 예약 날짜, 시작시간, 종료시간 데이터 정보
  };

  // modal code
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDailyModalControl = (data: DailyReserveForm2) => {
    // 단기 예약 다이아로그 오픈
    setIsDialogOpen(true);
    setSelectedDailyData2(data); // 예약을 위한 모든 정보 선택
  };

  const handleReguluarlyModalControl = (data: RegularyReserveForm2) => {
    // 정기 예약 다이아로그 오픈
    setIsDialogOpen(true);
    setSelectedRegularyData2(data); // 예약을 위한 모든 정보 선택
  };

  let DailySpaceCradList = null;

  if (spaces) {
    DailySpaceCradList = spaces.reduce((result, space) => {
      const dailySpaceCardList = (
        // 대여 가능한 장소 보여주는 컴포넌트
        <DailySpaceCardList
          space={space} // 장소 하나 정보
          selectedData={selectedDailyData1} // 날짜, 시작 시간, 종료 시간 선택된 정보 전달
          handleModalControl={handleDailyModalControl} // 장소 카드 하단 예약 진행 버튼 -> 다이아로그
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
      {selectedValue === 'daily' && (
        <>
          <ReserveDailyForm1
            handleDailyReserveInfo={handleDailyReserveInfo} // 단기 예약 날짜, 시작시간, 종료시간 정보 선택
            selectedValue={selectedValue} // daily
            handleRadioChange={handleRadioChange}
          />
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            sx={{ mt: 2 }}
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

      {/* 정기 예약일 때 */}
      {selectedValue === 'regularly' && (
        <>
          <ReserveRegularyForm1
            handleRegularlyReserveInfo={handleRegularlyReserveInfo}
            selectedValue={selectedValue}
            handleRadioChange={handleRadioChange}
          />
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            sx={{ mt: 2 }}
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
      {/* ToDo: 추후 csv 작업 예정 */}
      {/* {selectedValue === 'csv' && (
        <ReserveCSVForm selectedValue={selectedValue} handleRadioChange={handleRadioChange} />
      )} */}
    </Container>
  );
}
