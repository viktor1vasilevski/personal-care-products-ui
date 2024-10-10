export const API_ENDPOINTS = {
    PRODUCT: '/product',
    GET: '/Get',
    ACCOUNT: '/account',
    LOGIN_USER: '/LoginUser',
    LOGOUT_USER: '/LogoutUser',
    REGISTER: '/register',
    GET_BY_ID: (id: number) => `/GetById/${id}`,
    GET_BY_CATEGORY: (category: string) => `/GetByCategory/${category}`
  };
  