import { Helmet } from 'react-helmet-async';
import { CalendarView } from 'src/sections/calendar/view';
// sections
// import ReserveView from 'src/sections/reserve/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> RESERVE </title>
      </Helmet>

      {/* <ReserveView /> */}
      <CalendarView />
    </>
  );
}
