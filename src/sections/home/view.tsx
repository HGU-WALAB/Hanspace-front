// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { Button, Grid } from '@mui/material';
import { useEffect } from 'react';
import { GetFirstInfo } from 'src/api/userApi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userDeptListState, userDeptState, userState } from 'src/utils/atom';
import { IDeptInfo } from 'src/types/dept';
import { useAuthContext } from 'src/auth/hooks';
import DeptList from './dept-list';
import AppWelcome from './app-welcome';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { login } = useAuthContext();

  const settings = useSettingsContext();

  const [userInfo, setUserInfo] = useRecoilState(userState);

  const [deptInfo, setDeptInfo] = useRecoilState<IDeptInfo[] | null>(userDeptListState);

  const setfirstDept = useSetRecoilState(userDeptState);
  setfirstDept('HANSPACE');

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
  }, [login, setUserInfo, setDeptInfo]);

  console.log(deptInfo);

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
            title={`안녕하세요, ${userInfo.name}님 👋 `}
            description={`한동메일을 통한 로그인으로 대여 신청이 가능합니다.\nHOME에서 예약 내역 확인과 'Calendar'를 통한 강의실별 예약 현황을 볼 수 있습니다.\n승인된 예약을 통해 강의실을 사용할 수 있으며, 지도 교수 소속 조건 충족 시 대여가 가능합니다.`}
            action={
              <Button variant="contained" color="primary">
                Read more
              </Button>
            }
          />
        </Grid>

        <Container style={{ height: '30px' }} />

        <Typography variant="h4"> 전체 기관 리스트 </Typography>
        <Container style={{ height: '10px' }} />
        <DeptList deptList={deptInfo} />
      </Container>
    </Container>
  );
}
