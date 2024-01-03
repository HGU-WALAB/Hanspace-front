import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IDeptInfo } from 'src/types/dept';

const { persistAtom } = recoilPersist({
  key: 'localStorage', // 원하는 key 값 입력
  storage: localStorage,
});

export const isAdminState = atom({
  key: 'isAdmin',
  // default: false,
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const IsLoginState = atom({
  key: 'IsLoginState',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const DeptUrlState = atom({
  key: 'DeptUrlState',
  default: 'CSEE',
  effects_UNSTABLE: [persistAtom],
});

// export const DeptIdState = atom({
//   key: 'DeptIdState',
//   default: 'CSEE',
//   effects_UNSTABLE: [persistAtom],
// });

// export const DeptNameState = atom({
//   key: 'DeptNameState',
//   default: 'HANSPACE',
//   effects_UNSTABLE: [persistAtom],
// });

export const selectedIndexState = atom({
  key: 'selectedIndexState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: 'userState',
  default: {
    email: 'HyelimChoi@handong.ac.kr',
    name: '최혜림',
    hanRole: 'USER',
  },
});

export const userDeptState = atom<IDeptInfo | string>({
  key: 'userDeptState',
  default: 'HANSPACE',
  effects_UNSTABLE: [persistAtom],
});

export const userDeptListState = atom<IDeptInfo[] | null>({
  key: 'userDeptListState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const tokenState = atom({
  key: 'tokenState',
  default: null,
});
