// YOUR CODE HERE
$.ajax({
  url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp){
    var poemArr = resp.split(' ');
    var wordCount = poemArr.length;
    console.log(wordCount);

    $('#count').text(wordCount);
  }

});

// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
