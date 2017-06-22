$.ajax({
  url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(response) {
    $('#count').text(response.length);
    $('body').append(`<pre>${response}</pre>`);
  }
});
