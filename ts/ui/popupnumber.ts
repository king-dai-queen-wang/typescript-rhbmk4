// 弹出操作面板

export class PopupNumbers{
  _panel;
  constructor(elementId){
    this._panel = document.querySelector(elementId);
    this._panel.classList.remove('hidden');
  }

  popup(cell) {
    const {left, top} = cell.position();
    this._panel.style.left = left;
    this._panel.style.top = top;
    this._panel.show();
  }

}