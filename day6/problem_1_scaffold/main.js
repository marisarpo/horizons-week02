$('li').on('click', function(e) {
  var origin = $(this);
  origin.siblings().andSelf().each(function(index, elem) {
    if (origin.text() === $(elem).text()) {
      $('span').text('Index was ' + index + '!');
    }
  });
});
