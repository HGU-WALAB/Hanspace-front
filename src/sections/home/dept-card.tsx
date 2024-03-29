import { Box, Button, Card, ListItemText, Stack } from '@mui/material';
import Image from 'src/components/image';
import { IDeptInfo } from 'src/types/dept';
import { useEffect, useState } from 'react';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { DeptUrlState, userDeptState, userState } from 'src/utils/atom';
import { paths } from 'src/routes/paths';

// 0 입장 가능
// 1 나의 기관
// 2 내가 관리자
// 3 팬딩 중

type Props = {
  deptInfo: IDeptInfo;
  onAccess: VoidFunction;
  onPending: VoidFunction;
};

export default function DeptCard({ deptInfo, onAccess, onPending }: Props) {
  const [deptStatus, setDeptStatus] = useState<string>('');
  const userInfo = useRecoilValue(userState);
  const setDeptUrl = useSetRecoilState(DeptUrlState);
  const setDeptState = useSetRecoilState(userDeptState);

  useEffect(() => {
    const firstElement = deptInfo.deptMemberResponse[0];

    if (deptInfo.deptMemberResponse.length !== 0) {
      if (firstElement.approve === '승인 대기') {
        setDeptStatus('승인 대기 중');
      } else if (firstElement.deptRole === '관리자') {
        setDeptStatus('관리하기');
      } else if (firstElement.deptRole === '사용자') {
        setDeptStatus('입장하기');
      }
    } else {
      setDeptStatus('기관 추가하기');
    }
  }, [deptInfo]);

  const handleMove = (deptinfo: IDeptInfo | null) => {
    setDeptUrl(deptinfo?.link);
    setDeptState(deptinfo ?? 'HANSPACE');
    window.location.href = paths.dept.dashboard(deptinfo?.link ?? 'HANSPACE');
  };

  const handleClick = (access: boolean, status: string) => {
    if (status === '관리하기' || status === '입장하기') handleMove(deptInfo);
    else if (access === true && status === '기관 추가하기') {
      axiosInstance.post(endpoints.dept.add, {
        name: userInfo.name,
        email: userInfo.email,
        deptId: deptInfo.deptId,
      });
      onPending();
      setDeptStatus('승인 대기 중');
    } else if (access === false && status === '기관 추가하기') {
      axiosInstance.post(endpoints.dept.add, {
        name: userInfo.name,
        email: userInfo.email,
        deptId: deptInfo.deptId,
      });
      onAccess();
      setDeptStatus('입장하기');
    }
  };

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
          alt={deptInfo.deptImage}
          src={deptInfo.deptImage}
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
      primary={`${deptInfo.spaceCount}개 공간 보유  |  ${deptInfo.memberCount}명 사용 중`} // {`Posted date: ${fDateTime(createdAt)}`}
      secondary={deptInfo.deptName}
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
        onClick={() => {
          handleClick(deptInfo.userAccept, deptStatus);
        }}
        sx={{
          width: '100%',
          backgroundColor: '#ECEEFD',
          color: '#4653F0',
          '&:active, &:hover': {
            backgroundColor: '#4653F0',
            color: '#ffffff',
          },
        }}
      >
        {deptStatus}
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
