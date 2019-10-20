// 弹出操作面板

export class PopupNumbers{
  _panel;
  _targetCell;
  constructor(elementId){
    this._panel = document.querySelector(elementId);
    this.hidde();
    Array.from(this._panel.getElementsByTagName('span')).forEach(span => span.onclick = (e) => {
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
        this.hidde();
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
        this.hidde();
        return;
      }
      // empty 取消数字， 取消mark
      if(e.target.classList.contains('mark3')) {
        // 清除数据和mark
        this._targetCell.innerText = 0;
        this._targetCell.classList.add('empty');
        this.hidde();
        return;
      }
      if(!this._targetCell.classList.contains('fixed')) {
        this._targetCell.classList.remove('empty');
        this._targetCell.innerText = e.target.innerText;
        this.hidde();
      }
      
      
    });
  }

  popup(cell) {
    this._targetCell = cell;
    const {left, top} = {left: cell.offsetLeft, top: cell.offsetTop};
    this._panel.style.left = left  - 50+ 'px';
    this._panel.style.top = top + 53 + 'px';
    
    

    if(this._panel.clientWidth < 126) {
      this._panel.style.left = left - 140 + 'px';
    }
    this.show();
  }

  show(){
    this._panel.classList.remove('hidden');
  }
  hidde(){
    this._panel.classList.add('hidden');
  }

}