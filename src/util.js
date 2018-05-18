import cloneDeep from 'lodash/cloneDeep';

/**
 * (1, 3) => [1, 2, 3]
 * (0, 2) => [0, 1]
 */
const makeArray = (start, length) => {
  const arr = [];
  for (let i = 0; i < length; i += 1) {
    arr.push(start + i);
  }
  return arr;
};

export default {
  /**
   * generate a virtual matrix used to generate real matrix with conflict detect
   * @return {array} a virtual matrix if generated.
   * @return {string} error message if conflict is detected.
   */
  generateVM(data) {
    const vm = [];
    const numData = data.map((item) => {
      const newItem = cloneDeep(item);
      ['x', 'y', 'col', 'row'].forEach((key) => {
        newItem[key] = parseInt(newItem[key], 10);
      });
      return newItem;
    });
    // const realMatrix = [[]];
    // let prevCell = { x: 0 };
    // conflict detect
    for (let i = 0; i < numData.length; i += 1) {
      const cell = numData[i];
      const indexArr = makeArray(cell.x, cell.col);
      for (let j = 0; j < indexArr.length; j += 1) {
        const index = indexArr[j];
        if (!vm[index]) {
          vm[index] = [];
        }
        for (let m = 0; m < cell.row; m += 1) {
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
      for (let i = 0; i < length; i += 1) {
        total += parseInt(arr, 10);
      }
      return total;
    }

    const length = (end === undefined ? arr.length : end) - start;
    let total = 0;
    for (let i = 0; i < length; i += 1) {
      total += arr[start + i] || arr[0];
    }
    return total;
  },

  /**
   * get the largest array from a 2d array
   */
  getLargestArr(arr = []) {
    let largest = [];
    if (!arr) {
      return largest;
    }

    for (let i = 0; i < arr.length; i += 1) {
      const item = arr[i];
      if (item.length > largest.length) {
        largest = item;
      }
    }
    return largest;
  },
};
