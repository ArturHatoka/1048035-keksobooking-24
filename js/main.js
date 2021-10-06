const getIntRandom = (min, max) => {
  const minPos = Math.abs(min);
  const maxPos = Math.abs(max);
  //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#получение_случайного_целого_числа_в_заданном_интервале_включительно
  const minCeil = Math.ceil(minPos);
  const maxFloor = Math.floor(maxPos);
  return minPos >= maxPos ? null : Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
};

const getFloatRandom = (min, max, order) => {
  const minPos = Math.abs(min);
  const maxPos = Math.abs(max);
  const orderPos = Math.abs(order);
  return minPos >= maxPos ? null : +((Math.random() * (maxPos - minPos + 1)) + minPos).toFixed(orderPos);
};

getIntRandom(1, 5);
getFloatRandom(1, 5, 2);
