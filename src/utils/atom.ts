import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IDeptInfo, IMyDeptInfo } from 'src/types/dept';

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

export const selectedIndexState = atom({
  key: 'selectedIndexState',
  default: -1,
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: 'userState',
  default: {
    email: '',
    name: '',
    hanRole: '',
  },
});

export const allDeptState = atom<IDeptInfo | string>({
  key: 'allDeptState',
  effects_UNSTABLE: [persistAtom],
});

export const userDeptState = atom<IMyDeptInfo | string>({
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
