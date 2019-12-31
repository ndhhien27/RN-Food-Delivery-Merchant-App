/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
export const convertArr = foodList => {
  let newArr = [];
  for (const ele of foodList) {
    newArr.push({ _id: ele._id, name: ele.name, header: true, price: null });
    const child = ele.foods.map(item => ({
      _id: item._id,
      dishType: ele.name,
      name: item.name,
      header: false,
      price: item.price.value,
    }));
    newArr = [...newArr, ...child];
  }
  return newArr;
};

export const setIsSelected = list => {
  return list.map(item => {
    return {
      _id: item._id,
      name: item.name,
      isSelected: false,
    };
  });
};
