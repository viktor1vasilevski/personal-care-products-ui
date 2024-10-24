export const API_ENDPOINTS = {
    PRODUCT: '/product',
    GET: '/Get',
    ACCOUNT: '/account',
    LOGIN_USER: '/LoginUser',
    LOGOUT_USER: '/LogoutUser',
    REGISTER: '/registerUser',



    SUBCATEGORY: '/subcategory',
    CATEGORY: '/category',

    
    CREATE: '/create',
    UPDATE:'/update',
    DELETE: '/delete',
    GET_BY_ID: '/getById',

    GET_BY_IDs: (id: number) => `/GetById/${id}`,
    GET_BY_CATEGORY: (category: string) => `/GetByCategory/${category}`
  };
  