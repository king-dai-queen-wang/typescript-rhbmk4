// 弹出操作面板

export class PopupNumbers{
  _panel;
  _targetCell;
  constructor(elementId){
    this._panel = document.querySelector(elementId);
    this.hidde();
    Array.from(this._panel.getElementsByTagName('span')).forEach(span => span.onclick = (e) => {
      debugger
      // 1-9 ,回填数字
      // mar1，mark2 回填样式
      if(e.target.classList.contains('mark1')) {
        if(this._targetCell.classList.contains('mark1')){
          this._targetCell.classList.remove('mark1');
          // e.target.classList.add('mark1');
        } else{
          this._targetCell.classList.remove('mark2');
           this._targetCell.classList.add('mark1');
        }
        // 回填样式
        return;
      }

      if(e.target.classList.contains('mark2')){
        // 回填样式
        if(this._targetCell.classList.contains('mark2')){
          this._targetCell.classList.remove('mark2');
          // e.target.classList.add('mark1');
        } else{
          this._targetCell.classList.remove('mark1');
          this._targetCell.classList.add('mark2');
        }
        return;
      }
      // empty 取消数字， 取消mark
      if(e.target.classList.contains('empty')) {
        // 清除数据和mark
        this._targetCell.innerText = 0;
        this._targetCell.classList.add('empty');
        return;
      }
      this._targetCell.classList.remove('empty');
      this._targetCell.innerText = e.target.innerText;
    });
  }

  popup(cell) {
    this._targetCell = cell;
    debugger
    const {left, top} = {left: cell.offsetLeft, top: cell.offsetTop};
    this._panel.style.left = left + 'px';
    this._panel.style.top = top + 'px';
    this.show();
  }

  show(){
    this._panel.classList.remove('hidden');
  }
  hidde(){
    this._panel.classList.add('hidden');
  }

}