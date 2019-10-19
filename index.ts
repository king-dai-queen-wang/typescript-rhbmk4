 // Import stylesheets
import './style/_global.scss';
import {Grid} from './ts/ui/grid';
import {Generator} from './ts/core/generator';
import {checkArray, Checker} from './ts/core/checker';
// const b = Array.from({length: 9}, (v, i) => i  );
// console.log(matrixToolkit.shuffle(b));

const grid = new Grid('#container');
grid.build();
grid.layout();

const generator = new Generator();
generator.generate();
const matrix = generator.matrix;
const checker = new Checker(matrix);
console.log('checkResult', checker.check());
console.log(checker.matrixMarks);

matrix[1][1] = 0;
matrix[2][3] = matrix[3][5] = 5;
const checker2 = new Checker(matrix);
console.log('check result',checker2.check());
console.log(checker2.matrixMarks);