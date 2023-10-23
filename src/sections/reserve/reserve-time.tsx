import React, { useState } from 'react';
import styled from 'styled-components';
import Popover from '@mui/material/Popover';

// 테이블 스타일 컴포넌트
const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid #000;
  margin-bottom: 5px;
`;

// 행 스타일 컴포넌트
const TableRow = styled.tr``;

// 셀 스타일 컴포넌트
const TableCell = styled.td`
  border: 1px solid #C0C0C0;
  padding: 16px 6px 16px 6px;
`;

const TimeOverlay = styled.div`
  position: absolute; /* 절대적 위치 설정 */
  top: 0; /* 원하는 간격 설정 */
  left: 0;
  right: 0;
  text-align: center;
  background-color: yellow;
  font-size: 12px;
`;


export default function SpacingGrid() {
  const numRows = 1;
  const numColumns = 24;

  const [hoveredTime, setHoveredTime] = useState<string | null>(null);

  const handleMouseEnter = (timeId: string) => {
    setHoveredTime(timeId);
  };
  const handleMouseLeave = () => {
    setHoveredTime(null);
  };

  return (
    <>
<Table>
  <tbody>
    <TableRow key={numRows}>
      {Array.from({ length: numColumns }, (_, column) => {
        const hour = Math.floor(column / 2); // 시간 계산
        const minute = (column % 2) * 30; // 분 계산
        const timeId = `${hour}:${minute}`; // 고유 ID 생성

        return (
          <TableCell
            key={timeId} // 키로 고유 ID 사용
            id={timeId} // 셀의 ID 설정
            className={`cell ${hoveredTime === timeId ? 'hovered' : ''}`} // 스타일링을 위한 CSS 클래스 적용
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
<Table>
  <tbody>
    <TableRow key={numRows}>
      {Array.from({ length: numColumns }, (_, column) => {
        const hour = Math.floor(column / 2) + 12; // 시간 계산
        const minute = (column % 2) * 30; // 분 계산
        const timeId = `${hour}:${minute}`; // 고유 ID 생성

        return (
          <TableCell
            key={timeId} // 키로 고유 ID 사용
            id={timeId} // 셀의 ID 설정
            className={`cell ${hoveredTime === timeId ? 'hovered' : ''}`} // 스타일링을 위한 CSS 클래스 적용
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
    </>
  );
}
