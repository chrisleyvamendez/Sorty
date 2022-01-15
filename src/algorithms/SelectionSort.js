import swap from "./Helper";
/*
const SelectionSort = (array, position, arraySteps, colorSteps) =>{
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  //selection sort splits the array into two sublists, a sorted and an unsorted list
  let n = array.length;
  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
      arraySteps.push(array.slice());
      colorKey[j]=1;
      colorKey[j+1]=1;
      colorSteps.push(colorKey.slice());
      colorKey[j]=0
      colorKey[j+1]=0
    }
    // if the min is no longer the initial i we set it to, this means that the j was smaller so swap
    if (min !== i) {
      // swap
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
    }
    colorKey[arraySteps.length - 1 - i] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
  return;
};

export default SelectionSort;
*/


const ss = (array, position, arraySteps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  // bubble sorting algorithm (aka one of the slowest algorithms to ever exist)
  for (let i = 0; i < array.length - 1; i++) {
    let min = i;
    for (let j = i+1; j < array.length; j++) {
      if (array[j] < array[min]) {
        let tmp = array[j]
        array[j] = array[j+1]
        array[j+1] = tmp;
      }
      if( i !== min){
        
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

export default ss;
