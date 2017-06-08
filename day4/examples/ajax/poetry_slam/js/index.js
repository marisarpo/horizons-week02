// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
  url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    $("body").append($("<pre>").text(resp));
    var poem = $("<pre>").text(resp);
    var poemText = JSON.stringify(poem[0].innerText);
    var count = poemText.split(" ").length;
    $("#count").text(count);
  }
})
