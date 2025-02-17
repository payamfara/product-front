function gregorian_to_jalali(gy,gm,gd){
    var g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
    var jy=(gy<=1600)?0:979;
    gy-=(gy<=1600)?621:1600;
    var gy2=(gm>2)?(gy+1):gy;
    var days=(365*gy) +(parseInt((gy2+3)/4)) -(parseInt((gy2+99)/100))
      +(parseInt((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
    jy+=33*(parseInt(days/12053));
    days%=12053;
    jy+=4*(parseInt(days/1461));
    days%=1461;
    jy+=parseInt((days-1)/365);
    if(days > 365)days=(days-1)%365;
    var jm=(days < 186)?1+parseInt(days/31):7+parseInt((days-186)/30);
    var jd=1+((days < 186)?(days%31):((days-186)%30));
    return [jy,jm,jd];
  }
  function jalali_to_gregorian(jy,jm,jd){
    var gy=(jy<=979)?621:1600;
    jy-=(jy<=979)?0:979;
    var days=(365*jy) +((parseInt(jy/33))*8) +(parseInt(((jy%33)+3)/4))
      +78 +jd +((jm<7)?(jm-1)*31:((jm-7)*30)+186);
    gy+=400*(parseInt(days/146097));
    days%=146097;
    if(days > 36524){
      gy+=100*(parseInt(--days/36524));
      days%=36524;
      if(days >= 365)days++;
    }
    gy+=4*(parseInt((days)/1461));
    days%=1461;
    gy+=parseInt((days-1)/365);
    if(days > 365)days=(days-1)%365;
    var gd=days+1;
    var sal_a=[0,31,((gy%4==0 && gy%100!=0) || (gy%400==0))?29:28,31,30,31,30,31,31,30,31,30,31];
    var gm
    for(gm=0;gm<13;gm++){
      var v=sal_a[gm];
      if(gd <= v)break;
      gd-=v;
    }
    return [gy,gm,gd];
  }
  
  // Cache original `Date` class. User may set window.Date = JDate
  var Date = window['Date'];
  
  function digits_fa2en(text) {
    return text.replace(/[غ°-غ¹]/g, function (d) {
      return String.fromCharCode(d.charCodeAt(0) - 1728);
    });
  }
  function pad2(number) {
    return number < 10 ? '0' + number: number;
  }
  function parseDate(string, convertToPersian) {
    /*
     http://en.wikipedia.org/wiki/ISO_8601
     http://dygraphs.com/date-formats.html
     https://github.com/arshaw/xdate/blob/master/src/xdate.js#L414
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
     tests:
     +parseDate('2014') == +new Date('2014')
     +parseDate('2014-2') == +new Date('2014-02')
     +parseDate('2014-2-3') == +new Date('2014-02-03')
     +parseDate('2014-02-03 12:11') == +new Date('2014/02/03 12:11')
     +parseDate('2014-02-03T12:11') == +new Date('2014/02/03 12:11')
     parseDate('2014/02/03T12:11') == undefined
     +parseDate('2014/02/03 12:11:10.2') == +new Date('2014/02/03 12:11:10') + 200
     +parseDate('2014/02/03 12:11:10.02') == +new Date('2014/02/03 12:11:10') + 20
     parseDate('2014/02/03 12:11:10Z') == undefined
     +parseDate('2014-02-03T12:11:10Z') == +new Date('2014-02-03T12:11:10Z')
     +parseDate('2014-02-03T12:11:10+0000') == +new Date('2014-02-03T12:11:10Z')
     +parseDate('2014-02-03T10:41:10+0130') == +new Date('2014-02-03T12:11:10Z')
     */
    var re = /^(\d|\d\d|\d\d\d\d)(?:([-\/])(\d{1,2})(?:\2(\d|\d\d|\d\d\d\d))?)?(([ T])(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|([+-])(\d{2})(?::?(\d{2}))?)?)?$/,
      match = re.exec(string);
    // re.exec('2012-4-5 01:23:10.1111+0130')
    //  0                              1       2    3    4    5                      6    7     8     9     10      11       12   13    14
    // ["2012-4-5 01:23:10.1111+0330", "2012", "-", "4", "5", " 01:23:10.1111+0130", " ", "01", "23", "10", "1111", "+0330", "+", "03", "30"]
    if (!match) return;
    var separator = match[2],
      timeSeparator = match[6],
      year = +match[1],
      month = +match[3] || 1,
      day = +match[4] || 1,
      isISO = (separator != '/') && (match[6] != ' '),
      hour = +match[7] || 0,
      minute = +match[8] || 0,
      seconds = +match[9] || 0,
      millis = +('0.' + (match[10] || '0')) * 1000,
      tz = match[11],
      isNonLocal = isISO && (tz || !match[5]),
      tzOffset = (match[12] == '-' ? -1 : 1) * ((+match[13] || 0) * 60 + (+match[14] || 0));
    // timezone should be empty if dates are with / (2012/1/10)
    if ((tz || timeSeparator == 'T') && !isISO) return;
    // one and only-one of year/day should be 4-chars (2012/1/10 vs 10/1/2012)
    if ((day >= 1000) == (year >= 1000)) return;
    if (day >= 1000) {
      // year and day only can be swapped if using '/' as separator
      if (separator == '-') return;
      day = +match[1];
      year = day;
    }
    if (convertToPersian) {
      var persian = jalali_to_gregorian(year, month, day);
      year = persian[0];
      month = persian[1];
      day = persian[2];
    }
    var date = new Date(year, month - 1, day, hour, minute, seconds, millis);
    if (isNonLocal) {
      date.setUTCMinutes(date.getUTCMinutes() - date.getTimezoneOffset() + tzOffset);
    }
    return date;
  }
  
  /**
   * @param {Object=} a ,may have different types for different semantics: 1) string: parse a date
   * 		2) Date object: clone a date object  3) number: value for year
   * @param {Number=} month
   * @param {Number=} day
   * @param {Number=} hour
   * @param {Number=} minute
   * @param {Number=} second
   * @param {Number=} millisecond
   * @constructor
   * @extends {Date}
   */
  function JDate(a, month, day, hour, minute, second, millisecond) {
    if (typeof a == 'string') {
      this._d = parseDate(digits_fa2en(a), true);
      if (!this._d) throw 'Cannot parse date string'
    } else if (arguments.length == 0)
      this._d = new Date();
    else if (arguments.length == 1) {
      this._d = new Date((a instanceof JDate)?a._d:a);
    } else {
      var persian = jalali_to_gregorian(a, (month || 0) + 1, day || 1);
      this._d = new Date(persian[0], persian[1] - 1, persian[2], hour || 0, minute || 0, second || 0, millisecond || 0);
    }
    this['_date'] = this._d;
    this._cached_date_ts = null;
    this._cached_date = [0, 0, 0];
    this._cached_utc_date_ts = null;
    this._cached_utc_date = [0, 0, 0];
  }
  
  JDate.prototype = {
    /**
     * returns current Jalali date representation of internal date object, eg. [1394, 12, 5]
     * Caches the converted Jalali date for improving performance
     * @returns {Array}
     */
    _persianDate: function () {
      if (this._cached_date_ts != +this._d) {
        this._cached_date_ts = +this._d;
        this._cached_date = gregorian_to_jalali(this._d.getFullYear(), this._d.getMonth() + 1, this._d.getDate());
      }
      return this._cached_date
    },
    /**
     * Exactly like `_persianDate` but for UTC value of date
     */
    _persianUTCDate: function () {
      if (this._cached_utc_date_ts != +this._d) {
        this._cached_utc_date_ts = +this._d;
        this._cached_utc_date = gregorian_to_jalali(this._d.getUTCFullYear(), this._d.getUTCMonth() + 1, this._d.getUTCDate());
      }
      return this._cached_utc_date
    },
    /**
     *
     * @param which , which component of date to change? 0 for year, 1 for month, 2 for day
     * @param value , value of specified component
     * @param {Number=} dayValue , change the day along-side specified component, used for setMonth(month[, dayValue])
     */
    _setPersianDate: function (which, value, dayValue) {
      var persian = this._persianDate();
      persian[which] = value;
      if (dayValue !== undefined) {
        persian[2] = dayValue;
      }
      var new_date = jalali_to_gregorian(persian[0], persian[1], persian[2]);
      this._d.setFullYear(new_date[0]);
      this._d.setMonth(new_date[1] - 1, new_date[2]);
    },
    /**
     * Exactly like `_setPersianDate`, but operates UTC value
     */
    _setUTCPersianDate: function (which, value, dayValue) {
      var persian = this._persianUTCDate();
      if (dayValue !== undefined) {
        persian[2] = dayValue;
      }
      persian[which] = value;
      var new_date = jalali_to_gregorian(persian[0], persian[1], persian[2]);
      this._d.setUTCFullYear(new_date[0]);
      this._d.setUTCMonth(new_date[1] - 1, new_date[2]);
    }
  };
  // All date getter methods
  JDate.prototype['getDate'] = function () {
    return this._persianDate()[2]
  };
  JDate.prototype['getMonth'] = function () {
    return this._persianDate()[1] - 1
  };
  JDate.prototype['getFullYear'] = function () {
    return this._persianDate()[0]
  };
  JDate.prototype['getUTCDate'] = function () {
    return this._persianUTCDate()[2]
  };
  JDate.prototype['getUTCMonth'] = function () {
    return this._persianUTCDate()[1] - 1
  };
  JDate.prototype['getUTCFullYear'] = function () {
    return this._persianUTCDate()[0]
  };
  // All date setter methods
  JDate.prototype['setDate'] = function (dayValue) {
    this._setPersianDate(2, dayValue)
  };
  JDate.prototype['setFullYear'] = function (yearValue) {
    this._setPersianDate(0, yearValue)
  };
  JDate.prototype['setMonth'] = function (monthValue, dayValue) {
    this._setPersianDate(1, monthValue + 1, dayValue)
  };
  JDate.prototype['setUTCDate'] = function (dayValue) {
    this._setUTCPersianDate(2, dayValue)
  };
  JDate.prototype['setUTCFullYear'] = function (yearValue) {
    this._setUTCPersianDate(0, yearValue)
  };
  JDate.prototype['setUTCMonth'] = function (monthValue, dayValue) {
    this._setUTCPersianDate(1, monthValue + 1, dayValue)
  };
  /**
   * The Date.toLocaleString() method can return a string with a language sensitive representation of this date,
   * so we change it to return date in Jalali calendar
   */
  JDate.prototype['toLocaleString'] = function () {
    return this.getFullYear() + '/' + pad2(this.getMonth() + 1) + '/' + pad2(this.getDate()) + ' ' +
      pad2(this.getHours()) + ':' + pad2(this.getMinutes()) + ':' + pad2(this.getSeconds());
  };
  /**
   * The Date.now() method returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
   */
  JDate['now'] = Date.now;
  /**
   * parses a string representation of a date, and returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
   */
  JDate['parse'] = function (string) {
    new JDate(string)['getTime']()
  };
  /**
   * The Date.UTC() method accepts the same parameters as the longest form of the constructor, and returns the number of
   * milliseconds in a Date object since January 1, 1970, 00:00:00, universal time.
   */
  JDate['UTC'] = function (year, month, date, hours, minutes, seconds, milliseconds) {
    var d = jalali_to_gregorian(year, month + 1, date || 1);
    return Date.UTC(d[0], d[1] - 1, d[2], hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
  };
  // Proxy all time-related methods to internal date object
  var i, dateProps = ('getHours getMilliseconds getMinutes getSeconds getTime getUTCDay getUTCHours ' +
      'getTimezoneOffset getUTCMilliseconds getUTCMinutes getUTCSeconds setHours setMilliseconds setMinutes ' +
      'setSeconds setTime setUTCHours setUTCMilliseconds setUTCMinutes setUTCSeconds toDateString toISOString ' +
      'toJSON toString toLocaleDateString toLocaleTimeString toTimeString toUTCString valueOf getDay')
      .split(' '),
    createWrapper = function (k) {
      return function () {
        return this._d[k].apply(this._d, arguments)
      }
    };
  
  for (i = 0; i < dateProps.length; i++)
    JDate.prototype[dateProps[i]] = createWrapper(dateProps[i]);
  // Export `JDate` class to global scope
  window['JDate'] = JDate;
  