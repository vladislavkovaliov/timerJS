// vlad kovaliov
// 1 may 2016
// timer on canvas

// Constructor
function Timer() {
  this.PI2         = Math.PI / 2;
  this.canvas      = null;
  this.context     = null;
  this.buffer      = null;
  this.angleSecond = null;
  this.angleMinute = null;
  this.angleHour   = null;
  this.angleDay    = null;
  this.centerX     = null;
  this.centerY     = null;
  this.timer       = null;
  this.currentValue = {
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null
  };
  this.Radius = {};
};

Timer.prototype.init = function() {
    if(!isOptions()) {
      return false;
    }
    canvas        = document.createElement('canvas');
    canvas.width  = options.width;
    canvas.height = options.height;
    options.node.appendChild(canvas);

    context = canvas.getContext('2d');

    centerX = canvas.offsetLeft + canvas.width / 2;
    centerY = canvas.offsetTop + canvas.height / 2;
    
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

    return this;
};

Timer.prototype.play = function() {

};

Timer.prototype.stop = function() {

};

Timer.prototype.updateDiscrete = function() {

};

Timer.prototype.updateContinues = function() {

};

Timer.prototype.drawDays = function() {

};

Timer.prototype.drawHours = function() {

};

Timer.prototype.drawMinutes = function() {

};

Timer.prototype.drawSeconds = function() {

};

Timer.prototype.setValue = function() {

};

Timer.prototype.isOptions = function() {

};