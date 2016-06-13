window.twitter = {};

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
};

twitter.Tweet.prototype = {

	getId: function() {
		return this.id;
	}

	getDesc: function() {
		return this.desc;
	},

	setDesc: function(descStr) {
		this.desc = descStr;
	}
}

twitter.Board = function(tweets) {
	this.tweets = [];
};

twitter.Board.prototype = {

  addTweet: function(tweetDesc) {
    var newTweet = new twitter.Tweet(tweetDesc);
    this.tweets.push(newTweet);
    return newTweet.getId();
  }

};
