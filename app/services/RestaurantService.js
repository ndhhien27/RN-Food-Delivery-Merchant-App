import request from './request';

const fetchingRestaurant = restId => {
  console.log(restId);
  const data = {
    query: `
      query FetchingRestaurant($restId: ID!){
        restaurantById(restaurantId: $restId){
          _id
          name
          position{
            address
            lat
            long
          }
          orders{
            _id
            user{
              fName
              lName
            }
            review{
              star
              description
            }
            updatedAt
          }
        }
      }
    `,
    variables: {
      restId,
    },
  };
  return request({ data });
};

const getMenu = restaurantId => {
  const data = {
    query: `
        query Menu($restaurantId: ID!) {
          menuByRestaurant(restaurantId: $restaurantId){
            _id
            name
            foods{
              dishType{
                _id
              }
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
  };
  return request({ data });
};

const updateFood = (foodId, updateValue) => {
  const data = {
    query: `
      mutation UpdateFood($foodId: ID!, $updateValue: UpdateInput!){
        updateFood(foodId: $foodId, updateValue: $updateValue)
        {
          _id
          name
          price{
            value
          }
        }
      }
    `,
    variables: {
      foodId,
      updateValue,
    },
  };
  return request({ data });
};

const createFood = foodInput => {
  const data = {
    query: `
      mutation CreateFood($foodInput: FoodInput!){
        createFood(foodInput: $foodInput){
          _id
          dishType{
            _id
          }
          name
          price{
            value
          }
        }
      }
    `,
    variables: {
      foodInput,
    },
  };
  return request({ data });
};

const createDishType = dishTypeInput => {
  const data = {
    query: `
      mutation CreateDishType($dishTypeInput: DishTypeInput!){
        createDishType(dishTypeInput: $dishTypeInput) {
          _id
          name
          foods {
            dishType {
              _id
            }
            _id
            name
            price {
              value
            }
          }
        }
      }
    `,
    variables: {
      dishTypeInput,
    },
  };
  return request({ data });
};

export default {
  fetchingRestaurant,
  getMenu,
  updateFood,
  createFood,
  createDishType,
};
