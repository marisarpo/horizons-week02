
window.twitter = window.twitter || {};

twitter.generateId = function() {
  var chunk = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return chunk() + chunk() + '-' + chunk() + '-' + chunk() + '-' +
    chunk() + '-' + chunk() + chunk() + chunk();
};


twitter.Tweet = function(desc) {
	this.id = twitter.generateId();
	this.desc = desc;
}

twitter.Tweet.prototype = {
	setDescription: function(desc) {
		return this.desc = desc;
	},

	render: function() {
		var wrapper = $('<div></div>');
		var div = $('<div class="tweets"></div>');
		var img = $('<img class="pic" src="profilepic.jpg">');
		var span = $('<span class="tweets-header"><h3 class="name">Julian Mullins</h3><p class="handle">@mullinsjulian</p><p class="date">11 June</p></span>');
		var body = $('<p class="content">'+this.desc+'</p><p class="expand">Expand</p>');

		wrapper.append(div);
		div.append(img);
		div.append(span);
		div.append(body);


		return wrapper.html();
	}
};

//popout form
$('textarea').on('click', function(evt) {
	$('.popout').empty();
	$('#enter-form').append('<span class="popout"><ul id="form-info"><li>0 Tweets</li> \
							 <li>1 Following</li><li>54,321 Followers</li></ul><button \
							 class="btn submit" type="button">Submit</button></span>');
	$('textarea').css("min-height", "100px");

	//click submit button
	$('.submit').on('click', function(evt) {
		evt.preventDefault();
		var text = $('textarea').val();
		var a = new twitter.Tweet(text);
		console.log(a);
		$('#feed').append(a.render());
		$('textarea').val("")
	});
});
