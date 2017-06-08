// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
  url:'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success:function(resp){
    var myText = resp;
    $('body').append($('<pre>').text(myText))
    var words = myText.split(" ");
    var count = words.length;
    console.log(count);
    $('#count').text(count);
  }




})
