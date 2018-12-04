function LetterNav(options) {
  this.ele =  document.getElementById(options.ele);
  this.childEle = document.querySelectorAll('#'+options.ele + ' li');
  this.childEleHeight = this.childEle[0].offsetHeight;
  this.eleRect = this.ele.getBoundingClientRect();
  this.eleLen = this.childEle.length;
}
LetterNav.prototype = {
  constructor: LetterNav,
  showLetter () {
    this.scrollViewEvent();
  },
  scrollViewEvent () {
    this.ele.addEventListener('touchstart', (e) => {
			e.preventDefault();
		},false)
    this.ele.addEventListener('touchmove', (e) => {
      this.scrollIntoView(e);
    },false)
    this.ele.addEventListener('touchend', (e) => {
      this.scrollIntoView(e);
      for (let i = 0; i < this.eleLen; i++){
        this.childEle[i].classList.remove('item-active');
      }
    },false)
  },
  scrollIntoView (e) {
    var pointTop = e.changedTouches[0].clientY - this.eleRect.top;
    for (let i = 0; i < this.eleLen; i++){
      this.childEle[i].classList.remove('item-active');
    }
    var index = Math.floor(pointTop / this.childEleHeight);
    var pointOffetHeight = pointTop % this.childEleHeight;
    if ( index >= 0 && pointOffetHeight > this.childEleHeight / 2 && pointTop <= window.innerHeight - this.eleRect.top){
      var childEleId = this.childEle[index].dataset.id;
      if (childEleId) {
        var navRect = this.childEle[index].getBoundingClientRect();
        this.childEle[index].classList.add('item-active');
        this.clickToView(childEleId);
      }
    }
  },
  clickToView (childEleId) {
    document.getElementById('letter-'+childEleId).scrollIntoView()
    // var offsetTop = document.getElementById('letter-'+childEleId).getBoundingClientRect().top;
    // var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // document.documentElement.scrollTop = document.body.scrollTop = offsetTop + scrollTop;
  }
}








