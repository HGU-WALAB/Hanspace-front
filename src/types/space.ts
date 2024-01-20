// ----------------------------------------------------------------------

export type ISpaceFilterValue = string | string[] | Date | ISpaceGuide[] | null;

export type ISpaceFilters = {
  //   spaceGuides: ISpaceGuide[];
  destination: string[];
  services: string[];
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type ISpaceGuide = {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
};

// export type ISpaceBooker = {
//   id: string;
//   name: string;
//   avatarUrl: string;
//   guests: number;
// };

export type ISpaceItem = {
  spaceId: any;
  id: string;
  name: string;
  headCount: number;
  availableStart: Date;
  availableEnd: Date;
  detail: string;
  availability: boolean;
  image: string;
};

export type EXSpaceItem = {
  spaceId: number;
  id: string; // Todo: 지우기
  name: string;
  headCount: number;
  availableStart: string;
  availableEnd: string;
  detail: string;
  availability: boolean;
  image: string;
};
