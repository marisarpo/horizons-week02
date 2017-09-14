// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
var poem = $.ajax({
  url: "http://horizons-json-cors.s3.amazonaws.com/poem.txt",
}).done(function(data){
  var wordLength = data.split(' ').length;
  console.log(wordLength);
  $('#count').html(wordLength);
});
