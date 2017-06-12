// write sum function

//write product function

//get arguments passed

//figure out if I should add or multiply

//change string into number

//throwing error if --product or --sum isn't the flag
var math = require('./math.js')
var sum = math.sum;
var product = math.product;
var argArray = process.argv;
var flag = argArray[2];
var total;
var input = require('./util/input.js');
if (flag === '--product' || flag === '--sum') {
  var numbers = input.inputParser(argArray);
if (flag === '--product') {
  total = product(numbers);
}

if (flag === '--sum') {
  total = sum(numbers);
}
console.log("result is", total);
} else { throw new Error("D")}
