// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
// types
import { ISpaceItem, EXSpaceItem } from 'src/types/space';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { shortDateLabel } from 'src/components/custom-date-range-picker';

// ----------------------------------------------------------------------

type Props = {
  // space: ISpaceItem;
  space: EXSpaceItem;
  onView: VoidFunction;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

export default function SpaceItem({ space, onView, onEdit, onDelete }: Props) {
  const popover = usePopover();

  const {
    id,
    name,
    headCount,
    availableStart,
    availableEnd,
    detail,
    // lableColor,
    availability,
    image,
    // regDate,
    // modDate,
  } = space;

  //   const shortLabel = shortDateLabel(available.startDate, available.endDate);

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        right: 8,
        zIndex: 9,
        borderRadius: 1,
        position: 'absolute',
        p: '2px 6px 2px 4px',
        typography: 'subtitle2',
        bgcolor: 'warning.lighter',
      }}
    >
      {/* <Iconify icon="eva:star-fill" sx={{ color: 'warning.main', mr: 0.25 }} /> {ratingNumber} */}
    </Stack>
  );

  const renderPrice = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        left: 8,
        zIndex: 9,
        borderRadius: 1,
        bgcolor: 'grey.800',
        position: 'absolute',
        p: '2px 6px 2px 4px',
        color: 'common.white',
        typography: 'subtitle2',
      }}
    >
      {/* {!!priceSale && (
        <Box component="span" sx={{ color: 'grey.500', mr: 0.25, textDecoration: 'line-through' }}>
          {fCurrency(priceSale)}
        </Box>
      )}
      {fCurrency(price)} */}
    </Stack>
  );

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        {/* {renderPrice}
        {renderRating} */}
        <Image alt={image} src={image} sx={{ borderRadius: 1, height: 164, width: 1 }} />
      </Stack>
      {/* <Stack spacing={0.5}>
        <Image alt={images[1]} src={images[1]} ratio="1/1" sx={{ borderRadius: 1, width: 80 }} />
        <Image alt={images[2]} src={images[2]} ratio="1/1" sx={{ borderRadius: 1, width: 80 }} />
      </Stack> */}
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      //   primary={`Posted date: ${fDateTime(createdAt)}`}
      secondary={
        <Link component={RouterLink} href={paths.hanspace.root} color="inherit">
          {name}
        </Link>
      }
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

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      {[
        {
          label: `${headCount}명 수용가능`,
          icon: <Iconify icon="solar:users-group-rounded-bold" sx={{ color: 'primary.main' }} />,
        },
        {
          label: `${availableStart} ~ ${availableEnd}`,
          icon: <Iconify icon="solar:clock-circle-bold" sx={{ color: 'error.main' }} />,
        },
        {
          label: `${detail}`,
          icon: <Iconify icon="mdi:application-brackets" sx={{ color: 'secondary.main' }} />,
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          {item.icon}
          {item.label}
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      <Card>
        {renderImages}

        {renderTexts}

        {renderInfo}
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          수정하기
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          삭제하기
        </MenuItem>
      </CustomPopover>
    </>
  );
}
