import Axios from 'axios';
import request from './request';

const signup = merchantInput => {
  const data = {
    query: `
      mutation SignUp($merchantInput: MerchantInput!){
        createMerchant(merchantInput: $merchantInput){
          _id
          fName
          lName
          email
        }
      }
    `,
    variables: {
      merchantInput,
    },
  };
  return request({ data });
};

const login = loginInput => {
  const data = {
    query: `
        mutation Login($loginInput: MerchantLoginInput!){
          merchantLogin(loginInput: $loginInput){
            merchantId
            authToken
            fName
            lName
            tokenExpiration
          }
        }
      `,
    variables: {
      loginInput,
    },
  };
  return request({ data });
};

export default {
  login,
  signup,
};
