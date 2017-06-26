// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
success: function(resp){
$('body').append($('<pre>').text(resp))
}
       })
 $.ajax({
 url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
 success: function(resp){
 var string1 = resp.split(' ')
 console.log(string1)
 $('#count').html(string1.length)
 }
 })
