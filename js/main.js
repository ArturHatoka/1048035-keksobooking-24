const getIntRandom = (min, max)=>{
  if (min<=max){
    console.error('Первый параметр min, второй max');
    return false;
  }
  //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#получение_случайного_целого_числа_в_заданном_интервале_включительно
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getFloatRandom = (min, max, order)=>{
  if (min<=max){
    console.error('Первый параметр min, второй max');
    return false;
  }
  return +((Math.random() * (max - min + 1)) + min).toFixed(order);
};

getIntRandom(1, 5);
getFloatRandom(1,5, 2);
