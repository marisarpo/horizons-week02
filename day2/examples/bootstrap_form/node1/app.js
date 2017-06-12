// write a sum function
// write a product function
// get the arguments that are passed

// figure out if I should add or multiply numbers
// change string into numbers
//throw an error if --product or --sum is not the flag

var math = require('./math.js')
var input = require('./input.js')
var sum= math.sum;
var product = math.product;
var argArray = process.argv
var flag= argArray[2];

if((flag === '--product') || (flag ==='sum')){
  var total;
  var numbers = input.inputParser(argArray);
  if(flag === '--product'){
    total = product(numbers);
  }

  if( flag === '--sum'  ){
    total= sum(numbers);
  }
}

else{
  throw  new Error('no flag was given')
}
  console.log("the result is " + total)
