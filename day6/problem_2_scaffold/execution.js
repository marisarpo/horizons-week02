twitter.mountStatic = function(){
	$('#tweetSubmit').click(function(e) {
    var tweetText = $('#tweetText').val();
    console.log(tweetText);
    // validate input
    if (!tweetText) {
      alert("Please enter something");
      return;
    }
    list.addTweet(tweetText);
    $('#tweetText').val('');
    twitter.mount(list);
  });
};

twitter.mount = function (list) {
	$('#listAnchor').empty();
	$('#listAnchor').append(list.render());
};