const getPositive = (number) => {
  if(number < 0){
    return number * -1;
  }
  return number;
};

const getIntRandom = (min, max) => {
  const minPos = getPositive(min);
  const maxPos = getPositive(max);
  if (minPos >= maxPos){
    alert('Первый параметр min, второй max');
    return null;
  }
  //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#получение_случайного_целого_числа_в_заданном_интервале_включительно
  const minCeil = Math.ceil(minPos);
  const maxFloor = Math.floor(maxPos);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
};

const getFloatRandom = (min, max, order) => {
  const minPos = getPositive(min);
  const maxPos = getPositive(max);
  const orderPos = getPositive(order);
  if (minPos >= maxPos){
    alert('Первый параметр min, второй max');
    return null;
  }
  return +((Math.random() * (maxPos - minPos + 1)) + minPos).toFixed(orderPos);
};

getIntRandom(1, 5);
getFloatRandom(1, 5, 2);
