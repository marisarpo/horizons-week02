// _.once(fn) -> should return a function that can only be run once
// after(6, fn) -> should return a function that will start to run after the 6th call (on the 7th call)
// throttle(fn, ms) -> should return a unction that can only be run every ms milliseconds
// don't optimize code while you are writing it --> biggest mistake for google interviews --> just write what works first

// once
// 1. once is a function that returns a new function -> mean it is a closure cause you have a funciton that returns a function
// 2. once takes one argument which is a function
// 3. the return function should only be able to be run once
// everytime you run once it gives you a new function
// variable1 should be undefined when you call once(fn)() but because of closure you have a copy of the captured variables
// var fun1 = once(fn) var fun2 = once(fn) calling fun1 won't effect closed variabled of fun2

// Final Version of Once

// when ever you have a function that returns a function you want to store it in a new variable to be useful

var once = function(fn) {
  var called = false; // going to keep track of if we ran the function
  var returnedValue = null; // store the value to return after the first call
  return function inner() { // inner name is optional
    if (!called) { // only call it if it is not called
      called = !called; // update called
      returnedValue = fn.apply(null, arguments) // run the function and store the answer
      return returnedValue; // return answer (optional) delete it at the end to clean it up
    }
    return returnedValue; // returns the storeed value that was called first no matter what, it doesn't care about the arguments
  }
}


var once = function(fn) {
  var called = false; // going to keep track of if we ran the function
  return function inner() { // inner name is optional
    if (!called) { // only call it if it is not called
      called = !called; // update called
      return fn.apply(null, arguments) // call the function
    }
  }
}


// Version 2

var once = function(fn) {
  var called = false; // going to keep track of if we ran the function
  return function inner() { // inner name is optional
    fn.apply(null, arguments)
    called = !called;
  }
}

var oncedSquared = once(square); // onceSquared should take in a number

// oncedSquared
function() {
  square.apply(null, arguments);
  called = !called
}
oncedSquared(6) // the 6 would be passed in with apply



// Version 1


var once = function(fn) {
  var called = false; // going to keep track of if we ran the function
  return function inner() { // inner name is optional
    fn();
    called = !called;
  }
}

var square = function(x) {
  return x * x;
}

var oncedSquared = once(square); // onceSquared should take in a number

// oncedSquared
function() {
  square();
  called = !called
}
oncedSquared(6) // the 6 wouldnt be passed in


// After

// after(6, fn) -> should return a function that will start to run after the 6th call (on the 7th call)

// 1. after is a function that returns a new function
// 2. after takes two arguments, first is a number and the second is a function
// 3. the returned function should only start running after num times

var after = function(num, fn) {
  // arguments here represent num and fn
  var counter = 0;
  return function() {
    counter++; // counting the times the outer function runs before the inner function runs
    if (counter > num) { //num and fn are captured variables
      return fn.apply(null, arguments); // arguments here don't represent num and fn they represent to what is passed in later
    }
  }
}

var square = function(x) {
  return x * x;
}
