// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
//
import { Box } from '@mui/material';
import DescHanspace from 'src/sections/home/desc-hanspace';
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
      <Header />

      {/* <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            // maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container> */}
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {renderNavDesc}
        {/* <DescHanspace /> */}

        <Main>{children}</Main>
      </Box>
    </>
  );
}
