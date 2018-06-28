// YOUR CODE HERE
// See poetry_slam/index.html for instructions

var text = $.ajax({
  url:'https://horizons-school-of-technology.github.io/week02/day4/examples/poem.txt',
  success: function(response){
    $('#count').text(response.split(' ').length);
  }
})
