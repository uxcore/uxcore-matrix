/**
 * (1, 3) => [1, 2, 3]
 * (0, 2) => [0, 1]
 */
const makeArray = (start, length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(start + i);
  }
  return arr;
};

const deepcopy = require('deepcopy');

module.exports = {
  /**
   * generate a virtual matrix used to generate real matrix with conflict detect
   * @return {array} a virtual matrix if generated.
   * @return {string} error message if conflict is detected.
   */
  generateVM(data) {
    const vm = [];
    const numData = data.map((item) => {
      const newItem = deepcopy(item);
      ['x', 'y', 'col', 'row'].forEach((key) => {
        newItem[key] = parseInt(newItem[key], 10);
      });
      return newItem;
    });
    // const realMatrix = [[]];
    // let prevCell = { x: 0 };
    // conflict detect
    for (let i = 0; i < numData.length; i++) {
      const cell = numData[i];
      const indexArr = makeArray(cell.x, cell.col);
      for (let j = 0; j < indexArr.length; j++) {
        const index = indexArr[j];
        if (!vm[index]) {
          vm[index] = [];
        }
        for (let m = 0; m < cell.row; m++) {
          if (vm[index][m + cell.y]) {
            return `Conflict detect: the conflicted cell is ${JSON.stringify(cell)}`;
          }
          vm[index][m + cell.y] = 1;
        }
      }
    }
    return {
      numData,
      vm,
    };
  },
  getSubTotal(arr, start = 0, end) {
    if (typeof arr === 'string' || typeof arr === 'number') {
      const length = end - start;
      let total = 0;
      for (let i = 0; i < length; i++) {
        total += parseInt(arr, 10);
      }
      return total;
    }
    const length = (end === undefined ? arr.length : end) - start;
    let total = 0;
    for (let i = 0; i < length; i++) {
      total += arr[start + i] || arr[0];
    }
    return total;
  },
  /**
   * get the largest array from a 2d array
   */
  getLargestArr(arr) {
    let largest = [];
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (item.length > largest.length) {
        largest = item;
      }
    }
    return largest;
  },
};
