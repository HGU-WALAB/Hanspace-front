import { Box, Button, Card, ListItemText, Stack } from '@mui/material';
import Image from 'src/components/image';
import { IDeptInfo } from 'src/types/dept';

// 0 입장 가능
// 1 나의 기관
// 2 내가 관리자
// 3 팬딩 중

const BTN_OPTION = ['기관 추가하기', '입장하기', '관리하기', '승인 대기 중'];

export default function DeptCard({ deptInfo }: { deptInfo: IDeptInfo }) {
  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <Image
          alt={deptInfo.image}
          src={deptInfo.image}
          sx={{ borderRadius: 1, height: 164, width: 1 }}
        />
      </Stack>
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      primary={`${deptInfo.spaceNum}개 공간 보유  |  ${deptInfo.pplNum}명 사용 중`} // {`Posted date: ${fDateTime(createdAt)}`}
      secondary={deptInfo.name}
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );

  const renderButton = (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <Button
        key="success"
        variant="soft"
        sx={{
          width: '100%',
          backgroundColor: '#ECEEFD',
          color: '#4653F0',
          '&:active, &:hover': {
            backgroundColor: '#4653F0',
            color: '#ffffff', // You might want to change the text color for better contrast
          },
        }}
      >
        {BTN_OPTION[deptInfo.status]}
      </Button>
    </Box>
  );

  return (
    <Card style={{ borderRadius: '20px !important' }}>
      {renderImages}

      {renderTexts}

      {renderButton}
    </Card>
  );
}
