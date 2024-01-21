// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// types
import { ISpaceItem, EXSpaceItem } from 'src/types/space';
// components
import { usePopover } from 'src/components/custom-popover';
import Image from 'src/components/image';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
// api
import SpacingGrid from './reserve-time';

// ----------------------------------------------------------------------
interface Props {
  selectedData: {
    reserveDate: Date;
    startTime: string;
    endTime: string;
    // headCount: number;
  };
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
  if (Number.isNaN(selectST) || Number.isNaN(availST)) pass = true;
  else if (selectST >= availST && selectST <= availET) pass = true;
  else pass = false;
  return pass;
}
function isEndTimeRangeValid(selectST: number, availST: number, selectET: number, availET: number) {
  let pass = false;
  if (Number.isNaN(selectET) || Number.isNaN(availET)) pass = true;
  else if (selectST >= availST && selectET >= selectST && selectET <= availET) pass = true;
  else pass = false;
  return pass;
}

export default function DailySpaceCardList({ space, selectedData, handleModalControl }: Props) {
  const {
    id,
    name,
    headCount,
    availableStart,
    availableEnd,
    detail,
    // lableColor,
    availability,
    image,
    // regDate,
    // modDate,
  } = space;

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
  // const [isHeadCountWithRange, setIsHeadCountWithRange] = useState(true);

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
        availableEndMinutes
      )
    );
    // setIsHeadCountWithRange(isHeadCountVaild(selectedData.headCount, headCount));
  }, [
    selectedData.startTime,
    selectedData.endTime,
    availableStartTime,
    availableEndTime,
    availableEndMinutes,
    availableStartMinutes,
    headCount,
    // selectedData.headCount,
    selectedEndMinutes,
    selectedStartMinutes,
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
      // headCount: selectedData.headCount,
      spaceId: space.spaceId,
      spaceName: space.name,
      spaceImage: space.image,
    };
    // console.log('sendSelectedData', sendSelectedData);
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
