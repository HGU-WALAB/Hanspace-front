// // react
// import { useEffect, useState } from "react";
// import styled from 'styled-components';
// // @mui
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// // components
// import { useForm } from 'react-hook-form';
// import FormProvider , {
//   RHFEditor,
//   RHFSelect,
//   RHFUpload,
//   RHFSwitch,
//   RHFSlider,
//   RHFCheckbox,
//   RHFTextField,
//   RHFRadioGroup,
//   RHFMultiSelect,
//   RHFAutocomplete,
//   RHFMultiCheckbox,
// } from 'src/components/hook-form';

// // ———————————————————————————————————
// interface ReserveRegulary2Props {
//     selectedData: {
//         startDate: Date;
//         endDate: Date;
//         week: string;
//         startTime: string;
//         endTime: string;
//         // headCount: number;
//         spaceId: number;
//         spaceName: string;
//     }
// }

// interface InputField {
//   value: string;
// }

// export default function ReserveRegularly2({ selectedData }: ReserveRegulary2Props) {  
//   return (
//     <Box>
//         <Typography variant="h6" color="primary" sx={{mb: 8}}> 
//             예약 선택 정보
//         </Typography>
//         <Typography variant="subtitle1" sx={{mb: 7}}>
//           예약 시작 날짜 : {selectedData.startDate.toISOString().split('T')[0]}
//         </Typography>
//         <Typography variant="subtitle1" sx={{mb: 7}}>
//           예약 끝 날짜 : {selectedData.endDate.toISOString().split('T')[0]}
//         </Typography>
//         <Typography variant="subtitle1" sx={{mb: 7}}>
//           예약 정기 요일 : {selectedData.week}
//         </Typography>
//         <Typography variant="subtitle1" sx={{mb: 7}}>
//           예약 시작 시간 : {selectedData.startTime}
//         </Typography>
//         <Typography variant="subtitle1" sx={{mb: 7}}>
//           예약 끝 시간 : {selectedData.endTime}
//         </Typography>
//         {/* <Typography variant="subtitle1" sx={{mb: 7}}>
//           예약 인원 수 : {selectedData.headCount}
//         </Typography> */}
//         {/* <Typography variant="subtitle1">{selectedData.spaceId}</Typography> */}
//         <Typography variant="subtitle1" sx={{mb: 7}}>
//           예약 장소 : {selectedData.spaceName}
//         </Typography>
//     </Box>
//   );
// }