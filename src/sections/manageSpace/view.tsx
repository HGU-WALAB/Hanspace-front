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
    detail: '빔프로젝트 가능',
    availability: true,
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDEyMTdfMTgz%2FMDAxNjA4MTY1OTk0MzAw.iRKIRAcxu0k4h3u8eRDWBEzFO2Yy6sVhbA4Pf-qeiQ4g.A9xDkmp8Jixr4PmAdVDaMIuwcTSJmahxIR86zntj0FMg.JPEG.urbanspace6928%2FKakaoTalk_20201111_132717296_04.jpg&type=sc960_832',
  },
  {
    spaceId: 2,
    id: '2',
    name: '뉴턴홀 112호',
    headCount: 30,
    availableStart: '10:00',
    availableEnd: '17:00',
    detail: '방학 사용 시 학부 사무실로 문의 ',
    availability: true,
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MDJfMjU3%2FMDAxNjU5NDUwOTU5Njc4.fsoSknyQtvWJwmpFym06v8ddvTpjcGAl_OVYwGRtgJQg.Nan5mN5J7KwC6FC1LgExBbNADE25mLilQ5TtOI0yXDcg.JPEG.rudwls100434%2F%25A8%25E7_%25B5%25EE%25BF%25F8_%25C8%25C4_%25B0%25AD%25C0%25C7%25BD%25C7_%25B5%25B5%25C2%25F8.jpg&type=sc960_832',
  },
  {
    spaceId: 3,
    id: '3',
    name: '뉴턴홀 113호',
    headCount: 30,
    availableStart: '10:00',
    availableEnd: '20:00',
    detail: '칠판 3개 있음',
    availability: true,
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTExMTBfMjgg%2FMDAxNjM2NTA4MjkxMTE4.e-FRv0F57q19I2lU2ahfyN44WKHA8FdiqXx1ZlF4TsUg.o98rJTq86Oomvwr53OtZnEUoWn5FOJ1iEhigwUurnH4g.JPEG.schoolsharing0725%2F0c32e324-7c81-4aa8-8e6b-9c6425926b0a.jpg&type=sc960_832',
  },
  {
    spaceId: 4,
    id: '4',
    name: '뉴턴홀 114호',
    headCount: 30,
    availableStart: '13:00',
    availableEnd: '22:00',
    detail: '칠판 3개 있음',
    availability: true,
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5385%2F2023%2F09%2F12%2F0000617859_002_20230912085203612.jpg&type=sc960_832',
  },
  {
    spaceId: 5,
    id: '5',
    name: '뉴턴홀 119호',
    headCount: 30,
    availableStart: '12:00',
    availableEnd: '19:00',
    detail: '방학 사용 시 학부 사무실로 문의 ',
    availability: true,
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODExMDhfMTc0%2FMDAxNTQxNjQzNDY3OTM3.VzMoEi3965SGapi8eJbhJf4Q6h_NCNe0mlKsebIethQg.yO_f9kYZVjRsjJVJ_zb6K9wUYdIWjo-8F1SUYDq0lqIg.JPEG.fursysconsulting%2F1607_%25C7%25D1%25C8%25AD%25C3%25B7%25B4%25DC%25BC%25D2%25C0%25E7_%25B0%25AD%25C0%25C7%25BD%25C7.jpg&type=sc960_832',
  },
  {
    spaceId: 6,
    id: '6',
    name: '뉴턴홀 220호',
    headCount: 30,
    availableStart: '12:00',
    availableEnd: '17:00',
    detail: '방학 사용 시 학부 사무실로 문의 ',
    availability: true,
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMDAzMDNfMTk5%2FMDAxNTgzMjA1MTc0MzIw.Ta90P9jtqoXmAiDpWjOB3T9yFIPm2d1SQd_FSu7R_4sg.xA00bH2Q2jeXJcnMKrfuqpWRlzlKt_OPF3V5v0ZLQysg.JPEG%2FIN1zUfequqRyiE2g8stdQr7q6kLY.jpg&type=sc960_832',
  },
  {
    spaceId: 7,
    id: '7',
    name: '뉴턴홀 221호',
    headCount: 30,
    availableStart: '11:00',
    availableEnd: '21:00',
    detail: '칠판 3개 있음',
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
    detail: '',
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
      <Typography variant="h4"> 장소 관리하기 </Typography>

      <div style={{ margin: '50px', display: 'flex', justifyContent: 'flex-end' }}>
        <SpaceCreateDialog />
      </div>
      <SpaceList spaces={spaces} />
    </Container>
  );
}
