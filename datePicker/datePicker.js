function DatePicker(options){
  this.start = options.start;
  this.end = options.end;
  this.selectYear = options.selectValue[0] - options.start;
  this.selectMonth = options.selectValue[1] - 1;
  this.selectDate = options.selectValue[2] - 1;
  this.onConfirm = options.onConfirm;
}
DatePicker.prototype = {
  constructor: DatePicker,
  showPicker () {
    document.addEventListener('touchmove', (e) => {
     //取消事件的默认动作
     e.preventDefault();
    }, false);
    var data = [];
    const daysTotal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];           //所有月份的天数
    for (var i = this.start; i <= this.end; i++) {
        var months = [];
        if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {                     //判定为闰年
            daysTotal[1] = 29;
        } else {
            daysTotal[1] = 28;
        }
        for (let j = 0; j < 12; j++) {
            var dates = [];
            for (var k = 1; k < daysTotal[j] + 1; k++) {
                var date = {
                    label: k + '日',
                    value: k
                };
                dates.push(date);
            }
            months.push({
                label: j + 1 + '月',
                value: j + 1,
                children: dates,
            });
        }
        var year = {
            label: i + '年',
            value: i,
            children: months
        };
        data.push(year);
    }
    this.selectValue = [this.selectYear, this.selectMonth, this.selectDate];
    this.renderView(data);
    this.scrollList(data);
    this.onCancel();
    this.confirm();
  },
  scrollList (data) {
    var self = this;
    this.scroll = []
    var itemHeight = $('.weui-picker__item').eq(0).height();
    var len = $('.weui-picker__group').length;
    $('.weui-picker__group').each(function(idx,item) {
      var iscroll = new IScroll(this, {
        scrollX: false
      })
      self.scroll.push(iscroll);
      iscroll.on('scrollEnd', function() {
        var result = ( -this.y / itemHeight);
        var index = parseInt(result, 10);
        var diff = result - index;
        if (diff > 0.5) index ++;
        self.selectValue[idx] = index;
        self.renderView(data);
        self.scroll[len-1].refresh();
        iscroll.scrollTo(0, -index * itemHeight);
      })
      iscroll.scrollTo(0, -self.selectValue[idx] * itemHeight);
    })
  },
  renderView (data){
    var element = ['#webui-year','#webui-month','#webui-date'];
    var tpl = [`
      <% for (var num = 0; num < 3; num++){%>
        <li></li>
      <% }%>
      <% for (var i = 0; i < data.length; i++){%>
        <li class="weui-picker__item"><%= data[i].label%></li>
      <% }%>
      <% for (var num = 0; num < 3; num++){%>
        <li></li>
      <% }%>`,
      `<% for (var num = 0; num < 3; num++){%>
         <li></li>
       <% }%>
       <% for (var j = 0; j < month.length; j++) {%>
         <li class="weui-picker__item"><%=  month[j].label%></li>
       <%}%>
       <% for (var num = 0; num < 3; num++){%>
         <li></li>
       <% }%>`,
       `<% for (var num = 0; num < 3; num++){%>
         <li></li>
       <% }%>
       <% for (var k = 0; k < date.length; k++ ){%>
         <li class="weui-picker__item"> <%=  date[k].label%></li>
       <%}%>
       <% for (var num = 0; num < 3; num++){%>
         <li></li>
       <% }%>`
    ];
    var month = data[this.selectValue[0]].children;
    var date = month[this.selectValue[1]].children;
    var renderData = [{data: data,attr: 'data'},{data: month,attr: 'month'},{data: date,attr: 'date'}]
    tpl.forEach((item,index) => {
      var render = template.compile(tpl[index]);
      var html = render({[renderData[index].attr]: renderData[index].data});
      $(element[index]).html(html);
    })
  },
  onCancel () {
    $('#weui-picker-cancel').click(() => {
      $('.weui-picker').empty();
    })
  },
  confirm () {
    var value = []
    $('#weui-picker-confirm').click(() => {
      value = this.selectValue[0] + this.start + '年' + (this.selectValue[1] + 1) + '月' + (this.selectValue[2] + 1) + '日';
      $('.weui-picker').empty();
      this.onConfirm(value);
    })
  }
}
