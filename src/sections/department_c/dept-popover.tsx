import { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';

interface DeptPopoverProps {
  filed: string; // content prop은 문자열로 지정
}

export default function DeptPopover({ filed }: DeptPopoverProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    switch (filed) {
      case 'userAccept':
        setContent(
          '사용자 즉시 입장 여부를 선택했을 시 관리자의 별도의 허가가 있어야 사용자들이 서비스를 사용할 수 있습니다. 미선택시 로그인 한 모든 사용자들이 해당 기관 서비스를 사용 할 수 있습니다.'
        );
        break;
      case 'maxRserveCount':
        setContent(
          '사용자가 장소 대여 날짜를 고를 때, 현재 날짜로부터 며칠 후의 날짜까지 선택할 수 있는지 결정합니다.'
        );
        break;
      default:
        break;
    }
  }, [filed]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Fab size="small" color="primary" onClick={handleClick}>
        {' '}
        ?{' '}
      </Fab>
      {/* <Button aria-describedby={id} variant="outlined" color="primary" onClick={handleClick} >
        ?
      </Button> */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2, width: '300px' }}>{content}</Typography>
      </Popover>
    </div>
  );
}
