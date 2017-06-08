$( document ).ready()

$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    var poem = resp;
    var wordCount = 0

    for (var i = 0; i<poem.length; i++) {
    if (poem[i] === " ") {
    wordCount += 1
    }
  }

console.log(wordCount)

$('#count').text(wordCount)
  }
})
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
