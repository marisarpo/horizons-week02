twitter.mountStatic = function(){
	$('#tweetSubmit').click(function(e) {
    var tweetText = $('#tweetText').val();
    // validate input
    if (!tweetText) {
      alert("Please enter something");
      return;
    }
    list.addCart(tweetText);
    $('#tweetText').val('');
    twitter.mount();
  });
};

twitter.mount = function (list) {
	$('#listAnchor').empty();
	$('#listAnchor').append(list.render());
};