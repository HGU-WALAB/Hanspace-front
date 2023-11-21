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
    startDate: Date;
    endDate: Date;
    week: string;
    startTime: string;
    endTime: string;
    // headCount: number,
  };
  space: EXSpaceItem;
  handleModalControl: (data: any) => void;
}

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
      startDate: selectedData.startDate,
      endDate: selectedData.endDate,
      startTime: selectedData.startTime,
      endTime: selectedData.endTime,
      week: selectedData.week,
      // headCount: selectedData.headCount,
      spaceId: space.spaceId,
      spaceName: space.name,
      spaceImage: space.image,
    };
    handleModalControl(sendSelectedData);
  };

  return (
    <Card
      // onClick={() => setIsClicked(!isClicked)}
      // color={isClicked ? 'primary' : 'white'}
      // style={{
      //   display: 'flex', // 가로 방향으로 정렬
      //   justifyContent: 'center', // 가운데 정렬
      //   cursor: 'pointer',
      // }}
    >
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
              !selectedData.startDate ||
              !selectedData.endDate ||
              !selectedData.week ||
              !selectedData.startTime ||
              !selectedData.endTime
            }
          >
            선택하기
          </Button>
        </div>
      </div>
    </Card>
  );
}
