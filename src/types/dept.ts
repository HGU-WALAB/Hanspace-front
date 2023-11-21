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
  // userAccept: boolean | null;
  // maxRserveCount: number | null;
  // link: string | null;
  // extraInfo: string | null;
  spaceNum: number | null;
  pplNum: number | null;
  deptMemberResponse: IDeptRole[] | [];
};
