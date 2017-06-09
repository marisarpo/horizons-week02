// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
var poem= $.ajax({
  url:"http://horizons-json-cors.s3.amazonaws.com/poem.txt",
  success:function(resp){

    //$('body').append($('<pre>').text(resp))


    var number =resp.split(" ").length;
    

    $('#count').text(number);
  }
})
