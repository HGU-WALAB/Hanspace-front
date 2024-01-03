// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
//
import { Box } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
// import { HeaderSimple as Header } from '../_common';
import Main from '../dashboard/main';
import Header from '../dashboard/header';
import NavDesc from '../dashboard/nav-desc';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function CompactLayout({ children }: Props) {
  const nav = useBoolean();
  const renderNavDesc = <NavDesc openNav={nav.value} onCloseNav={nav.onFalse} />;

  return (
    <>
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {renderNavDesc}

        <Main>{children}</Main>
      </Box>
    </>
  );
}
