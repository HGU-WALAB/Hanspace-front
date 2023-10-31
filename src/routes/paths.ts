// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  HANSPACE: '/hanspace',
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
  // HOME
  hanspace: {
    root: ROOTS.HANSPACE,
    home: `${ROOTS.HANSPACE}/home`,
  },
  // DASHBOARD
  dept: {
    dashboard: (url: string) => `${ROOTS.HANSPACE}/${url}/dashboard`,
    reserve: (url: string) => `${ROOTS.HANSPACE}/${url}/reserve`,
    reservelist: (url: string) => `${ROOTS.HANSPACE}/${url}/reservelist`,
    // one: `${ROOTS.HANSPACE}/one`,
    // reserve: `${ROOTS.HANSPACE}/reserve`,
    // waitinglist: `${ROOTS.HANSPACE}/waitinglist`,
    // list: `${ROOTS.DASHBOARD}/list`,
    management: {
      root: (url: string) => `${ROOTS.HANSPACE}/${url}/management`,
      manageUser: (url: string) => `${ROOTS.HANSPACE}/${url}/management/manageUser`,
      manageSite: (url: string) => `${ROOTS.HANSPACE}/${url}/management/manageSite`,
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
