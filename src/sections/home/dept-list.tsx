// @mui
import { Box } from '@mui/material';
// types
import { IDeptInfo } from 'src/types/dept';
// components
import DeptCard from './dept-card';

const deptlist: IDeptInfo[] = [
  {
    id: 1,
    name: '전산전자 뉴턴 강의실',
    pplNum: 123,
    spaceNum: 15,
    image: 'https://source.unsplash.com/random',
  },
  {
    id: 2,
    name: '생명과학 랩린실',
    pplNum: 75,
    spaceNum: 8,
    image: 'https://source.unsplash.com/random',
  },
  {
    id: 3,
    name: '화학 임페리알 연구실',
    pplNum: 60,
    spaceNum: 10,
    image: 'https://source.unsplash.com/random',
  },
  {
    id: 4,
    name: '물리학 퀀텀 강의실',
    pplNum: 100,
    image: 'https://source.unsplash.com/random',
    spaceNum: 12,
  },
  {
    id: 5,
    name: '예술 루브르 스튜디오',
    pplNum: 45,
    image: 'https://source.unsplash.com/random',
    spaceNum: 5,
  },
  {
    id: 6,
    name: '문학 플라톤 세미나실',
    pplNum: 50,
    image: 'https://source.unsplash.com/random',
    spaceNum: 7,
  },
  {
    id: 7,
    name: '역사 타임라인 회의실',
    pplNum: 40,
    image: 'https://source.unsplash.com/random',
    spaceNum: 6,
  },
  {
    id: 8,
    name: '사회과학 데카르트 연구실',
    pplNum: 85,
    image: 'https://source.unsplash.com/random',
    spaceNum: 9,
  },
  {
    id: 9,
    name: '심리학 프로이드 강당',
    pplNum: 110,
    image: 'https://source.unsplash.com/random',
    spaceNum: 11,
  },
  {
    id: 10,
    name: '경제 아담스미스 스튜디오',
    pplNum: 95,
    image: 'https://source.unsplash.com/random',
    spaceNum: 14,
  },
];

export default function DeptList() {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
      }}
    >
      {deptlist.map((dept) => (
        <DeptCard key={dept.id} deptInfo={dept} />
      ))}
    </Box>
  );
}
