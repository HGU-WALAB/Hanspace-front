export type DailyReserveForm = {
  spaceId: number;
  regularReserveId: number | null;
  reserveDate: Date;
  startTime: string;
  endTime: string;
  headCount: number;
};

export type RegularyReserveForm = {
    regularReserveId: number | null;
    startDate: Date;
    endDate: Date;
    week: string;
    startTime: string,
    endTime: string,
    headCount: number;
    spaceId: number;
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
  