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
import { ISpaceItem } from 'src/types/space';
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
    headCount: number;
  };
  space: ISpaceItem;
  onNextClick: (data: any) => void;
};


function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":");
  const totaltime = parseInt(hours, 10)*60 + parseInt(minutes, 10);
  // console.log(totaltime);
  return totaltime;
}
function isStartTimeRangeValid(st1: number, st2: number ) {
  let pass = false;
  if(Number.isNaN(st1) || Number.isNaN(st2)) pass = true;
  else if (st1 >= st2) pass = true;
  else pass = false;
  return (pass);
}
function isEndTimeRangeValid(st2: number, et1: number, et2: number ) {
  let pass = false;
  if(Number.isNaN(et1) || Number.isNaN(et2)) pass = true;
  else if (et1 >= st2 && et1 <= et2) pass = true;
  else pass = false;
  return (pass);
}
function isHeadCountVaild(hd1: number, hd2: number){
  let pass = false;
  if(Number.isNaN(hd1) || Number.isNaN(hd2) ) pass = true;
  else if (hd1 <= hd2) pass = true;
  else pass = false;
  return pass;
}

export default function DailySpaceCardList({ space, selectedData, onNextClick }: Props) {
  const popover = usePopover();
  const [isClicked, setIsClicked] = useState(false);
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

  const [selectedStartMinutes, setSelectedStartMinutes] = useState(timeToMinutes(selectedData.startTime));
  const [selectedEndMinutes, setSelectedEndMinutes] = useState(timeToMinutes(selectedData.endTime));
  const [availableStartMinutes, setAvailableStartMinutes] = useState(timeToMinutes(availableStartTime));
  const [availableEndMinutes, setAvailableEndMinutes] = useState(timeToMinutes(availableEndTime));
  useEffect(() => {
    setSelectedStartMinutes(timeToMinutes(selectedData.startTime));
    setSelectedEndMinutes(timeToMinutes(selectedData.endTime));
    setAvailableStartMinutes(timeToMinutes(availableStartTime));
    setAvailableEndMinutes(timeToMinutes(availableEndTime));
  }, [selectedData.startTime, selectedData.endTime, availableStartTime, availableEndTime]);

  const isStartTimeWithinRange = isStartTimeRangeValid(selectedStartMinutes, availableStartMinutes);
  const isEndimeWithinRange = isEndTimeRangeValid(availableStartMinutes, selectedEndMinutes, availableEndMinutes);
  const isHeadCountWithRange = isHeadCountVaild(selectedData.headCount, headCount);

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(0, 0, 0, 0),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <Image alt={image} src={image} sx={{ height: 250 }} />
      </Stack>
    </Stack>
  );

  const renderInfo = (
    <Stack
      spacing={2}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 0, 0, 0),
        height: 250,
      }}
    >
      {[
        {
          label: `최대 인원 : ${headCount}`,
        },
        {
          label: `추가 요청 : ${detail}`,
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          alignItems="center"
        >
          <Typography variant="h5" color="black" sx={{m: 2}}>{item.label}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderTimeTable = (
    <Stack
      spacing={3}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 2, 1, 2),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <Typography variant="body1" color="black">이용 가능 시간</Typography>
        <SpacingGrid availableStart={availableStartTime} availableEnd={availableEndTime} />
      </Stack>
    </Stack>
  );

  const handleNextClick = () => {
    const sendSelectedData = {
        reserveDate: selectedData.reserveDate,
        startTime: selectedData.startTime,
        endTime: selectedData.endTime,
        headCount: selectedData.headCount,
        spaceId: space.spaceId,
        spaceName: space.name,
    };
    // console.log('sendSelectedData', sendSelectedData);
    onNextClick(sendSelectedData);
  };

  return (
    <>
    {isStartTimeWithinRange && isEndimeWithinRange && isHeadCountWithRange ? (
    <Card
      onClick={() => setIsClicked(!isClicked)}
      color={isClicked ? 'primary' : 'white'}
      style={{
        display: 'flex', // 가로 방향으로 정렬
        justifyContent: 'center', // 가운데 정렬
        cursor: 'pointer',
      }}
    >
      {isClicked ? (
        <div >
          {renderInfo}
          <Typography variant="h6" color="black" sx={{m: 2}}> {space.name}</Typography>
            {renderTimeTable}
            <Button variant="contained" color="primary" 
              onClick={handleNextClick} sx={{ml: 2, mb: 2, mr: 2, width: '90%'}}
              disabled={
                !selectedData.reserveDate ||
                !selectedData.startTime ||
                !selectedData.endTime ||
                !selectedData.headCount
              }>
              장소선택
            </Button> 
        </div>
      ) : (
        <div>
          {renderImages}
          <Typography variant="h6" color="black" sx={{m: 2}}> {space.name}</Typography>
          {renderTimeTable}
          <Button variant="contained" color="primary" 
            onClick={handleNextClick} sx={{ml: 2, mb: 2, mr: 2, width: '90%'}}
            disabled={
              !selectedData.reserveDate ||
              !selectedData.startTime ||
              !selectedData.endTime ||
              !selectedData.headCount
          }>
            장소선택
          </Button> 
        </div>
      )}
    </Card>) : (
      <></>
    )}
    </>
  );
}
