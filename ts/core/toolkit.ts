export const matrixToolkit =  {
  makeRow(v = 0) {
      const array = new Array(9);
      array.fill(v);
      return array;
  },

  makeMatrix(v = 0) {
    /**
     * https://baijiahao.baidu.com/s?id=1621925731894454838&wfr=spiderfor=pc
     * 数组也是对象
     * 当我们使用对象来填充一个数组的时候，数组里面的每个索引处填充的值指向的都是这同一个对象，所以如果我们修改对象的时候 
     * 它将会把数组中的所有值都改变掉，大多数情况下这都不是我们想要的行为。所以如果想要填充对象的话，得需要借助 map 来为每一个槽位单独填充对象才可以
      const array = new Array(9);
      array.fill(makeRow(v));
      return array;
    * 
    **/ 
    /**
     * 为了避免上面的问题，可以使用 Array.from (伪数组)
     * return Array.from(
        {length: 9}
      ).map(() => makeRow(v));
      简写为下面
    **/ 
    //from() 方法用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组。如果对象是数组返回 true，否则返回 false。
    // Array.from(object, mapFunction, thisValue)
    // mapFunction	可选，数组中每个元素要调用的函数。
    return Array.from(
      {length: 9}, () => this.makeRow(v)
    )
  },

  shuffle(array) {
    const endIndex = array.length - 1;
    for(let i = 0; i<= endIndex; i++) {
      const key  = i + Math.floor(Math.random() * (array.length - i));
      // let buf = array[i][key];
      // array[i][key] = array[i][i];
      // array[i][i] = buf;
      [array[i], array[key]] = [array[key], array[i]];
    }
    return array;
  },

  /**
   * 检查是否可以填写n，即所处位置在行列宫有没有重复
   */
  checkFillable(matrix, n, rowIndex, colIndex) {
    const row = matrix[rowIndex];
    // 列信息
    const column = this.makeRow().map((v, i) => matrix[i][colIndex]);

    // 宫信息
    const { boxIndex } = boxToolkit.converToBoxIndex(rowIndex, colIndex);

    const box = boxToolkit.getBoxCells(matrix, boxIndex);
    for(let i = 0; i < 9; i++) {
      if(row[i] === n || column[i] === n || box[i] === n){
        return false;
      }
    }
    return true;
  }
  
}


/**
 * 宫坐标系工具
 *
 **/ 

const boxToolkit = {

  getBoxCells(matrix, boxIndex) {
    const startRowIndex = Math.floor(boxIndex /3) * 3;
    const startColIndex = boxIndex % 3* 3;
    const result = [];
    // 宫内的序号 cellIndex
    for(let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const rowIndex = startRowIndex + Math.floor( cellIndex / 3);
      const colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }
    return result;
  },

  // TODO
  converToBoxIndex(rowIndex, colIndex){
    return {
      boxIndex: Math.floor(rowIndex /3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  },

  convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  }
}

// 工具集
export class Toolkit {
  // 矩阵和数据相关的工具
  static get matrix() {
    return matrixToolkit;
  }

  // 宫坐标系相关的工具
  static get box() {
    return boxToolkit
  }
}