// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// componentss
import { useSettingsContext } from 'src/components/settings';
import { Button, Grid } from '@mui/material';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import DeptList from './dept-list';
import AppWelcome from './app-welcome';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { user } = useMockedUser();

  const settings = useSettingsContext();

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'xl'}
      sx={{
        backgroundColor: '#F2F3F9 !important', // 우선순위를 높여서 적용
        borderRadius: '40px',
        padding: '40px !important',
      }}
    >
      <Grid xs={12} md={8}>
        <AppWelcome
          title={`안녕하세요, ${user?.displayName} 학우님 👋 `}
          description="한스페이스 설명서 작성하기"
          // img={<SeoIllustration />}
          action={
            <Button variant="contained" color="primary">
              Read more
            </Button>
          }
        />
      </Grid>
      <div style={{ height: '40px' }} />
      <Typography variant="h4"> 전체 기관 리스트 </Typography>
      <DeptList />
    </Container>
  );
}
