import axios from 'axios';

const API_URL = 'http://localhost:8080/graphql';
const getMenu = (restaurantId, resCallback, errCallback) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        query Menu($restaurantId: ID!) {
          menuByRestaurant(restaurantId: $restaurantId){
            _id
            name
            foods{
              _id
              name
              price{
                value
              }
            }
          }
        }
      `,
      variables: {
        restaurantId,
      },
    },
  })
    .then(resCallback)
    .catch(errCallback);
};

const getOrders = (restaurantId, resCallback, errCallback) => {
  console.log('calling');
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        query Orders($restaurantId: ID!) {
          ordersByRestaurant(restaurantId: $restaurantId){
            _id
            delivery_position{
              address
              lat
              long
            }
            createdAt
            user{
              fName
              lName
            }
            status
            items{
              _id
              food{
                name
                price{
                  value
                }
              }
              qty
            }
          }
        }
      `,
      variables: {
        restaurantId,
      },
    },
  })
    .then(resCallback)
    .catch(errCallback);
};

const updateOrder = (orderId, status, resCallback, errCallback) => {
  console.log('updated');
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
      mutation UpdateOrder($orderId: ID!, $status: String!){
        updateOrder(orderId:$orderId status:$status){
          _id
          delivery_position{
            address
            lat
            long
          }
          status
        }
      }
      `,
      variables: {
        orderId,
        status,
      },
    },
  })
    .then(resCallback)
    .catch(errCallback);
};

export default {
  getMenu,
  getOrders,
  updateOrder,
};
