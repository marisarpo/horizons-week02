$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp){
    console.log(resp);
    $('head').append($('<pre>').text(resp))
    var wordCount = 0;
    for(var num = 0; num < resp.length; num++){
      if(resp[num] !== ' '){

    }
    console.log(wordCount)
  }
})// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
