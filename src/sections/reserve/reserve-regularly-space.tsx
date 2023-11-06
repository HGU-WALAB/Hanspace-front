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
  handleModalControl: (data: any) => void;
};

export default function RegularlySpaceCardList({ space, selectedData, handleModalControl }: Props) {
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
        p: (theme) => theme.spacing(0, 0, 0, 0),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <Image alt={image} src={image} sx={{ height: 250, width: 1 }} />
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
      {/* {[
        {
          label: `최대 인원 : ${headCount}`,
        },
        {
          label: `세부 사항 : ${detail}`,
        },
      ].map((item) => ( */}
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
        >
          <Typography variant="subtitle1" color="#A6A6A6" sx={{mt: 1, fontSize: '15px'}}>{detail}</Typography>
        </Stack>
      {/* ))} */}
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
      {/* <Typography variant="body1" color="black">이용 가능 시간</Typography> */}
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
    handleModalControl(sendSelectedData);
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
        <div>
            {renderImages}
            <div style={{ padding: '0 16px 0 16px' }}>
              <Typography variant="h6" color="black" sx={{m: 2}}> {space.name}</Typography>
              {renderInfo}
              {renderTimeTable}
              <Button variant="contained" color="primary" 
                onClick={handleNextClick} sx={{ml: 2, mb: 2, mr: 2, width: '95%'}}
                disabled={
                  !selectedData.startDate ||
                  !selectedData.endDate ||
                  !selectedData.week ||
                  !selectedData.startTime ||
                  !selectedData.endTime
                }>
                선택하기
              </Button> 
            </div>
        </div>
    </Card>
    </>
  );
}
