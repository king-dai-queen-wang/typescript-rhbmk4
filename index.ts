 // Import stylesheets
import './style/_global.scss';
import {Grid} from './ts/ui/grid';
import {Generator} from './ts/core/generator';
import {checkArray} from './ts/core/checker';
// const b = Array.from({length: 9}, (v, i) => i  );
// console.log(matrixToolkit.shuffle(b));

const grid = new Grid('#container');
grid.build();
grid.layout();

const generator = new Generator();
generator.generate();
console.log(generator.matrix);


console.log(checkArray([1,2,3,4,5,6,7,8,9]))
console.log(checkArray([1,2,3,4,0,6,1,8,9]))