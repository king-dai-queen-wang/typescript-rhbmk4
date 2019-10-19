 // Import stylesheets
import './style/_global.scss';
import {Grid} from './ts/ui/grid';
import {Generator} from './ts/core/generator';
// const b = Array.from({length: 9}, (v, i) => i  );
// console.log(matrixToolkit.shuffle(b));

const grid = new Grid('#container');
grid.build();
grid.layout();

const generator = new Generator();
generator.generate();
console.log(generator.matrix);