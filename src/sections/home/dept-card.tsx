import { Box, Button, Card, ListItemText, Stack } from '@mui/material';
import Image from 'src/components/image';
import { IDeptInfo } from 'src/types/dept';

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
      primary={`총 인원 ${deptInfo.pplNum}명  | 보유 공간 ${deptInfo.spaceNum}개`} // {`Posted date: ${fDateTime(createdAt)}`}
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
      <Button key="success" variant="outlined" color="success" sx={{ width: '100%' }}>
        입장하기
      </Button>
    </Box>
  );

  return (
    <Card>
      {renderImages}

      {renderTexts}

      {renderButton}
    </Card>
  );
}
