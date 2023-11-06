// @mui
import Masonry from '@mui/lab/Masonry';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
//
import ComponentBlock from './component-block';

// ----------------------------------------------------------------------

type TimelineType = {
  key: number;
  title: string;
  des: string;
  time: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'inherit' | 'grey' | 'secondary';
  icon: React.ReactElement;
};

const TIMELINES: TimelineType[] = [
  {
    key: 1,
    title: 'Default',
    des: 'Morbi mattis ullamcorper',
    time: '09:30 am',
    icon: <Iconify icon="eva:folder-add-fill" width={24} />,
  },
  {
    key: 2,
    title: 'Primary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'primary',
    icon: <Iconify icon="eva:image-2-fill" width={24} />,
  },
  {
    key: 3,
    title: 'Secondary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'secondary',
    icon: <Iconify icon="eva:pantone-fill" width={24} />,
  },
  {
    key: 4,
    title: 'Info',
    des: 'Morbi mattis ullamcorper',
    time: '10:30 am',
    color: 'info',
    icon: <Iconify icon="eva:tv-fill" width={24} />,
  },
  {
    key: 5,
    title: '뉴턴홀 220',
    des: 'Morbi mattis ullamcorper',
    time: '11월 12일 20:00',
    color: 'success',
    icon: <Iconify icon="eva:activity-fill" width={24} />,
  },
  {
    key: 6,
    title: '뉴턴 412호',
    des: 'Morbi mattis ullamcorper',
    time: '11월 15일 21:00',
    color: 'warning',
    icon: <Iconify icon="eva:cube-fill" width={24} />,
  },
  {
    key: 7,
    title: '뉴턴 319호',
    des: 'Morbi mattis ullamcorper',
    time: '11월 20일 22:00',
    color: 'error',
    icon: <Iconify icon="eva:film-fill" width={24} />,
  },
];

// ----------------------------------------------------------------------export default function UserTimeLine() {
export default function UserTimeLine() {
  const lastItem = TIMELINES[TIMELINES.length - 1].key;

  const reduceTimeLine = TIMELINES.slice(TIMELINES.length - 0);

  return (
    <ComponentBlock title="나의 예약 리스트">
      <Container
        sx={{
          backgroundColor: 'white',
          borderRadius: '18px',
          boxShadow: 2,
        }}
      >
        <Timeline
          sx={{
            m: 0,
            p: 3,
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {/* {reduceTimeLine.map((item) => (
            <TimelineItem key={item.key}>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    backgroundColor: '#4653F0',
                  }}
                />
                {lastItem === item.key ? null : <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {item.time}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))} */}
          {reduceTimeLine.length === 0 ? (
            <Box
              component="img"
              src="/assets/images/dept/noreserve.svg"
              style={{ width: '100%' }}
            />
          ) : (
            reduceTimeLine.map((item) => (
              <TimelineItem key={item.key}>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor: '#4653F0',
                    }}
                  />
                  {lastItem === item.key ? null : <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {item.time}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))
          )}
        </Timeline>
      </Container>
    </ComponentBlock>
  );
}
