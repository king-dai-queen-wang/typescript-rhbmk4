import {Toolkit} from './toolkit';
// 生成熟读解决方案
export class Generator{
  orders;
  matrix;

  generate() {
    while(!this.internalGenerate()){
      // TODO
      console.log('try again');
    }
  }
  // 入口方法
  internalGenerate() {
    // 生成9*9 都为0的矩阵
    this.matrix = Toolkit.matrix.makeMatrix();
    // 随机序列
    this.orders = Toolkit.matrix.makeMatrix()
    .map(row => row.map((v, i) => i))
    .map(row => Toolkit.matrix.shuffle(row));

    for(let n = 1; n <= 9; n++) {
      if(!this.fillNumber(n)){
        return false;
      };
    }
    return true;
  }

  fillNumber(n){
    return this.fillRow(n, 0);
  }

  fillRow(n, rowIndex) {
    if(rowIndex > 8) {
      return true;
    }
    // 行数据
    const row = this.matrix[rowIndex];

    const order = this.orders[rowIndex];
    // TODO 随机选择列
    for (let i = 0; i < 9; i++) {
      const colIndex = order[i];
      // 若该位置有值则跳过
      if(row[colIndex]){
        continue;
      }

      // 检查该位置是否可以填
      if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)){
        continue;
      }

      row[colIndex] = n;

      // 去找下一行填写n， 如果没填进去则继续当前寻找当前行下一个
      if(!this.fillRow(n, rowIndex + 1)) {
        row[colIndex] = 0;
        continue;
      }

      return true;
    }
    // 填写失败
    return false;
  }
}