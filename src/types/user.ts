// ----------------------------------------------------------------------

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  name: string;
  role: string;
};

export type IUserItem = {
  approve: string;
  deptId: number;
  deptMemberId: string;
  deptRole: string;
  memberId: number;
  member: IMemberItem;
};

export type IMemberItem = {
  hanRole: string;
  memberId: number;
  name: string;
  email: string;
  sid: string;
  deptName: string;
};
