import { Helmet } from 'react-helmet-async';
// sections
import DepartmentView from 'src/sections/department_c/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> HANSPACE: 기관 추가하기 </title>
      </Helmet>

      <DepartmentView />
    </>
  );
}
