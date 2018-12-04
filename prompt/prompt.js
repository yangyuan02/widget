function Prompt (options) {
  this.ele = document.getElementById(options.ele);
  this.content = options.content;
}
Prompt.prototype = {
  constructor: Prompt,
  showPrompt () {
    var content = document.querySelector('.weui-dialog__bd');
    content.innerHTML = this.content;
    this.ele.classList.add('weiui-show');
    this.hidePrompt();
  },
  hidePrompt () {
    var showBtn = document.querySelector('.weui-dialog__btn');
    showBtn.addEventListener('click',() => {
      this.ele.classList.remove('weiui-show');
    },true)
  }
}
