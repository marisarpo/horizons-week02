// YOUR CODE HERE
// See poetry_slam/index.html for instructions
$.ajax({
  url: "https://horizons-school-of-technology.github.io/week02/day4/examples/poem.txt",
  success: function (response)
  {
    $("body").append($("<pre>").text(response));
    var poemArr = response.split(" ");
    console.log(poemArr);
    var wordCount = poemArr.length;
    console.log(wordCount);
    $("#count").text(wordCount);
  }
})


