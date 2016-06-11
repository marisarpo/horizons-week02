
render = function(ind) {
  // build wrappers
  var wrapper = $('<div></div>');
  var textwrapper = $('<div class="txt"></div>');
  var text = $('<div class="txt-body" txt-id = "'+ind+'">That was div index'+ind+'</div>');

  wrapper.append(textwrapper);
  textwrapper.append(text);

  return wrapper.html();
};

// on clicking, you should print out the index on to the page

 $('.names').click(function(evt){
    var index = $(evt.target).attr('ind');
    var html = render(index);
    $('#txt-insert').empty();
    $('#txt-insert').append(html);
  });
