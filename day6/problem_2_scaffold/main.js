window.simpleTwitter = window.simpleTwitter || {};

simpleTwitter.mountStatic = function(board) {

};

simpleTwitter.mount = function(board) {

};

simpleTwitter.Post = function() {
	this.msg = $(".msgInputField").val();
};

simpleTwitter.Post.prototype = {
	getMessage: function() {
		return this.msg;
	},
	setMessage: function(msg) {
		this.msg = msg;
	},
	render: function() {

	}
}

simpleTwitter.Board = function() {
	this.posts = [];
};

simpleTwitter.Board.prototype = {
	addPost: function(msg) {

	}
}
