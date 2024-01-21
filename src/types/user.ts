// ----------------------------------------------------------------------

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  name: string;
  role: string;
  // status: string;
};

export type IUserItem = {
  id: string;
  sid: string;
  name: string;
  email: string;
  deptName: string;
  deptMemberId: number;
  deptId: number;
  memberId: number;
  approve: string;
  deptRole: string;
};
