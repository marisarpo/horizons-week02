$(document).ready(function(){
  $.ajax({
    url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
    success: function(resp){
      var arr = resp.split('');
      $('#count').append(arr.length);
  });
})
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
