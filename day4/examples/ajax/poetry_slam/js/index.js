var numOfWords = 0;
var arr = [];

$.ajax( {
  url: "https://horizons-json-cors.s3.amazonaws.com/poem.txt",
  success: function(resp) {
    var poem = resp.toString()
    console.log(poem);
    arr = poem.split(" ");
    console.log(arr);
    $("#count").text(arr.length);
  }
})
