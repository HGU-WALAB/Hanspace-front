// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
// types
import { ISpaceItem } from 'src/types/space';
// components
import { usePopover } from 'src/components/custom-popover';
import Image from 'src/components/image';
import styled from 'styled-components';
import { useState } from 'react';
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

type Props = {
  space: ISpaceItem;
};

export default function SpaceCardList({ space }: Props) {
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
        p: (theme) => theme.spacing(0, 4, 3, 4),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <Image alt={image} src={image} sx={{ borderRadius: 0.1, height: 110, width: 1 }} />
      </Stack>
    </Stack>
  );

  const renderInfo = (
    <Stack
      spacing={2}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 4, 5, 4),
        height: 134,
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
          sx={{ typography: 'body1' }}
        >
          <InfoText style={{fontSize: '16px'}}>{item.label}</InfoText>
        </Stack>
      ))}
    </Stack>
  );

  const renderTimeTable = (
    <Stack
      spacing={3}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <InfoText>이용 가능 시간</InfoText>
        <SpacingGrid availableStart={availableStartTime} availableEnd={availableEndTime} />
      </Stack>
    </Stack>
  );

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
          <SpaceName>{space.name}</SpaceName>
          {renderInfo}
          {renderTimeTable}
        </div>
      ) : (
        <div>
          <SpaceName>{space.name}</SpaceName>
          {renderImages}
          {renderTimeTable}
        </div>
      )}
    </Card>
    </>
  );
}
