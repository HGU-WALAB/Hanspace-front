// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// types
import { ISpaceItem } from 'src/types/space';
// components
import { usePopover } from 'src/components/custom-popover';
import Image from 'src/components/image';
import styled from 'styled-components';
import { useState } from 'react';

import SpacingGrid from './reserve-time';


// ----------------------------------------------------------------------
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12.637px;
  border: 0.632px solid #F2F1FA;
  background: #F2F1FA;
  width: 371px;
  height: 385px;
  cursor: pointer;

  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`;
const SpaceName = styled.p`
  color: var(--neutral-colors-headings-black, #5D5A88);
  text-align: center;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: 29.065px;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const TimeBox = styled.div`

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


  return (
    <>
    <Card
      onClick={() => setIsClicked(!isClicked)}
      style={{ background: isClicked ? 'white' : '#F2F1FA' }}
    >
      {isClicked ? (
        <div>
          <SpaceName>{space.name}</SpaceName>
          <p>참가 인원: {space.headCount}</p>
          <p>추가 요청: {space.detail}</p>
          <p>이용 가능 시간 {space.availableStart.toLocaleString()} {space.availableEnd.toLocaleString()}</p>
          <SpacingGrid />
        </div>
      ) : (
        <div>
          <SpaceName>{space.name}</SpaceName>
          <Image alt={image} src={image} sx={{ height: 130, width: 280}} />
          <p>이용 가능 시간 {space.availableStart.toLocaleString()} {space.availableEnd.toLocaleString()}</p>
          <SpacingGrid />
        </div>
      )}
    </Card>
    </>
  );
}
