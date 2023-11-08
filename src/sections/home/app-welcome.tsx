// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
// theme
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  title?: string;
  description?: string;
  img?: React.ReactNode;
  action?: React.ReactNode;
}

export default function AppWelcome({ title, description, action, img, ...other }: Props) {
  const theme = useTheme();

  return (
    <Stack
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{
        ...bgGradient({
          direction: '135deg',
          //   startColor: alpha(theme.palette.primary.light, 0.2),
          startColor: theme.palette.primary.main,
          //   endColor: alpha(theme.palette.primary.main, 0.2),
          endColor: theme.palette.primary.main,
        }),
        height: { md: 1 },
        // borderRadius: 2,
        position: 'relative',
        color: 'primary.darker',
        backgroundColor: 'common.white',
      }}
      style={{ borderRadius: '30px' }}
      {...other}
    >
      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          p: {
            xs: theme.spacing(5, 3, 0, 3),
            md: theme.spacing(5),
          },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, whiteSpace: 'pre-line', color: 'white' }}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            maxWidth: 720,
            mb: { xs: 3, xl: 5 },
            color: 'white',
          }}
        >
          {description && typeof description === 'string'
            ? description.split('\n').map((item, index, array) => (
              <>
                {item}
                {index < array.length - 1 && <br />}
              </>
            ))
            : null}
        </Typography>

        {action && action}
      </Stack>

      {img && (
        <Stack
          component="span"
          justifyContent="center"
          sx={{
            p: { xs: 5, md: 3 },
            maxWidth: 360,
            mx: 'auto',
          }}
        >
          {img}
        </Stack>
      )}
    </Stack>
  );
}
