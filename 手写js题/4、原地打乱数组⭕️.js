/**
 * [1,2,3,4,5]
 * 洗牌后：
 * [2,3,1,5,4]
 */
function shuffleArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    const index = Math.floor(Math.random() * arr.length);
    const temp = arr[i];
    arr[i] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

console.log(shuffleArray([1, 2, 3, 4, 5]));
