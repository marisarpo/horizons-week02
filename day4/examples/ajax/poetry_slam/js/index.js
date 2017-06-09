// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp){
  //  console.log($(‘<pre>’).text(resp));
    var poem = $("<pre>").text(resp);
    $("body").append(poem);
    console.log($(poem));
    var poemText = JSON.stringify(poem[0].innerText);
    var poemLength = poemText.split(" ").length;
    $("#count").text(poemLength);
  }
});
