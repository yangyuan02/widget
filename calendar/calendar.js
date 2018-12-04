function Calendar(options) {
  this.date = new Date();
  this.year = this.date.getFullYear();
  this.month = this.date.getMonth();
  this.day = this.date.getDate();
  this.calc = document.getElementById('calc');
  this.monthsNum = options.monthsNum || 2;
}
Calendar.prototype = {
  constructor: Calendar,
  isLeapYear: function (year) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      }
    } else if (year % 4 === 0) {
      return true;
    }
    return false;
  },
  getDaysInMonth: function (year, month) {
    var leapYearDay = this.isLeapYear(year) ? 29 : 28;
    return [31, leapYearDay, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  },
  parseNumber: function (number) {
    if (number < 10) {
      return '0' + number
    } else {
      return number + '';
    }
  },
  specialDate: function() {
    var startMonth = this.parseNumber(this.month+1);
    var startDay = this.parseNumber(this.day);
    var today = startMonth+startDay;

    var tomorrow = startMonth+this.parseNumber(parseInt(this.day) + 1);
    var afterTomorrow = startMonth+this.parseNumber(parseInt(this.day) + 2);
    var holiday = {
      [today]: '今日',
      [tomorrow]: '明天',
      [afterTomorrow]: '后天',
      '0101': '元旦节',
      '0214': '情人节',
      '0405': '清明节',
      '0501': '劳动节',
      '0601': '儿童节',
      '0910': '教师节',
      '1001': '国庆节',
      '1225': '圣诞节'
    }
    return holiday;
  },
  getMonthsNum: function() {
    var monthsResult = [];
    var month = this.month;
    var year = this.year;
    for (var i = 0; i <= this.monthsNum; i++) {
      var firstday = new Date(year,month,1).getDay(); //当月第一天Date资讯
      if (month == 12) {
        month = 0
        year += 1
      }
      monthsResult.push({
        year: year,
        month: month,
        firstday: firstday,
        rows: Math.ceil((this.getDaysInMonth(year,month) + firstday)/7),
        days: this.getDaysInMonth(year, month)
      })
      month++;
    }
    return monthsResult;
  },
  showCaclendar: function() {
    var monthNum = this.getMonthsNum();
    var specialDate = this.specialDate();
    var html = '';
    monthNum.forEach(function(item) { //表格的行
      html += '<div class="ui-calendar-title">'+item.year+ '年'+this.parseNumber(item.month+1)+'月</div>';
        html += '<table class="ui-calendar-item">';
          for (var i = 0; i < item.rows;i++){
            this.renderView += '<tr>';
              for(k = 0;k < 7;k++) {
                var index = i * 7 + k;
                day = index - item.firstday + 1;
                if (day <= 0 || day > this.getDaysInMonth(item.year,item.month)) {
                   day = ""
                }
                var getMonth = this.parseNumber(item.month+1);
                var getDay = this.parseNumber(day);
                var isHoliday =  specialDate[ getMonth + ''+ getDay ];
                var date = isHoliday ? isHoliday : day;
                var calcClass = isHoliday ? 'day3' : '';
                var getDate = item.year+'-' + getMonth + '-' +getDay;
                if (date) {
                    html += '<td class = "js_calc '+calcClass+'" data-date = "'+getDate+'"><span>' + date + '</span></td>';
                } else {
                    html += '<td class = "calcClass"><span></span></td>';
                }

              }
            html += '</tr>';
          }
         html += '</table>';
    },this)
    this.calc.innerHTML = html;
    var calcBtn = document.querySelectorAll('.js_calc');
    for (var i = 0; i < calcBtn.length; i++) {
      calcBtn[i].addEventListener('click',function(){
        console.log(this.dataset.date);
      },false)
    }
  }
}
