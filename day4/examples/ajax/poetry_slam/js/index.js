// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$(document).ready(function () {
  var count = 0;
  $.ajax({
    url: "https://horizons-json-cors.s3.amazonaws.com/poem.txt",
    success: function (data) {
      var text = $('pre').text();
      console.log(text);
      count = text.split(' ').length;
      console.log('done');
    }
  });
  console.log(count);
  $('#count').val(count);
})