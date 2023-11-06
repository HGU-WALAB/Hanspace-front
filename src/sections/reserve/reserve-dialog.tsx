import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack, { StackProps } from '@mui/material/Stack';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// routes
import { paths } from 'src/routes/paths';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ReserveSuccessDialog({ open, onClose }: {open: boolean, onClose: () => void }) {
    
    return (
        <div>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ textAlign: "center", mt: 1 }}> 예약되었습니다 </DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1">예약 내용은 예약 리스트를 통해 확인할 수 있습니다</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {onClose();}} variant="outlined" color="primary" >
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
}
