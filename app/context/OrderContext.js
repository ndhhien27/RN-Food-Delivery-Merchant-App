/* eslint-disable react/destructuring-assignment */
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../services/api';

export const OrderContext = createContext();

export default function OrderProvider(props) {
  const restaurantId = '5dce36b8e3557d165a5c7a98';
  const [orders, setOrders] = useState({
    data: [],
    isRefresh: false,
  });
  const fetchOrders = () => {
    console.log('callfetch');
    API.getOrders(
      restaurantId,
      res =>
        setOrders(prev => {
          return {
            ...prev,
            data: res.data.data.ordersByRestaurant,
            isRefresh: false,
          };
        }),
      err => console.log(err),
    );
    // console.log(orders);
  };

  const refresh = () => {
    setOrders(prev => {
      return {
        ...prev,
        isRefresh: true,
      };
    });
  };

  // const updateOrders = (orderId) => {
  //   API.getOrders(
  //     restaurantId,
  //     res => setOrders(res.data.data.ordersByRestaurant),
  //     err => console.log(err),
  //   );
  // };

  // const addFoodToCart = (food, storeName) => {
  //   setCart(prevCart => {
  //     let afterCart = {};
  //     if (!prevCart.cartItem.find(item => item.foodId === food.id)) {
  //       afterCart = {
  //         ...prevCart,
  //         storeName,
  //         cartItem: [
  //           ...prevCart.cartItem,
  //           {
  //             foodId: food.id,
  //             foodName: food.title,
  //             foodPrice: food.price,
  //             foodQty: 1,
  //           },
  //         ],
  //       };
  //     } else {
  //       const newCartItem = prevCart.cartItem.map(item =>
  //         item.foodId !== food.id
  //           ? { ...item }
  //           : { ...item, foodQty: item.foodQty + 1 }
  //       );
  //       afterCart = {
  //         ...prevCart,
  //         cartItem: [...newCartItem],
  //       };
  //     }
  //     // storeCart(afterCart);
  //     return afterCart;
  //   });
  // };

  // // eslint-disable-next-line no-unused-vars
  // const increaseQty = food => {
  //   setCart(prevCart => {
  //     return prevCart.map(item => item.foodId);
  //   });
  // };

  return (
    <OrderContext.Provider
      value={{
        orders,
        fetchOrders,
        refresh,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}
