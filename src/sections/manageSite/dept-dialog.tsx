import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function DepartmentUpdateSuccessDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle sx={{ textAlign: 'center', mt: 1 }}>
          기관 정보 수정이 완료되었습니다.
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
            수정된 내용은 자동으로 변경되며 유저들에게 보여집니다!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose();
              window.location.reload();
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
