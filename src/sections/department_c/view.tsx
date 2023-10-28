// @mui
import Box from '@mui/material/Box';

import DepartmentForm from './dept-form';

export default function DepartmentView() {

  return (
    <>
    <p>기관 등록 폼 페이지</p>
    <Box style={{ display: 'flex' }}>
        <DepartmentForm />
    </Box>
    </>
  );

}
