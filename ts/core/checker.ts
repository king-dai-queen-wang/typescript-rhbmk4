//  检查数据准确性

export function checkArray(array) {
  const length  = array.length;
  const marks = new Array(length);
  // [T,T,T,...]初始化9个T
  marks.fill(true);
  for(let i = 0; i< length - 1; i++) {
    if (!marks[i]) {
      continue;
    }
    const v = array[i];
    // 是否有效，0无效，1-9有效
    if(!v) {
      marks[i] = false;
      continue;
    }
    // 是否重复，从第i+1位—到9 校验有没有重复数据
    for(let j = i + 1; j < length; j++) {
      if(v === array[j]){
        marks[i] = marks[j] = false;
      }
    }
  }
  return marks;
}


import {Toolkit} from './toolkit';
/**
 * 输入matrix 9*9
 * 处理对matrix 行列宫进行检查，并填写marks
 * 输出检查是否成功，marks
 */
export class Checker{
  _matrix;
  _matrixMarks;
  _success;
  constructor(matrix) {
    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  get matrixMarks() {
    return this._matrixMarks;
  }

  get isSuccess() {
    return this._success;
  }

  check(){
    this.checkRows();
    this.checkCols();
    this.checkBoxes();
    // 检查是否成功
    this._success = this._matrixMarks.every(row => row.every(mark => mark));
    return this._success
  }

  checkRows() {
    // this._matrixMarks = this._matrix.map(row => checkArray(row));
    for(let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = this._matrix[rowIndex];
      const marks = checkArray(row);
      for(let colIndex = 0; colIndex< marks.length; colIndex++) {
        if(!marks[colIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkCols() {
    for(let colIndex = 0; colIndex < 9; colIndex++) {
      const cols = [];
      for(let rowIndex = 0;rowIndex < 9;rowIndex++){
        cols[rowIndex] = this._matrix[rowIndex][colIndex];

        const marks = checkArray(cols);
        for(let rowIndex = 0; rowIndex < marks.length; rowIndex++){
          if(!marks[rowIndex]){
            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }

  checkBoxes() {
    for(let boxIndex = 0; boxIndex < 9; boxIndex++) {
      const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
      const marks = checkArray(boxes);
      for(let cellIndex = 0;cellIndex < 9; cellIndex++) {
        if(!marks[cellIndex]){
          const { rowIndex, colIndex} = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }
}