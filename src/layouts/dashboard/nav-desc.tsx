import { useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import { useMockedUser } from 'src/hooks/use-mocked-user';
// components
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { usePathname } from 'src/routes/hooks';
import { NavSectionVertical } from 'src/components/nav-section';
//
import DeptHeaderButton from 'src/layouts/dashboard/dept-button';
import styled from 'styled-components';
import DescHanspace from 'src/sections/home/desc-hanspace';
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import { NavToggleButton, NavUpgrade } from '../_common';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

const Rows = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export default function NavDesc({ openNav, onCloseNav }: Props) {
  const { user } = useMockedUser();

  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Rows>
        {/* <Logo /> */}
        <DeptHeaderButton />
      </Rows>

      <Box style={{ height: '10px' }} />

      <DescHanspace />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <Stack
        sx={{
          height: 1,
          position: 'fixed',
          width: NAV.W_VERTICAL,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {renderContent}
      </Stack>
    </Box>
  );
}
