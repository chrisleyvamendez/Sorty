// helper file for the algos
// simple swapping algo designed to change out the values
export default function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    // return the completed and swapped array;
    return array;
}