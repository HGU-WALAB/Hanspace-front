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
const SpaceName = styled.p`
  color: var(--neutral-colors-headings-black, #383838);
  text-align: center;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: 29.065px;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const InfoText = styled.div`
  color: #212121;
  font-family: Pretendard;
  font-size: 13px;
`;

interface Props {
  selectedData: {
    startDate: Date,
    endDate: Date,
    week: string,
    startTime: string,
    endTime: string,
    // headCount: number,
  };
  space: EXSpaceItem;
  onNextClick: (data: any) => void;
};

export default function RegularlySpaceCardList({ space, selectedData, onNextClick }: Props) {
  useEffect(() => {
    // console.log('space data', selectedData);
  }, [selectedData]);
  
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

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 0.5, 0, 0.5),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <Image alt={image} src={image} sx={{ borderRadius: 1, height: 242, width: 1 }} />
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
          label: `세부 사항 : ${detail}`,
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
        startDate: selectedData.startDate,
        endDate: selectedData.endDate,
        startTime: selectedData.startTime,
        endTime: selectedData.endTime,
        week: selectedData.week,
        // headCount: selectedData.headCount,
        spaceId: space.spaceId,
        spaceName: space.name,
    };
    onNextClick(sendSelectedData);
  };

  return (
    <>
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
        <div>
          {renderInfo}
          <Typography variant="h6" color="black" sx={{m: 2}}> {space.name}</Typography>
          {renderTimeTable}
          <Button variant="contained" color="primary" 
            onClick={handleNextClick} sx={{ml: 2, mb: 2, mr: 2, width: '90%'}}
            disabled={
              !selectedData.startDate ||
              !selectedData.endDate ||
              !selectedData.week ||
              !selectedData.startTime ||
              !selectedData.endTime
              // !selectedData.headCount
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
              !selectedData.startDate ||
              !selectedData.endDate ||
              !selectedData.week ||
              !selectedData.startTime ||
              !selectedData.endTime
              // !selectedData.headCount
          }>
            장소선택
          </Button> 
        </div>
      )}
    </Card>
    </>
  );
}
