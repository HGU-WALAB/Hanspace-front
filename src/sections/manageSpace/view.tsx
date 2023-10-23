// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { applyFilter } from 'src/layouts/_common/searchbar/utils';
import { GetSpace } from 'src/api/spaceApi';
import { useQuery } from 'react-query';
import SpaceCreateDialog from './space-create-dialog';
//
import SpaceList from './space-list';

// ----------------------------------------------------------------------

export default function ManageSpaceView() {
  const settings = useSettingsContext();

  const { data: spaces } = useQuery(
    ['GetSpace', GetSpace],
    () => GetSpace().then((response) => response.data),
    {
      onSuccess: (data) => {
        console.log('GetMyCategory', data);
      },
    }
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> manageSpace </Typography>

      <div style={{ margin: '50px', display: 'flex', justifyContent: 'flex-end' }}>
        <SpaceCreateDialog />
      </div>
      <SpaceList spaces={spaces} />
    </Container>
  );
}
