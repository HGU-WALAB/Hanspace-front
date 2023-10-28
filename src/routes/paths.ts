// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    reserve: `${ROOTS.DASHBOARD}/reserve`,
    waitinglist: `${ROOTS.DASHBOARD}/waitinglist`,
    // list: `${ROOTS.DASHBOARD}/list`,
    management: {
      root: `${ROOTS.DASHBOARD}/management`,
      manageUser: `${ROOTS.DASHBOARD}/management/manageUser`,
      manageSite: `${ROOTS.DASHBOARD}/management/manageSite`,
    },
    department:{
      root: `${ROOTS.DASHBOARD}/department`,
    }
    // user: {
    //   root: `${ROOTS.DASHBOARD}/user`,
    //   new: `${ROOTS.DASHBOARD}/user/new`,
    //   list: `${ROOTS.DASHBOARD}/user/list`,
    //   cards: `${ROOTS.DASHBOARD}/user/cards`,
    //   profile: `${ROOTS.DASHBOARD}/user/profile`,
    //   // account: `${ROOTS.DASHBOARD}/user/account`,
    //   // edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
    //   // demo: {
    //   //   edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
    //   // },
    // },
    // order: {
    //   root: `${ROOTS.DASHBOARD}/order`,
    //   details: (id: string) => `${ROOTS.DASHBOARD}/order/${id}`,
    //   // demo: {
    //   //   details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
    //   // },
    // },
  },
};
