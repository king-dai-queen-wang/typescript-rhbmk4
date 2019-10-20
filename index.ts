 // Import stylesheets
import './style/_global.scss';
import {Grid} from './ts/ui/grid';
import {Generator} from './ts/core/generator';
import {PopupNumbers} from './ts/ui/popupnumber';
import {checkArray, Checker} from './ts/core/checker';
// const b = Array.from({length: 9}, (v, i) => i  );
// console.log(matrixToolkit.shuffle(b));

const grid = new Grid('#container');
grid.build();
grid.layout();
const popupNumber = new PopupNumbers('#popupNumbers');
grid.bindPopup(popupNumber);
document.querySelector('#check').onclick = (e) => {
  if(grid.check()){
    alert('恭喜你，大吉大利');
  };
}
document.querySelector('#reset').onclick = (e) => {
  grid.reset();
}
document.querySelector('#clear').onclick = (e) => {
  grid.clear();
}
document.querySelector('#rebuild').onclick = (e) => {
  grid.rebuild();
}