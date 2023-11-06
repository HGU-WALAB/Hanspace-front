import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

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

export const DeptIdState = atom({
  key: 'DeptIdState',
  default: 'CSEE',
  effects_UNSTABLE: [persistAtom],
});

export const selectedIndexState = atom({
  key: 'selectedIndexState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
