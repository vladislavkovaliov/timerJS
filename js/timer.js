// vlad kovaliov
// 1 may 2016
// timer on canvas

function Timer(options) {
  var PI2         = Math.PI / 2;
  var canvas      = null;
  var context     = null;
  var buffer      = null;
  var angleSecond = null;
  var angleMinute = null;
  var angleHour   = null;
  var angleDay    = null;
  var centerX     = null;
  var centerY     = null;
  var timer       = null;
  var currentValue = {
    day:         null,
    hour:        null,
    minute:      null,
    second:      null,
    millisecond: null
  };
  var Radius = {};

// ********** PUBLIC METHOD **************

  this.start = function init() {
    if(!checkOptions()) {
      return false;
    }
    canvas        = document.createElement('canvas');
    canvas.width  = options.width;
    canvas.height = options.height;
    options.node.appendChild(canvas);

    context = canvas.getContext('2d');
    
    centerX = canvas.offsetLeft + canvas.width  / 2;
    centerY = canvas.offsetTop  + canvas.height / 2;
    
    context.save();
    context.lineWidth = options.width / 2 * 0.2;
    
    context.strokeStyle = '#262626';
    context.beginPath();
    context.arc(centerX, centerY, Radius.second, 0, Math.PI * 2);
    context.stroke();
    
    context.strokeStyle = '#1E1E1E';
    context.beginPath();
    context.arc(centerX, centerY, Radius.minute, 0, Math.PI * 2);
    context.stroke();

    context.strokeStyle = '#161616';
    context.beginPath();
    context.arc(centerX, centerY, Radius.hour, 0, Math.PI * 2);
    context.stroke();

    context.strokeStyle = '#0E0E0E';
    context.beginPath();
    context.arc(centerX, centerY, Radius.day, 0, Math.PI * 2);
    context.stroke();

    buffer = context.getImageData(0, 0, canvas.width, canvas.height);
  }
  this.play = function() {
    timer = (options.discrete) ? 
            setInterval(updateDiscrete, 1000) :
            setInterval(updateContinues, 10);
    
  }
  this.stop = function() {
    currentValue.day    = 0;
    currentValue.hour   = 0;
    currentValue.minute = 0;
    currentValue.second = 0;
    currentValue.millisecond = (options.discrete) ?
                                null :
                                0;
    clearInterval(timer);
  }
  this.setValue = function(value) {
    if(value.days) {
      currentValue.day = value.days;
    }
    if(value.hours) {
      currentValue.hour = value.hours;
    }
    if(value.minutes) {
      currentValue.minute = value.minutes;
    }
    if(value.seconds) {
      currentValue.second = value.seconds;
    }
  }

  // ********** PRIVATE METHOD **************
  
  function updateDiscrete() {
    context.putImageData(buffer, 0, 0);
    drawDays();
    drawHours();
    drawMinutes();
    drawSeconds();
    if(currentValue.second > 0) {
      currentValue.second--;
    }
    else {
      currentValue.second = 59;
      if(currentValue.minute > 0) {
        currentValue.minute--;
      }
      else {
        currentValue.minute = 59;
        if(currentValue.hour > 0) {
          currentValue.hour--;
        }
        else {
          currentValue.hour = 23;
          if(currentValue.day > 0) {
            currentValue.day--;
          }
          else {
            stop();
          }
        }
      }
    }
  }
  function updateContinues() {
    context.putImageData(buffer, 0, 0);
    drawDays();
    drawHours();
    drawMinutes();
    drawSeconds();

    if(currentValue.millisecond > 0) {
      currentValue.millisecond -= 10;
    }
    else {
      currentValue.millisecond = 1000;
      if(currentValue.second > 0) {
        currentValue.second--;
      }
      else {
        currentValue.second = 59;
        if(currentValue.minute > 0) {
          currentValue.minute--;
        }
        else {
          currentValue.minute = 59;
          if(currentValue.hour > 0) {
            currentValue.hour--;
          }
          else {
            currentValue.hour = 23;
            if(currentValue.day > 0) {
              currentValue.day--;
            }
            else {
              stop();
            }
          }
        }
      }
    }
  }
  function drawDays() {
    context.save();
    angleDay = (options.discrete) ?
                currentValue.day * Math.PI / 500 - PI2 :
               (currentValue.day + currentValue.hour / 24) * Math.PI / 500 - PI2;
    context.lineWidth = options.width / 2 * 0.2;
    context.strokeStyle = options.colors.day;
    context.beginPath();
    context.arc(centerX, centerY, Radius.day, -PI2, angleDay);
    context.stroke();
    context.restore();
  }
  function drawHours() {
    angleHour = (options.discrete) ?
                currentValue.hour * Math.PI / 12 - PI2 :
               (currentValue.hour + currentValue.minute / 60) * Math.PI / 12 - PI2;
    context.lineWidth = options.width / 2 * 0.2;
    context.strokeStyle = options.colors.hour;
    context.beginPath();
    context.arc(centerX, centerY, Radius.hour, -PI2, angleHour);
    context.stroke();
    context.restore();
  }
  function drawMinutes() {
    angleMinute = (options.discrete) ?
                currentValue.minute * Math.PI / 30 - PI2 :
               (currentValue.minute + currentValue.second / 60) * Math.PI / 30 - PI2;
    context.lineWidth = options.width / 2 * 0.2;
    context.strokeStyle = options.colors.minute;
    context.beginPath();
    context.arc(centerX, centerY, Radius.minute, -PI2, angleMinute);
    context.stroke();
    context.restore();
  }
  function drawSeconds() {
    angleSecond = (currentValue.second + currentValue.millisecond * 0.001) * Math.PI / 30 - PI2;
    context.lineWidth = options.width / 2 * 0.2;
    context.strokeStyle = options.colors.second;
    context.beginPath();
    context.arc(centerX, centerY, Radius.second, -PI2, angleSecond);
    context.stroke();
    context.restore();
  }
  function checkOptions() {
    if(options) {
      if(!options.node) {
        return false;
      }
      if(!options.width) {
        options.width  = 200;
        options.height = 200;
      }
      if(options.discrete === undefined) {
        options.discrete         = true;
        currentValue.millisecond = 0;
      }
      else {
        if(!options.discrete) {
          currentValue.millisecond = 0;
        }
      }
      if(!options.colors) {
        options.color = {
          day: '#111',
          hour: '#444',
          minute: '#999',
          second: '#FF0'
        };
      }
      else {
        if(options.colors.day == undefined) {
          options.color.day = '#111';
        }
        if(options.colors.hour == undefined) {
          options.color.hour = '#444';
        }
        if(options.colors.minute == undefined) {
          options.color.minute = '#999';
        }
        if(options.colors.second == undefined) {
          options.color.second = '#FF0';
        }
      }
    }

    Radius.second = options.width / 2 * 0.8;
    Radius.minute = options.width / 2 * 0.6;
    Radius.hour   = options.width / 2 * 0.4;
    Radius.day    = options.width / 2 * 0.2;

    return true;
  }
}