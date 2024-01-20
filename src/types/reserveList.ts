// ----------------------------------------------------------------------

import { ISpaceItem } from './space';

export type IReserveTableFilterValue = string | Date | null;

export type IReserveTableFilters = {
  name: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type IReserveHistory = {
  reserveTime: Date;
  paymentTime: Date;
  deliveryTime: Date;
  completionTime: Date;
  timeline: {
    title: string;
    time: Date;
  }[];
};

export type IReserveShippingAddress = {
  fullAddress: string;
  phoneNumber: string;
};

export type IReservePayment = {
  cardType: string;
  cardNumber: string;
};

export type IReserveDelivery = {
  shipBy: string;
  speedy: string;
  trackingNumber: string;
};

export type IReserveCustomer = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  ipAddress: string;
};

export type IReserveProductItem = {
  id: string;
  sku: string;
  name: string;
  price: number;
  coverUrl: string;
  quantity: number;
};

export type IReserveItem = {
  id: string;
  taxes: number;
  status: string;
  shipping: number;
  discount: number;
  subTotal: number;
  reserveNumber: string;
  totalAmount: number;
  totalQuantity: number;
  history: IReserveHistory;
  customer: IReserveCustomer;
  delivery: IReserveDelivery;
  items: IReserveProductItem[];
  createdAt: Date;
};

export type IReserveListItem = {
  id: string;
  space: ISpaceItem;
  startTime: string;
  endTime: string;
  createMemberName: string;
  purpose: string;
  status: string;
  createMemberId: string;
  extraInfoAns: string;
  reserveDate: string;
  modDate: string;
};
