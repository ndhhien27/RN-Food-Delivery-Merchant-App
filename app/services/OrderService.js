import request from './request';

const getOrders = restaurantId => {
  const data = {
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
              phone
            }
            subtotal
            total
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
  };
  return request({ data });
};

const updateOrder = (orderId, status) => {
  const data = {
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
  };
  return request({ data });
};

const cancelOrder = orderId => {
  const data = {
    query: `
      mutation CancelOrder($orderId: ID!){
        merchantCancelOrder(orderId: $orderId){
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
    },
  };
  return request({ data });
};

export default {
  getOrders,
  updateOrder,
  cancelOrder,
};
