// @mui
import { Theme, SxProps, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Stack, { StackProps } from '@mui/material/Stack';

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  title?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function ComponentBlock({ title, sx, children, ...other }: BlockProps) {
  const theme = useTheme();

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 1.5,
        borderStyle: 'dashed',
        bgcolor: theme.palette.primary.lighter,
        height: '100%',
      }}
    >
      {title && <CardHeader title={title} />}

      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        sx={{
          p: 3.5,
          minHeight: 180,
          ...sx,
        }}
        {...other}
      >
        {children}
      </Stack>
    </Paper>
  );
}
