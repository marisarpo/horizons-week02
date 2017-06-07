//once returns a func
//takes 1 arg

var once=function once(fn){
  var called = false;
  var result;
  return function(){
    if (!called){
      var arg=Array.prototype.slice.call(arguments);
      result=fn.apply(null,arg);
      called = true;
    }
    remove
    return result;


  }
}


var throttle = function(fn,ms){
  var startTime = new Date.getTime()
  return function(){
    var currentTime=new Date.getTime();
    if (currentTime - startTime>ms){
      startTime=currentTime;
      return fn.apply(null,arguments);
    }      
  }
}
