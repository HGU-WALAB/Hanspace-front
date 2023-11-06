// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ISpaceItem, EXSpaceItem } from 'src/types/space';
// components
import { useSettingsContext } from 'src/components/settings';
import { applyFilter } from 'src/layouts/_common/searchbar/utils';
import { GetSpace } from 'src/api/spaceApi';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import SpaceCreateDialog from './space-create-dialog';
//
import SpaceList from './space-list';


const spaces: EXSpaceItem[] = [
  {
    spaceId: 1,
    id: '1',
    name: '뉴턴홀 110호',
    headCount: 30,
    availableStart: '10:00',
    availableEnd: '16:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 2,
    id: '2',
    name: '뉴턴홀 112호',
    headCount: 30,
    availableStart: '10:00',
    availableEnd: '17:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 3,
    id: '3',
    name: '뉴턴홀 113호',
    headCount: 30,
    availableStart: '10:00',
    availableEnd: '20:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 4,
    id: '4',
    name: '뉴턴홀 114호',
    headCount: 30,
    availableStart: '13:00',
    availableEnd: '22:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 5,
    id: '5',
    name: '뉴턴홀 119호',
    headCount: 30,
    availableStart: '12:00',
    availableEnd: '19:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 6,
    id: '6',
    name: '뉴턴홀 220호',
    headCount: 30,
    availableStart: '12:00',
    availableEnd: '17:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 7,
    id: '7',
    name: '뉴턴홀 221호',
    headCount: 30,
    availableStart: '11:00',
    availableEnd: '21:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
  {
    spaceId: 8,
    id: '8',
    name: '뉴턴홀 222호',
    headCount: 30,
    availableStart: '15:00',
    availableEnd: '23:00',
    detail: '전화번호, 이메일',
    availability: true,
    image: 'https://source.unsplash.com/random',
  },
];
// ----------------------------------------------------------------------

export default function ManageSpaceView() {
  const settings = useSettingsContext();

  // const { data: spaces } = useQuery(
  //   ['GetSpace', GetSpace],
  //   () => GetSpace().then((response) => response.data),
  //   {
  //     onSuccess: (data) => {
  //       console.log('GetSpace', data);
  //     },
  //   }
  // );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> 장소 관리 </Typography>

      <div style={{ margin: '50px', display: 'flex', justifyContent: 'flex-end' }}>
        <SpaceCreateDialog />
      </div>
      <SpaceList spaces={spaces} />
    </Container>
  );
}
