import { Helmet } from 'react-helmet-async';
// sections
import DepartmentView from 'src/sections/department_c/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> departmentSite </title>
      </Helmet>

      <DepartmentView />
    </>
  );
}
