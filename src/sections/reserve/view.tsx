// react
import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// types
import { EXSpaceItem } from 'src/types/space';
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

  // const [datad, setData] = useState(null);

  let deptId = 0;
  if (typeof userDeptValue === 'object') {
    ({ deptId } = userDeptValue);
  }

  const { data: spaces } = useQuery<EXSpaceItem[]>(
    ['GetSpace', GetSpace],
    async () => GetSpace(deptId).then((response) => response.data),
    {
      onSuccess: (data) => {
        // Log space IDs within the onSuccess callback
        data.forEach((space) => {
          console.log('GetSpace', space);
          console.log('GetSpace', space.spaceId);
          const datas = axiosInstance
            .get(`${endpoints.reserve.schedule}/${space.spaceId}`)
            .then((res) => {
              console.log(res.data);
            });
        });
      },
    }
  );

  // const { data: reserves } = useQuery<EXSpaceItem[]>(
  //   ['GetReserve', GetReserve],
  //   () => GetReserve(deptId).then((response) => response.data),
  //   {
  //     onSuccess: (data) => {
  //       // Log space IDs within the onSuccess callback
  //       data.forEach((space) => {
  //         console.log('GetSpace', space);
  //         console.log('GetSpace', space.spaceId);
  //       });
  //     },
  //   }
  // );

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
    setSelectedValue(data); // 선택한 값을 업데이트
  };

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
      {selectedValue === 'daily' && (
        <>
          <ReserveDailyForm1
            handleDailyReserveInfo={handleDailyReserveInfo}
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
