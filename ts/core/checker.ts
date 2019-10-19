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

