function inputParser(argArray) {
  var numberArr = argArray.slice(3);
  var numbers = [];
  numberArr.forEach(function(num) {
    var current = parseInt(num);
    if (isNaN(current)) {
      throw new Error (`${num} isNaN`);
    }
    numbers.push(current);
  })
  return numbers;
}

module.exports = {
  inputParser: inputParser;
}

//what is input?

//what is output?
