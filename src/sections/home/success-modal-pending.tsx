// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// hooks
import { IDeptInfo } from 'src/types/dept';
import styled from 'styled-components';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

type IAccessModalProps = {
  open: boolean;
  onClose: () => void;
  currentDept?: IDeptInfo | null;
};

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
`;

const Content = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1rem;
`;

export default function PendingDialog({ open, onClose, currentDept }: IAccessModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box style={{ padding: '30px', textAlign: 'center' }}>
        <DialogTitle>
          <Title>{`${currentDept?.deptName}에 입장 대기 중입니다!`}</Title>
        </DialogTitle>

        <Content>
          <DialogContent sx={{ color: 'text.secondary' }}>
            {`${currentDept?.deptName}에서 승인 후 제공되는 장소들을 자유롭게 예약할 수 있습니다! 저희가 빠르게 알려드리겠습니다!`}
          </DialogContent>
          <DialogContent sx={{ color: 'text.secondary' }}>
            장소대여를 더욱 편리하게, HanSpace
          </DialogContent>
        </Content>

        <Box style={{ padding: '24px', textAlign: 'center' }}>
          <Box component="img" src="/assets/images/main/modalImg.svg" style={{ width: '250px' }} />
        </Box>

        <Box style={{ padding: '24px', textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={onClose}
            color="primary"
            autoFocus
            style={{ padding: '15px 50px' }}
          >
            기관 둘러보기
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
