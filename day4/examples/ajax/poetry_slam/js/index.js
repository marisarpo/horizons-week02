// YOUR CODE HERE
// See poetry_slam/index.html for instructions
$.ajax({
  url: 'https://horizons-school-of-technology.github.io/week02/day4/examples/poem.txt',
  success: function(poem) {
    $('body').append($('<pre>').text(poem))
    var words = $.trim(poem).split(" ")
    var length = words.length
    $('#count').text(length)
  }
})
