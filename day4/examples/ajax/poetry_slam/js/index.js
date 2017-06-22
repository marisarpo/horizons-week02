$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(res){
    var length=res.split(" ").length//know the type of response: string
    $('#count').text(length)//modify the html element
  }
})
// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
