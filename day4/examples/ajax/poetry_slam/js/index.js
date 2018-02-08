// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

function countWords(str){
  var counter = 0
  for (var i = 0; i<str.length; i++){
    if (str[i] === ' '){
      counter++
    }
  }
  counter += 1
  return counter
}

$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp){
    var words = JSON.stringify(resp)
    console.log(countWords(words))
    $('#count').text(countWords(words))
  }
})
