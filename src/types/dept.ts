export type IDeptRole = {
  deptMemberId: number | null;
  deptRole: string | null;
  approve: string | null;
};

export type IDeptInfo = {
  deptId: number;
  // siteName: string;
  deptName: string | null;
  // logo: string | null;
  image: string;
  userAccept: boolean;
  // maxRserveCount: number | null;
  // link: string | null;
  // extraInfo: string | null;
  spaceCount: number | null;
  memberCount: number | null;
  deptMemberResponse: IDeptRole[] | [];
};
