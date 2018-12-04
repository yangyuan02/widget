function TextScroll (options) {
  this.ele = document.getElementById(options.ele);
  this.childEle = this.ele.getElementsByTagName('li');
  this.index = 0;
  this.childHeight = this.childEle[0].offsetHeight;
  this.autoTime = options.autoTime || 2000;
  this.iNow = 0;
}

TextScroll.prototype = {
  constructor: TextScroll,
  showText () {
    var firstChildEle = this.ele.firstElementChild.cloneNode(true);
    this.ele.appendChild(firstChildEle);
    this.eleLen = this.childEle.length;
    setInterval(() => {
      this.autoScroll();
    },this.autoTime);
  },
  autoScroll () {
    if (this.eleLen < 2) {
      return;
    }
    this.index ++;
    this.ele.style.transition = 'transform .3s ease-in';
    this.ele.style.transform = 'translateY(' + (-this.childHeight * this.index) + 'px)';
    setTimeout(() => {
      if (this.index == this.eleLen - 1) {
        this.ele.style.transition = 'none';
        this.ele.style.transform = 'translateY(0)';
        this.index = 0;
      }
    },310);

  }
}
