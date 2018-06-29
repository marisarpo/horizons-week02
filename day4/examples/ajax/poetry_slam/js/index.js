// YOUR CODE HERE
// See poetry_slam/index.html for instructions
$.ajax({
  url: 'https://horizons-school-of-technology.github.io/week02/day4/examples/poem.txt',
  success: function(resp) {
  var arr = resp.split(" ")
  // console.log(arr)
  var numberOfWords = arr.length
  $("#count").text(numberOfWords)
  // console.log(typeof resp)
  }
})
