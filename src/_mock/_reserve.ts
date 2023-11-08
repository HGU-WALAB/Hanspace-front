import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const RESERVE_STATUS_OPTIONS = [
  { value: '미승인', label: '미승인' },
  { value: '승인', label: '승인' },
  { value: '거절', label: '거절' },
  { value: '자동취소', label: '자동취소' },
];

const ITEMS = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  sku: `16H9UR${index}`,
  quantity: index + 1,
  name: _mock.productName(index),
  coverUrl: _mock.image.product(index),
  price: _mock.number.price(index),
}));

export const _reserve = [...Array(20)].map((_, index) => {
  // const shipping = 10;

  // const discount = 10;

  // const taxes = 10;

  // const items = (index % 2 && ITEMS.slice(0, 1)) || (index % 3 && ITEMS.slice(1, 3)) || ITEMS;

  // const totalQuantity = items.reduce((accumulator, item) => accumulator + item.quantity, 0);

  // const subTotal = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

  // const totalAmount = subTotal - shipping - discount + taxes;

  // const customer = {
  //   id: _mock.id(index),
  //   user: _mock.fullName(index);
  //   email: _mock.email(index),
  //   avatarUrl: _mock.image.avatar(index),
  //   ipAddress: '192.158.1.38',
  // };
  // const spaceName = '회의실';
  // const useDate = '2021-09-01';
  // const startTime = '10:00';
  // const endTime = '11:00';
  // const user = '김민수';
  // const purpose = '멋사 회의';
  // const id = _mock.id(index);

  const createAt = new Date();
  return {
    id: _mock.id(index),
    reserveNumber: `#601${index}`,
    createdAt: createAt,
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
  };
});
