// YOUR CODE HERE
$.ajax({
  url: "https://horizons-school-of-technology.github.io/week02/day4/examples/poem.txt",
  success: function(resp){
    var split = resp.split(" ");
    var len = split.length;
    $('#count').text(len);
  }

})
// See poetry_slam/index.html for instructions
