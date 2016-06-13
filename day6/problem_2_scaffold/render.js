twitter.Card.prototype.render = function() {
	var wrapper = $('<div></div>');
	var databoxwrapper = $('<div class="data-box"></div>');
	var databoxbody = $('<div class="data-body">'+this.tweet+'</div>');

	wrapper.append(databoxwrapper);
	databoxwrapper.append(databoxbody);
	databoxbody.append($("<p></p>")).text(this.tweet);

	return wrapper.html();
};

twitter.List.prototype.render = function() {
  // YOUR CODE HERE
  var wrapper = $('<div></div>');
  wrapper.html(this.cards.reduce(function(prev, cur) {
    return prev + cur.render();
  }, ""));
  return wrapper; 
}