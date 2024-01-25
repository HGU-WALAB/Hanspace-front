// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// hooks
import { IDeptInfo } from 'src/types/dept';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useSetRecoilState } from 'recoil';
import { DeptUrlState } from 'src/utils/atom';

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

export default function AccessedDialog({ open, onClose, currentDept }: IAccessModalProps) {
  const setDeptUrl = useSetRecoilState(DeptUrlState);

  const moveToDept = (deptlink: string | null | undefined) => {
    setDeptUrl(deptlink ?? 'HANSPACE');
    window.location.href = paths.dept.dashboard(deptlink ?? 'HANSPACE');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box style={{ padding: '30px', textAlign: 'center' }}>
        <DialogTitle>
          <Title>{`${currentDept?.deptName}에 입장하셨습니다!`}</Title>
        </DialogTitle>

        <Content>
          <DialogContent sx={{ color: 'text.secondary' }}>
            {`이제 ${currentDept?.deptName}에서 제공하는 장소들을 자유롭게 예약할 수 있습니다!`}
          </DialogContent>
          <DialogContent sx={{ color: 'text.secondary' }}>
            장소대여를 더욱 편리하게, Hanspace
          </DialogContent>
        </Content>

        <Box style={{ padding: '24px', textAlign: 'center' }}>
          <Box component="img" src="/assets/images/main/modalImg.svg" style={{ width: '250px' }} />
        </Box>

        <Box style={{ padding: '24px', textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={() => moveToDept(currentDept?.link)}
            color="primary"
            autoFocus
            style={{ padding: '15px 50px', marginRight: '10px' }}
          >
            기관 둘러보기
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            color="primary"
            autoFocus
            style={{ padding: '15px 50px' }}
          >
            홈으로
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
