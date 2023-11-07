import { Helmet } from 'react-helmet-async';
// sections
import { ReserveListView } from 'src/sections/reservelist/view';

// ----------------------------------------------------------------------

export default function ReserveListPage() {
  return (
    <>
      <Helmet>
        <title> HANSPACE: 예약 관리 </title>
      </Helmet>

      <ReserveListView />
    </>
  );
}
