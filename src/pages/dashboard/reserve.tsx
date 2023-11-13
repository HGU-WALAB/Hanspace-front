import { Helmet } from 'react-helmet-async';
// sections

import ReserveView from 'src/sections/reserve/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> HANSPACE: 예약하기 </title>
      </Helmet>

      <ReserveView />
    </>
  );
}
