import { Helmet } from 'react-helmet-async';
// sections
import { JwtRegisterView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> HANSPACE: 회원가입</title>
      </Helmet>

      <JwtRegisterView />
    </>
  );
}
