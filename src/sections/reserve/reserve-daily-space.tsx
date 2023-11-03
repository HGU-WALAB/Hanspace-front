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
};


function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":");
  const totaltime = parseInt(hours, 10)*60 + parseInt(minutes, 10);
  return totaltime;
}
function isStartTimeRangeValid(selectST: number, availST: number, availET: number) {
  let pass = false;
  if(Number.isNaN(selectST) || Number.isNaN(availST)) pass = true;
  else if (selectST >= availST && selectST <= availET) pass = true;
  else pass = false; 
  return (pass);
}
function isEndTimeRangeValid(selectST: number, availST: number, selectET: number, availET: number ) {
  let pass = false;
  if(Number.isNaN(selectET) || Number.isNaN(availET)) pass = true;
  else if (selectST >= availST && selectET >= selectST && selectET <= availET) pass = true;
  else pass = false;
  return (pass);
}
// function isHeadCountVaild(selectHC: number, availHC: number){
//   let pass = false;
//   if(Number.isNaN(selectHC) || Number.isNaN(availHC) ) pass = true;
//   else if (selectHC <= availHC) pass = true;
//   else pass = false;
//   return pass;
// }

export default function DailySpaceCardList({ space, selectedData, handleModalControl }: Props) {
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
  const [isStartTimeWithinRange, setIsStartTimeWithinRange] = useState(true);
  const [isEndimeWithinRange, setIsEndimeWithinRange] = useState(true);
  // const [isHeadCountWithRange, setIsHeadCountWithRange] = useState(true);

  useEffect(() => {
    setSelectedStartMinutes(timeToMinutes(selectedData.startTime));
    setSelectedEndMinutes(timeToMinutes(selectedData.endTime));
    setAvailableStartMinutes(timeToMinutes(availableStartTime));
    setAvailableEndMinutes(timeToMinutes(availableEndTime));
    setIsStartTimeWithinRange(isStartTimeRangeValid(selectedStartMinutes, availableStartMinutes, availableEndMinutes));
    setIsEndimeWithinRange(isEndTimeRangeValid(selectedStartMinutes, availableStartMinutes, selectedEndMinutes, availableEndMinutes));
    // setIsHeadCountWithRange(isHeadCountVaild(selectedData.headCount, headCount));
  }, [  selectedData.startTime,
    selectedData.endTime,
    availableStartTime,
    availableEndTime,
    availableEndMinutes,
    availableStartMinutes,
    headCount,
    // selectedData.headCount,
    selectedEndMinutes,
    selectedStartMinutes,]);

  const renderImages = ( 
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 0.5, 0, 0.5),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <Image alt={image} src={image} sx={{ borderRadius: 1, height: 250, width: 1 }} />
      </Stack>
    </Stack>
  );

  const renderInfo = (
    <Stack
      spacing={2}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(5, 0, 0, 0),
        height: 250,
      }}
    >
    <Typography variant="h6" color="black">{space.name} 장소의 추가 정보</Typography>
      {[
        {
          label: `최대 인원 : ${headCount}`,
        },
        {
          label: `세부 사항 : ${detail}`,
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          alignItems="center"
        >
          <Typography variant="subtitle1" color="black" sx={{mt: 2}}>{item.label}</Typography>
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
      // headCount: selectedData.headCount,
      spaceId: space.spaceId,
      spaceName: space.name,
    };
    // console.log('sendSelectedData', sendSelectedData);
    handleModalControl(sendSelectedData);
  };

  return (
    <>
    {isStartTimeWithinRange  && isEndimeWithinRange  ? (
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
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 1,
            bgcolor: '#F4F4F4',
            height: '250px',
            mt: 1,
          }}>
            {renderInfo}
          </Box>
          <Typography variant="h6" color="black" sx={{m: 2}}> {space.name}</Typography>
            {renderTimeTable}
            <Button variant="contained" color="primary" 
              onClick={handleNextClick} sx={{ml: 2, mb: 2, mr: 2, width: '95%'}}
              disabled={
                !selectedData.reserveDate ||
                !selectedData.startTime ||
                !selectedData.endTime
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
            onClick={handleNextClick} sx={{ml: 2, mb: 2, mr: 2, width: '95%'}}
            disabled={
              !selectedData.reserveDate ||
              !selectedData.startTime ||
              !selectedData.endTime
            }>
            장소선택
          </Button> 
        </div>
      )}
    </Card>
    ) : null }
    </>
  );
}
