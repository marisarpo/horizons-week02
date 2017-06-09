$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    $('body').append($('<pre>').text(resp))

    var count = 0;
    for (var i = 0; i < resp.length; i++) {
      if (resp[i] === ' ' && resp[i + 1] !== ' ')
        count++;
    }

    $('#count').text(count);


  }
})
