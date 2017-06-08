// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
  url:'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success:function(res) {
    console.log(res);
    $('body').append($('<pre>').text(res));
    var str = JSON.stringify(res);
    var wordCount = str.split(' ').length;
    $('#count').text(wordCount);
  }
})
