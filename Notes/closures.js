// once(fn) -> should return a function that can only be called once
// after(6,fn) -> should return a function that will start to run after the 6th call
// throttle(fn, ms) -> should return a function that can only be run every ms milliseconds


//once
//1. once returns a new function
//2. once takes one argument which is a function
//3. return function should only be able to be run once

var reed = true;

var once = function(fn){
  var called = false; //keep track of if we ran the function
  var returnedValue; //store the value to return after the first call

  return function () {
      if(!called) {
        called = !called // update called
        returnedValue = fn.apply(null, arguments); // call the function
        return returnedValue;
      }
      return returnedValue;
  }
}

var square = function(x) {
  return x*x;
}

var a = once(square)
a()  // run square
called = false;
a()

var b = once(square)
a() // do nothing


b() // run square




// var oncedSquared = once(square);
//
// function(6){
//
// }
//
// oncedSquared(6)
