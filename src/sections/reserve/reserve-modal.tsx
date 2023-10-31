import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

export default function ReserveSuccessModal({ open, onClose }: {open: boolean, onClose: () => void }) {
    // const navigate = useNavigate();

    useEffect(() => {
        let timer: NodeJS.Timeout;
    
        if (open) {
          timer = setTimeout(() => {
            // Navigate('/');
            onClose();
          }, 1000);
        }
    
        return () => {
          if (timer) {
            clearTimeout(timer);
          }
        };
      }, [open, onClose]);
    

    return (
        <div>
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                예약되었습니다!
            </Typography>
            </Box>
        </Modal>
        </div>
    );
}