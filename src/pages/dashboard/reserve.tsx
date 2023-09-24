import { Helmet } from 'react-helmet-async';
// sections
import ReserveView from 'src/sections/reserve/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> RESERVE </title>
      </Helmet>

      <ReserveView />
    </>
  );
}
