// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// tyeps
import { EXSpaceItem } from 'src/types/space';
// components
import { useSettingsContext } from 'src/components/settings';
import { GetSpace } from 'src/api/spaceApi';
import { useQuery } from 'react-query';
import { userDeptState } from 'src/utils/atom';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import SpaceCreateDialog from './space-create-dialog';
//
import SpaceList from './space-list';

export default function ManageSpaceView() {
  const settings = useSettingsContext();

  const userDeptValue = useRecoilValue(userDeptState);
  let deptId = 0;
  if (typeof userDeptValue === 'object') {
    ({ deptId } = userDeptValue);
  }

  const { data: spaces, refetch } = useQuery<EXSpaceItem[]>(
    ['GetSpace', GetSpace],
    () => GetSpace(deptId).then((response) => response.data),
    {
      onSuccess: (data) => {
        console.log('GetSpace', data);
      },
    }
  );

  useEffect(() => {
    refetch();
    console.log('refetch');
  }, [deptId, refetch]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> 장소 관리하기 </Typography>

      <div style={{ margin: '50px', display: 'flex', justifyContent: 'flex-end' }}>
        <SpaceCreateDialog deptId={deptId} refetchSpaces={refetch} />
      </div>
      {spaces && <SpaceList spaces={spaces} refetchSpaces={refetch} />}
    </Container>
  );
}
