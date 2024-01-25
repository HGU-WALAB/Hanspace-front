// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// types
import { EXSpaceItem } from 'src/types/space';
// components
import Image from 'src/components/image';
import { useEffect, useState } from 'react';
// api
import SpacingGrid from './reserve-time';

// ----------------------------------------------------------------------
interface Props {
  selectedData: {
    reserveDate: Date;
    startTime: string;
    endTime: string;
  };
  reserveList: IReservedItem[]; // 선택된 날짜에 예약된 정보들
  space: EXSpaceItem;
  handleModalControl: (data: any) => void;
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':');
  const totaltime = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  return totaltime;
}

function isStartTimeRangeValid(selectST: number, availST: number, availET: number) {
  let pass = false;

  if (Number.isNaN(selectST)) pass = true;
  else if (selectST >= availST && selectST <= availET) pass = true;
  else pass = false;
  return pass;
}
function isEndTimeRangeValid(
  selectST: number,
  availST: number,
  selectET: number,
  availET: number,
  reserveList: IReservedItem[]
) {
  let pass = true;
  if (Number.isNaN(selectET)) pass = true; // 둘다 숫자가 아닐 때
  else if (selectST >= availST && selectET <= availET) pass = true;
  else pass = false;

  if (reserveList.length !== 0) {
    for (let i = 0; i < reserveList.length; i += 1) {
      if (pass === false) break;
      const reservedST = timeToMinutes(reserveList[i].startTime);
      const reservedET = timeToMinutes(reserveList[i].endTime);

      if (
        (reservedST <= selectST && reservedET <= selectET) ||
        (reservedST <= selectST && selectET <= reservedET) ||
        (selectST <= reservedST && reservedET <= selectET) ||
        (selectST <= reservedST && selectET <= reservedET)
      ) {
        pass = false;
        break;
      } else pass = true;
    }
  }
  return pass;
}

export default function DailySpaceCardList({
  space,
  selectedData,
  reserveList,
  handleModalControl,
}: Props) {
  const { headCount, detail, image } = space;

  const availableStartTime = space.availableStart.toLocaleString();
  const availableEndTime = space.availableEnd.toLocaleString();

  const [selectedStartMinutes, setSelectedStartMinutes] = useState(
    timeToMinutes(selectedData.startTime)
  );
  const [selectedEndMinutes, setSelectedEndMinutes] = useState(timeToMinutes(selectedData.endTime));
  const [availableStartMinutes, setAvailableStartMinutes] = useState(
    timeToMinutes(availableStartTime)
  );
  const [availableEndMinutes, setAvailableEndMinutes] = useState(timeToMinutes(availableEndTime));
  const [isStartTimeWithinRange, setIsStartTimeWithinRange] = useState(true);
  const [isEndimeWithinRange, setIsEndimeWithinRange] = useState(true);

  const reservedList = reserveList;

  useEffect(() => {
    setSelectedStartMinutes(timeToMinutes(selectedData.startTime));
    setSelectedEndMinutes(timeToMinutes(selectedData.endTime));
    setAvailableStartMinutes(timeToMinutes(availableStartTime));
    setAvailableEndMinutes(timeToMinutes(availableEndTime));
    setIsStartTimeWithinRange(
      isStartTimeRangeValid(selectedStartMinutes, availableStartMinutes, availableEndMinutes)
    );
    setIsEndimeWithinRange(
      isEndTimeRangeValid(
        selectedStartMinutes,
        availableStartMinutes,
        selectedEndMinutes,
        availableEndMinutes,
        reservedList
      )
    );
  }, [
    selectedData.startTime,
    selectedData.endTime,
    availableStartTime,
    availableEndTime,
    availableEndMinutes,
    availableStartMinutes,
    headCount,
    selectedEndMinutes,
    selectedStartMinutes,
    reservedList,
  ]);

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <Image alt={image} src={image} sx={{ borderRadius: 1, height: 200, width: 1 }} />
      </Stack>
    </Stack>
  );

  const renderInfo = (
    <Stack
      spacing={2}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 0, 2, 0),
      }}
    >
      <Stack spacing={1} direction="row" alignItems="center">
        <Typography variant="subtitle1" color="#606060" sx={{ mt: 1, fontSize: '14px' }}>
          {detail}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderTimeTable = (
    <Stack
      spacing={3}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 0, 1, 0),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <SpacingGrid availableStart={availableStartTime} availableEnd={availableEndTime} />
      </Stack>
    </Stack>
  );

  const handleNextClick = () => {
    const sendSelectedData = {
      reserveDate: selectedData.reserveDate,
      startTime: selectedData.startTime,
      endTime: selectedData.endTime,
      spaceId: space.spaceId,
      spaceName: space.name,
      spaceImage: space.image,
    };
    handleModalControl(sendSelectedData);
  };

  return (
    <>
      {isStartTimeWithinRange && isEndimeWithinRange ? (
        <div>
          {renderImages}
          <div style={{ padding: '0 16px 0 16px' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6" color="black" sx={{ mt: 2, mb: 1 }}>
                {space.name}
              </Typography>
              <Typography
                variant="body1"
                color="#777777"
                sx={{ mt: 2.8, mb: 1, ml: 1, fontSize: '12px' }}
              >
                | {space.headCount}명 사용가능
              </Typography>
            </div>
            {renderInfo}
            {renderTimeTable}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextClick}
              sx={{ mb: 2, width: 1, height: '50px' }}
              disabled={
                !selectedData.reserveDate || !selectedData.startTime || !selectedData.endTime
              }
            >
              선택하기
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
