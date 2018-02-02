"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(".show-replies").hide();

$(".post").on('click', function() {
	var name = prompt("Enter your name");
	var comment = prompt("Enter your comment");
	$(".comments").append(`<div class="comment">
  <div class="author">"` + name + `" says:</div>
  <div class="message">` + comment +` </div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);
})

$(".comments").on("click", ".reply", function() {
	var name = prompt("Enter your name");
	var comment = prompt("Enter your comment");
	var $this = $(this);
  	var commentDiv = $this.closest('.comment');
  	var repliesDiv = commentDiv.children('.replies');
  	repliesDiv.append(`<div class="comment">
  <div class="author">"` + name + `" says:</div>
  <div class="message">` + comment +` </div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);

})

$(".comments").on("click", ".hide-replies", function() {
	$(this).closest(".comment").find(".replies").hide();
	$(this).hide();
	$(this).closest(".comment").find(".show-replies").show();
})

$(".comments").on("click", ".show-replies", function() {
	$(this).closest(".comment").find(".replies").show();
	$(this).hide();
	$(this).closest(".comment").find(".hide-replies").show();

})