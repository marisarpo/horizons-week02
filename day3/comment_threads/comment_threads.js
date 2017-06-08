"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(document).ready(function() {
  $(".show-replies").hide();
});

$(".post").on("click", function() {
  var author = prompt("Author") || "Default User";
  var comment = prompt("Comment") || "No Comment";

  var block = $('<div class="comment"><div class="author">' + author + ' says:</div><div class="message">' + comment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div></div>');

  $('.comments').append(block);
});

$(".comments").on("click", ".reply", function() {
  var author = prompt("Author") || "Default User";
  var comment = prompt("Comment") || "No Comment";

  var block = $('<div class="comment"><div class="author">' + author + ' says:</div><div class="message">' + comment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div></div>');

  var commentDiv = $(this).closest(".comment");
  var replyDiv = commentDiv.children(".replies");
  replyDiv.append(block);
  var showDiv = replyDiv.children(".comment");
  var hello = showDiv.children(".show-replies");
  console.log(showDiv);
  if (showDiv.is("div")) {
    console.log("what");
  }

  //showDiv.hide();

});

$(".comments").on("click", ".hide-replies", function() {
  var commentDiv = $(this).closest(".comment");
  var replyDiv = commentDiv.children(".replies");
  replyDiv.hide();
});

$(".comments").on("click", ".show-replies", function() {
  var commentDiv = $(this).closest(".comment");
  var replyDiv = commentDiv.children(".replies");
  replyDiv.show();
});
