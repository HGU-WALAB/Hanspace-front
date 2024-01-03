// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// componentss
import { useSettingsContext } from 'src/components/settings';
import { Button, Grid } from '@mui/material';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useEffect, useState } from 'react';
import { GetFirstInfo } from 'src/api/userApi';
import { useSetRecoilState } from 'recoil';
import { userState } from 'src/utils/atom';
import { IDeptInfo } from 'src/types/dept';
import { useAuthContext } from 'src/auth/hooks';
import DeptList from './dept-list';
import AppWelcome from './app-welcome';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { login } = useAuthContext();

  const { user } = useMockedUser();

  const settings = useSettingsContext();

  const setUserInfo = useSetRecoilState(userState);

  const [deptInfo, setDeptInfo] = useState<IDeptInfo[] | null>(null);

  useEffect(() => {
    try {
      GetFirstInfo().then((res) => {
        login?.(res.data.name, res.data.email);
        setUserInfo({ email: res.data.email, name: res.data.name, hanRole: res.data.hanRole });
        setDeptInfo(res.data.departmentResponses);
      });
    } catch (error) {
      console.error(error);
    }
  }, [login, setUserInfo]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Container
        maxWidth={settings.themeStretch ? false : 'xl'}
        sx={{
          backgroundColor: '#F2F3F9 !important',
          borderRadius: '40px',
          padding: '40px !important',
        }}
      >
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`안녕하세요, ${user?.displayName}님 👋 `}
            description={`한동메일을 통한 로그인으로 대여 신청이 가능합니다.\nHOME에서 예약 내역 확인과 'Calendar'를 통한 강의실별 예약 현황을 볼 수 있습니다.\n승인된 예약을 통해 강의실을 사용할 수 있으며, 지도 교수 소속 조건 충족 시 대여가 가능합니다.`}
            // img={<SeoIllustration />}
            action={
              <Button variant="contained" color="primary">
                Read more
              </Button>
            }
          />
        </Grid>
        <div style={{ height: '30px' }} />
        <Typography variant="h4"> 전체 기관 리스트 </Typography>
        <div style={{ height: '10px' }} />
        <DeptList deptList={deptInfo} />
      </Container>
    </Container>
  );
}
