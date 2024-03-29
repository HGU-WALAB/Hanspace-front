export type DailyReserveForm1 = {
  regularReserveId: number | null;
  reserveDate: Date;
  startTime: string;
  endTime: string;
};
export type DailyReserveForm2 = {
  spaceId: number;
  regularReserveId: number | null;
  reserveDate: Date;
  startTime: string;
  endTime: string;
  spaceName: string;
  spaceImage: string;
};

export type DailyReserveAdd = {
  spaceId: number;
  reserveDate: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: string;
  extraInfoAns: string;
  regularReserveId: null;
};

export type RegularyReserveForm1 = {
  regularReserveId: number | null;
  startDate: Date;
  endDate: Date;
  week: string;
  startTime: string;
  endTime: string;
  headCount: number;
};
export type RegularyReserveForm2 = {
  regularReserveId: number | null;
  startDate: Date;
  endDate: Date;
  week: string;
  startTime: string;
  endTime: string;
  headCount: number;
  spaceId: number;
  spaceName: string;
  spaceImage: string;
};

export type RegularlyReserveItem = {
  memberId: any;
  startDate: Date;
  endDate: Date;
  week: string;
  startTime: Date;
  endTime: Date;
  headCount: number;
  spaceId: number;
  purpose: string;
  // phoneNumber: string;
  status: string;
  extraInfoAns: string[];
  reserveCount: number | null;
  reserveDate: string[];
};

export type RegularReserveAdd = {
  spaceId: number;
  reserveDate: string[];
  startDate: string;
  endDate: string;
  week: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: string;
  extraInfoAns: string;
  regularReserveId: null;
  reserveCount: number;
};
