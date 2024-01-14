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
  logoImage: string;
  deptImage: string;
  userAccept: boolean;
  maxRserveCount: number;
  link: string;
  extraInfo: string;
};

// ToDo: backend api 수정 후 다시 연결 확인
export type IDeptRead = {
  siteName: string;
  deptName: string;
  logoImage: string;
  deptImage: string;
  userAccept: boolean;
  maxRserveCount: number;
  link: string;
  extraInfo: string;
};

// ToDo: backend api 수정 후 다시 연결 확인
export type IDeptUpdate = {
  siteName: string;
  deptName: string;
  deptImage: string;
  userAccept: boolean;
  maxRserveCount: number;
  extraInfo: string;
};