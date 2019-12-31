import request from './request';

const clearDevice = uniqueId => {
  const data = {
    query: `
      mutation ClearDevice($uniqueId: String!){
        clearMerchantDeviceInfo(uniqueId: $uniqueId){
          _id
          fcmTokenMerchant
        }
      }
    `,
    variables: {
      uniqueId,
    },
  };
  return request({ data });
};

const getMerchantInfo = (merchantId, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const data = {
    query: `
       query GetMerchantInfo($merchantId: ID!){
        merchantById(merchantId: $merchantId){
          createdRestaurants{
            _id
            name
            position{
              address
              lat
              long
            }
          }
          fName
          lName
          email
          phone
        }
      }
      `,
    variables: {
      merchantId,
    },
  };
  return request({ data, headers });
};

const createdRestaurant = restaurantInput => {
  const data = {
    query: `
      mutation CreateRest($restaurantInput: RestaurantInput!){
        createRestaurant(restaurantInput: $restaurantInput){
          _id
          name
          position{
            address
            lat
            long
          }
        }
      }
    `,
    variables: {
      restaurantInput,
    },
  };
  return request({ data });
};

export default {
  getMerchantInfo,
  createdRestaurant,
  clearDevice,
};
