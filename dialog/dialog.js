function Dialog (options) {
  this.ele = document.getElementById(options.ele);
  this.confirmCallback = options.confirm;
  this.content = [options.title, options.content];
  this.contEle = ['dialog-title','dialog-content'];
  this.btnCancel = document.getElementById('dialog-cancel');
  this.btnConfirm = document.getElementById('dialog-confirm');
}

Dialog.prototype = {
  constructor: Dialog,
  cancel () {
    this.btnCancel.addEventListener('click',() => {
      this.ele.classList.remove('weiui-show');
    })
  },
  confirm () {
    this.btnConfirm.addEventListener('click',() => {
      this.ele.classList.remove('weiui-show');
      this.confirmCallback();
    })
  },
  showDialog () {
    this.ele.classList.add('weiui-show');
    this.contEle.forEach((item,index) => {
      document.getElementById(item).innerHTML = this.content[index];
    })
    this.cancel();
    this.confirm();
  }
}
