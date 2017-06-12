function inputParser(argArray){
  var numberArray = argArray.slice(3)
  var numbers = [];
  numberArray.forEach(function(num){
    var currentNumber = parseInt(num);

    if(isNaN(currentNumber)){
      throw new Error (`${num} isNan`)
    }
    numbers.push(currentNumber);
  })
  return numbers;
}

module.exports = {
  inputParser: inputParser
}
// what the input to this function// whats the output
