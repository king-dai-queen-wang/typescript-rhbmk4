// 生成九宫格
import {Toolkit} from '../core/toolkit';
import {Generator} from '../core/generator';
const matrix = Toolkit.matrix.makeMatrix();

export class Grid{
  _$container;

  constructor(containerId){
    this._$container = document.querySelector(containerId);
  }

  build() {
    const generator = new Generator();
    generator.generate();
    const matrix = generator.matrix;
    const rowGroupClasses = ['row-g-top', 'row-g-middle', 'row-g-bottom'];
    const colGroupClasses = ['col-g-left', 'col-g-center', 'col-g-right'];

    // 生成所有为0 的矩阵
    // const matrix = Toolkit.matrix.makeMatrix();
    // colum -> span
    const cellEle = matrix.map(rowValues => rowValues.map((cellValue, cellIndex) => {
      const span = document.createElement('span');
      span.innerText = cellValue;
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
}

