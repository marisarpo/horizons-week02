$.ajax({
  url: "https://horizons-school-of-technology.github.io/week02/day4/examples/poem.txt",
  success: function(resp) {
    var words = resp.split(" ");
    $("#count").text(words.length);
  }
});
