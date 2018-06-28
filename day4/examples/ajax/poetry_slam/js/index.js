// YOUR CODE HERE
// See poetry_slam/index.html for instructions

$.ajax({
  url: "https://horizons-school-of-technology.github.io/week02/day4/examples/poem.txt",
  success: function(response) {
    var respStr = response;
    var respArr = respStr.split(" ");
    $("#count").text(respArr.length);
  }
});
