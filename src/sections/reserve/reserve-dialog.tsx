import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function ReserveSuccessDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle sx={{ textAlign: 'center', mt: 1 }}> 예약되었습니다 </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
            예약 내용은 예약 리스트를 통해 확인할 수 있습니다
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
