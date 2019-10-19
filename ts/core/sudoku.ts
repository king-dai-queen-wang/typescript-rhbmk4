// 生成数组游戏

// 1.生成完成的解决方案，Generator

// 2.随机去除部分数据，按比例

import {Generator} from './generator';

export class Sudoku{
  solutionMatrix;
  puzzleMatrix;
  constructor() {
    // 生成解决方案
    const generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  make(level = 5){
    // 5/9 概率返回0，剩下概率返回cell
    this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => {
      const shouldRid = Math.random() * 9 < level;
      return shouldRid ? 0: cell;
    }))
  }
}