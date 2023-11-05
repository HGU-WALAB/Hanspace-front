import { Helmet } from 'react-helmet-async';
// sections
import { ReserveListView } from 'src/sections/reservelist/view';

// ----------------------------------------------------------------------

export default function ReserveListPage() {
  return (
    <>
      <Helmet>
        <title> 예약 승인 리스트</title>
      </Helmet>

      <ReserveListView />
    </>
  );
}
