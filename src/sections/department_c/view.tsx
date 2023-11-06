// @mui
import Box from '@mui/material/Box';

import DepartmentForm from './dept-form';

export default function DepartmentView() {

  return (
    <>
    <p>기관 등록 폼 페이지</p>
    <Box display="flex" flexDirection="column" alignItems="center">
        <DepartmentForm />
    </Box>
    </>
  );

}
