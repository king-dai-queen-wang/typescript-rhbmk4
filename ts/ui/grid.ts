// 生成九宫格
import {Toolkit} from '../core/toolkit';
import {Generator} from '../core/generator';
import {Sudoku} from '../core/sudoku';
import {Checker} from '../core/checker';
const matrix = Toolkit.matrix.makeMatrix();

export class Grid{
  _$container;

  constructor(containerId){
    this._$container = document.querySelector(containerId);
  }

  build() {
    const sudoku = new Sudoku();
    sudoku.make();
    // const matrix = sudoku.solutionMatrix;
    const matrix = sudoku.puzzleMatrix;
    const rowGroupClasses = ['row-g-top', 'row-g-middle', 'row-g-bottom'];
    const colGroupClasses = ['col-g-left', 'col-g-center', 'col-g-right'];

    // 生成所有为0 的矩阵
    // const matrix = Toolkit.matrix.makeMatrix();
    // colum -> span
    const cellEle = matrix.map(rowValues => rowValues.map((cellValue, cellIndex) => {
      const span = document.createElement('span');
      span.innerText = cellValue;
      cellValue ? span.classList.add('fixed') : span.classList.add('empty');
      span.classList.add(colGroupClasses[cellIndex % 3]);
      return span;
    }));
    // row -> div
    const divArray = cellEle.map((spanCellArray, rowIndex) => {
      const divEle = document.createElement('div');
      divEle.classList.add('row');
      divEle.classList.add(rowGroupClasses[rowIndex % 3]);
      spanCellArray.forEach(span => divEle.append(span));
      return divEle;
    })
    divArray.forEach(div => this._$container.append(div));
  }

  layout() {
    const cellEles = Array.from(this._$container.getElementsByTagName('span'));
    cellEles.forEach(cell => {
      cell.style.height = cell.clientWidth + 'px';
      cell.style.lineHeight = cell.clientWidth + 'px';
      cell.style.fontSize = cell.clientWidth < 32 ? `${cell.clientWidth / 2}`: '';
    });

  }

  bindPopup(popupNumbers){
    const spanEles = this._$container.getElementsByTagName('span');
    Array.from(spanEles).forEach(span => span.onclick = (event) => {
      const cell = event.target;
      if(cell.classList.contains('fixed')) {
        return;
      }
      popupNumbers.popup(cell);
    })
  }

  rebuild() {
    debugger
    this._$container.children = [];
    this.build();
    this.layout();
  }

  check() {
    const data = [];
    const rowsEles = this._$container.getElementsByTagName('div');
    const marixEle = Array.from(rowsEles).map(row => Array.from(row.getElementsByTagName('span')));
    data = marixEle.map(row => row.map(col => parseInt(col.innerText) || 0 ));
    console.log(data);
    const checker = new Checker(data);
    if(checker.check()) {
      return true;
    }
    // 检查不成功，进行标记
    const marks = checker._matrixMarks;
    marixEle.forEach((rowEle, rowIndex) => {
      rowEle.forEach((colEle, colIndex) => {
        if(colEle.classList.contains('fixed') || marks[rowIndex][colIndex]){
          colEle.classList.remove('error');
        } else {
          colEle.classList.add('error');
        }
      })
    })
  }

  reset() {
    const spanArray = Array.from(this._$container.getElementsByTagName('span')).filter(span => !span.classList.contains('fixed'));

    spanArray.forEach(span => {
      span.classList.remove('error');
      span.classList.remove('mark1');
      span.classList.remove('mark2');
      span.innerText = 0;
      span.classList.add('empty');
    });
  }

  clear(){
    const spanArray = Array.from(this._$container.getElementsByTagName('span')).filter(span => span.classList.contains('error'));
    spanArray.forEach(span => span.classList.remove('error'));
  }
}

