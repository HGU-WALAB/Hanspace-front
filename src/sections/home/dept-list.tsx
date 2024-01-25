// @mui
import { Box } from '@mui/material';
// types
import { IDeptInfo } from 'src/types/dept';
// components
import { useCallback, useState } from 'react';
import DeptCard from './dept-card';
import AccessedDialog from './success-modal-accessed';
import PendingDialog from './success-modal-pending';

export default function DeptList({ deptList }: { deptList: IDeptInfo[] | null }) {
  const [currentDept, setCurrentDept] = useState<IDeptInfo | null>(null);
  const [isAddSuccessDialogOpen, setIsAddSuccessDialogOpen] = useState(false);
  const [isPendingDialogOpen, setIsPendingDialogOpen] = useState(false);

  const handleAccessModal = useCallback((dept: IDeptInfo) => {
    setCurrentDept(dept);
    setIsAddSuccessDialogOpen(true);
  }, []);

  const handolePendingModel = useCallback((dept: IDeptInfo) => {
    setCurrentDept(dept);
    setIsPendingDialogOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsAddSuccessDialogOpen(false);
    setIsPendingDialogOpen(false);
    setCurrentDept(null);
  };

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
      }}
    >
      {deptList?.map((dept) => (
        <DeptCard
          key={dept.deptId}
          deptInfo={dept}
          onAccess={() => handleAccessModal(dept)}
          onPending={() => handolePendingModel(dept)}
        />
      ))}

      {isAddSuccessDialogOpen && (
        <AccessedDialog
          open={isAddSuccessDialogOpen}
          onClose={handleCloseModal}
          currentDept={currentDept}
        />
      )}

      {isPendingDialogOpen && (
        <PendingDialog
          open={isPendingDialogOpen}
          onClose={handleCloseModal}
          currentDept={currentDept}
        />
      )}
    </Box>
  );
}
