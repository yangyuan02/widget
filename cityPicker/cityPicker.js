

function CityPicker(options){
  this.selectCity = options.selectCity;
  this.onConfirm = options.onConfirm;
}
CityPicker.prototype = {
  constructor: CityPicker,
  showPicker () {
    document.addEventListener('touchmove', (e) => {
     //取消事件的默认动作
     e.preventDefault();
    }, false);

    var data = window.cityList;

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

      self.scroll.push(iscroll)

      iscroll.on('scrollEnd', function() {

        var result = ( -this.y / itemHeight);

        var index = parseInt(result, 10);

        var diff = result - index;

        if (diff > 0.5) index ++;


        self.selectCity[idx] = index;

        if (idx == 0) {

          self.selectCity = [index, 0 , 0 ];

          for (var j = 1; j < len; j++) {

            self.scroll[j].scrollTo(0,0);

          }

        }

        self.renderView(data);

        for (var i = 1; i < len; i++) {

          self.scroll[i].refresh();


        }

        iscroll.scrollTo(0, -index * itemHeight);
      })
      iscroll.scrollTo(0, -self.selectCity[idx] * itemHeight);
    })
  },
  renderView (data){
    var element = ['#webui-year','#webui-month','#webui-date'];
    var tpl = [`
      <% for (var num = 0; num < 3; num++){%>
        <li></li>
      <% }%>
      <% for (var i = 0; i < province.length; i++){%>
        <li class="weui-picker__item"><%= province[i].name%></li>
      <% }%>
      <% for (var num = 0; num < 3; num++){%>
        <li></li>
      <% }%>`,
      `<% for (var num = 0; num < 3; num++){%>
         <li></li>
       <% }%>
       <% for (var j = 0; j < city.length; j++) {%>
         <li class="weui-picker__item"><%=city[j].name%></li>
       <%}%>
       <% for (var num = 0; num < 3; num++){%>
         <li></li>
       <% }%>`,
       `<% for (var num = 0; num < 3; num++){%>
         <li></li>
       <% }%>
       <% for (var k = 0; k < area.length; k++ ){%>
         <li class="weui-picker__item"> <%= area[k]%></li>
       <%}%>
       <% for (var num = 0; num < 3; num++){%>
         <li></li>
       <% }%>`
    ];

    var province = data;

    var city = province[this.selectCity[0]].city;

    var area = city[this.selectCity[1]].area;

    var renderData = [{data: data,attr: 'province'},{data: city,attr: 'city'},{data: area,attr: 'area'}]
    tpl.forEach((item,index) => {
      var render = template.compile(tpl[index]);
      var html = render({[renderData[index].attr]: renderData[index].data});
      $(element[index]).html(html);
    })
  },
  onCancel () {
    $('#weui-picker-cancel').click(() => {
    $('.weui-picker').addClass('weui-animate-slide-down').removeClass('weui-animate-slide-up');
        $('.weui-mask').hide();
    })
  },
  confirm () {
    var value = []
    $('#weui-picker-confirm').click(() => {

      var province =  cityList[this.selectCity[0]].name;

      var city = cityList[this.selectCity[0]].city[this.selectCity[1]].name;

      var area =cityList[this.selectCity[0]].city[this.selectCity[1]].area[this.selectCity[2]];

      var value = province + city + area;
      $('.weui-picker').empty();
      this.onConfirm(value);
    })
  }
}
