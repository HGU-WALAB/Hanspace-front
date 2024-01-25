import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function DepartmentCreateSuccessDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle sx={{ textAlign: 'center', mt: 1 }}> 기관 신청이 완료되었습니다. </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
            기관에 장소를 추가하여 장소 대여를 시작해보세요!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose();
            }}
            variant="outlined"
            color="primary"
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
