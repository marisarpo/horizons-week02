// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

var main = $('<p class="poem"></p>');

$.ajax({
     url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
     success: function(resp){
      $('body').append($(main).text(resp));
      var x = resp.split('').length
      $('#count').text(x)
     }

})
