import { useTheme } from '@mui/material';
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { palette as themePalette } from 'src/theme/palette';

interface TableCellProps {
  isHighlighted?: boolean;
  isDisabled?: boolean;
}
interface SpacingGridProps {
  availableStart: string;
  availableEnd: string;
}

// 테이블 스타일 컴포넌트
const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid ${({ theme }) => theme.palette.text.n3};
  margin-bottom: 8px;
  border-radius: 8px;
`;

const TimeOverlay = styled.div`
  text-align: center;
  background-color: #eceefd;
  font-size: 12px;
  position: absolute;
  border-radius: 18px;
  padding: 2px 8px 2px 8px;
  top: -25px; // 원하는 위치로 조정
  right: -15px; // 원하는 위치로 조정
`;

// 행 스타일 컴포넌트
const TableRow = styled.tr``;

// 셀 스타일 컴포넌트
const TableCell = styled.td<TableCellProps>`
  border: 1px solid #b4afc3;
  padding: 16px 6px 16px 6px;
  background-color: ${(props) => {
    const palette = themePalette('light');
    if (props.isDisabled) {
      return palette.secondary.dark; // 만약 isDisabled가 true인 경우 검은색 배경
    }
    return props.isHighlighted ? palette.primary.light : 'transparent';
  }};
  &:hover ${TimeOverlay} {
    display: block;
  }
  position: relative;
`;

export default function SpacingGrid({ availableStart, availableEnd }: SpacingGridProps) {
  const theme = useTheme();
  const numRows = 1;
  const numColumns = 24;

  const [hoveredTime, setHoveredTime] = useState<string | null>(null);
  const handleMouseEnter = (timeId: string) => {
    setHoveredTime(timeId);
  };
  const handleMouseLeave = () => {
    setHoveredTime(null);
  };

  const [availableStartHour, availableStartMinute] = availableStart.split(':').map(Number);
  const [availableEndHour, availableEndMinute] = availableEnd.split(':').map(Number);

  const isTimeDisabled = (
    hour: number,
    minute: number,
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ) =>
    hour < startHour ||
    (hour === startHour && minute < startMinute) ||
    hour > endHour ||
    (hour === endHour && minute > endMinute);

  return (
    <ThemeProvider theme={theme}>
      <Table>
        <tbody>
          <TableRow key={numRows}>
            {Array.from({ length: numColumns }, (_, column) => {
              const hour = Math.floor(column / 2); // 시간 계산
              const minute = (column % 2) * 30; // 분 계산
              const isDisabled = isTimeDisabled(
                hour,
                minute,
                availableStartHour,
                availableStartMinute,
                availableEndHour,
                availableEndMinute
              );
              const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
              const minuteStr = minute === 0 ? '00' : `${minute}`;
              const timeId = `${hourStr}:${minuteStr}`; // 고유 ID 생성

              return (
                <TableCell
                  key={timeId} // 키로 고유 ID 사용
                  id={timeId} // 셀의 ID 설정
                  isHighlighted={hoveredTime === timeId}
                  isDisabled={isDisabled}
                  onMouseEnter={() => handleMouseEnter(timeId)} // 마우스 호버 이벤트 핸들러
                  onMouseLeave={handleMouseLeave} // 마우스 이탈 이벤트 핸들러
                >
                  {hoveredTime === timeId && <TimeOverlay>{timeId}</TimeOverlay>}
                </TableCell>
              );
            })}
          </TableRow>
        </tbody>
      </Table>
      <Table style={{ marginBottom: '20px' }}>
        <tbody>
          <TableRow key={numRows}>
            {Array.from({ length: numColumns }, (_, column) => {
              const hour = Math.floor(column / 2) + 12; // 시간 계산
              const minute = (column % 2) * 30; // 분 계산
              const isDisabled = isTimeDisabled(
                hour,
                minute,
                availableStartHour,
                availableStartMinute,
                availableEndHour,
                availableEndMinute
              );
              const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
              const minuteStr = minute === 0 ? '00' : `${minute}`;
              const timeId = `${hourStr}:${minuteStr}`; // 고유 ID 생성

              return (
                <TableCell
                  key={timeId} // 키로 고유 ID 사용
                  id={timeId} // 셀의 ID 설정
                  isHighlighted={hoveredTime === timeId}
                  isDisabled={isDisabled}
                  onMouseEnter={() => handleMouseEnter(timeId)} // 마우스 호버 이벤트 핸들러
                  onMouseLeave={handleMouseLeave} // 마우스 이탈 이벤트 핸들러
                >
                  {hoveredTime === timeId && <TimeOverlay>{timeId}</TimeOverlay>}
                </TableCell>
              );
            })}
          </TableRow>
        </tbody>
      </Table>
    </ThemeProvider>
  );
}
