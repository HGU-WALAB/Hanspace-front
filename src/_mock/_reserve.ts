import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const RESERVE_STATUS_OPTIONS = [
  { value: '미승인', label: '미승인' },
  { value: '승인', label: '승인' },
  { value: '거절', label: '거절' },
  { value: '자동취소', label: '자동취소' },
];

export const _reserve = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  spaceName: _mock.spaceName(index),
  useDate: _mock.useDate(index),
  startTime: _mock.startTime(index),
  endTime: _mock.endTime(index),
  user: _mock.fullName(index),
  purpose: _mock.purpose(index),
  // shippingAddress: {
  //   fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
  //   phoneNumber: '365-374-4961',
  // },
  // payment: {
  //   cardType: 'mastercard',
  //   cardNumber: '**** **** **** 5678',
  // },
  status: (index % 2 && '승인') || (index % 3 && '미승인') || (index % 4 && '거절') || '자동취소',
}));
