import swap from "./Helper";

const bs = (array, position, arraySteps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  // bubble sorting algorithm (aka one of the slowest algorithms to ever exist)
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        let tmp = array[j]
        array[j] = array[j+1]
        array[j+1] = tmp;
      }
      arraySteps.push(array.slice());
      // set the colors to review the ones we are looking at
      colorKey[j] = 1;
      colorKey[j + 1] = 3;
      colorSteps.push(colorKey.slice());
      // once the colors are done being reviewed, we are no longer going to inspect them.
      colorKey[j] = 0;
      colorKey[j + 1] = 0;
    }
    // once they are
    colorKey[arraySteps.length - 1 - i] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }
  // once all the steps are complete, make the arrays all green
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
  return;
};

export default bs;
