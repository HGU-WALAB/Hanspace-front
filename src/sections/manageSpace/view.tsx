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
import FormDialog from './form-dialog';
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

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[100], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {/* <ComponentBlock title="Form"> */}
        <FormDialog />
        {/* </ComponentBlock> */}
        <SpaceList spaces={spaces} />
      </Box>
    </Container>
  );
}

export const tours = [
  {
    id: '1',
    name: 'Halong Bay',
    images: 'https://m.s1campus.co.kr:1543/comm/images/facility/b_lecture1.jpg',
  },
  {
    id: '2',
    name: 'Halong Bay',
    images: 'https://cdn.crowdpic.net/detail-thumb/thumb_d_D7747A585F336535A46783EF5A561A1D.jpg',
  },
];

// export const _tours = [...Array(12)].map((_, index) => {
//   // const available = {
//   //   startDate: _mock.time(index + 1),
//   //   endDate: _mock.time(index),
//   // };

//   const publish = index % 3 ? 'published' : 'draft';

//   // const destination = countries.map((option) => option.label)[index];

//   const services = (index % 2 && ['Audio guide', 'Food and drinks']) ||
//     (index % 3 && ['Lunch', 'Private tour']) ||
//     (index % 4 && ['Special activities', 'Entrance fees']) || [
//       'Gratuities',
//       'Pick-up and drop off',
//       'Professional guide',
//       'Transport by air-conditioned',
//     ];

//   // const tourGuides =
//   //   (index === 0 && _tourGuides.slice(0, 1)) ||
//   //   (index === 1 && _tourGuides.slice(1, 3)) ||
//   //   (index === 2 && _tourGuides.slice(2, 5)) ||
//   //   (index === 3 && _tourGuides.slice(4, 6)) ||
//   //   _tourGuides.slice(6, 9);

//   // const images = TRAVEL_IMAGES.slice(index, index + 5);

//   return {
//     id: _mock.id(index),
//     images,
//     publish,
//     services,
//     available,
//     tourGuides,
//     destination,
//     // bookers: BOOKER,
//     // content: CONTENT,
//     // tags: _tags.slice(0, 5),
//     // name: _mock.tourName(index),
//     // createdAt: _mock.time(index),
//     durations: '4 days 3 nights',
//     // price: _mock.number.price(index),
//     // priceSale: _mock.number.price(index),
//     // totalViews: _mock.number.nativeL(index),
//     // ratingNumber: _mock.number.rating(index),
//   };
// });
