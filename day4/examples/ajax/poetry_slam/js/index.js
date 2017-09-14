// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    $('#count').text(WordCount(resp));
  }
})

function WordCount(str) {
  var totalSoFar = 0;
  for (var i in str)
    if (str[i] === " ") { // if a space is found in str
      totalSoFar += 1; // add 1 to total so far
  }
  totalSoFar += 1; // add 1 to totalsoFar to account for extra space since 1 space = 2 words
  return totalSoFar;
}
