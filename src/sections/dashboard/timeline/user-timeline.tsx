// @mui
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// react
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userDeptState } from 'src/utils/atom';
// api
import { GetReserveListByMember } from 'src/api/reserveApi';
// utils
import { fDateTime } from 'src/utils/format-time';
// types
import { ICalendarEvent } from 'src/types/calendar';
//
import { palette as themePalette } from 'src/theme/palette';
import ComponentBlock from './component-block';

// ----------------------------------------------------------------------

const palette = themePalette('light');

// ----------------------------------------------------------------------
export default function UserTimeLine() {
  const [eventsData, setEventData] = useState<ICalendarEvent[] | null>();

  const userDeptInfo = useRecoilValue(userDeptState);
  let deptId = '';
  if (typeof userDeptInfo === 'object') {
    deptId = `${userDeptInfo.deptId}`;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetReserveListByMember(Number(deptId));
        setEventData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [deptId]);

  const events = eventsData || [];

  const lastItem = events.length > 0 ? events[events.length - 1].id : null;

  const reduceTimeLine = events.slice(events.length - 5);

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
            paddingLeft: '16px',
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {reduceTimeLine.length === 0 ? (
            <Box
              component="img"
              src="/assets/images/dept/noreserve.svg"
              style={{ width: '100%' }}
            />
          ) : (
            reduceTimeLine.map((item) => (
              <TimelineItem key={item.id}>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor: palette.primary.main,
                    }}
                  />
                  {lastItem !== null && lastItem === item.id && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="body2">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {`${fDateTime(item.start, 'MM/dd p')}`}
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
