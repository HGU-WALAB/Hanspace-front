// ----------------------------------------------------------------------

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  name: string;
  role: string;
  // status: string;
};

export type IUserItem = {
  id: string;
  approve: string;
  deptId: number;
  deptMemberId: number;
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
