export type IDeptRole = {
  deptMemberId: number | null;
  deptRole: string | null;
  approve: string | null;
};

export type IDeptInfo = {
  deptId: number;
  siteName: string;
  deptName: string | null;
  // logo: string | null;
  deptImage: string;
  userAccept: boolean;
  // maxRserveCount: number | null;
  link: string | null;
  // extraInfo: string | null;
  spaceCount: number | null;
  memberCount: number | null;
  deptMemberResponse: IDeptRole[];
};

export type IDeptAdd = {
  siteName: string;
  deptName: string;
  // ToDo: 이미지 중 하나 삭제 필요
  logoImage: string;
  deptImage: string;
  userAccept: boolean;
  maxRserveCount: number;
  link: string;
  extraInfo: string;
};

export type IDeptUpdate = {
  siteName: string;
  deptName: string;
  logoImage: string;
  userAccept: boolean;
  maxRserveCount: number;
  extraInfo: string;
};