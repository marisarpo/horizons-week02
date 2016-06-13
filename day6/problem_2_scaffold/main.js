twitter.mountStatic = function() {

$("#savetweet").on("click", function() {
	var tweet = $("#input").val();
	if (!tweet) {
		alert("Please write a tweet.");
		return;
	}
	board.addTweet(tweet);
	$("#input").val("");
	twitter.mount(board);
})

}

twitter.mount = function(board) {
	$("#boardAnchor").empty();
	$("#boardAnchor").append(board.render());

	
}
