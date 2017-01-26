"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(".post").click(function() {
  var enterName = prompt("Enter your name", "");
  var enterComment = prompt("Enter your Comment", "");
  var commentFormat = ('<div class="comment"><div class="author">"' + enterName + '"   says:</div><div class="message">' + enterComment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
  $(".comments").append(commentFormat);
});

$(".comments").on("click", ".reply", function() {
  var enterName = prompt("Enter your name", "");
  var enterComment = prompt("Enter your Comment", "");
  var commentFormat = ('<div class="comment"><div class="author">"' + enterName + '"   says:</div><div class="message">' + enterComment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
  var $this = $(this);
  var commentDiv = $this.closest(".comment");
  var repliesDiv = commentDiv.children(".replies");
  repliesDiv.append(commentFormat);
});

$(document).ready(function() {
  $(".show-replies").hide();
})

$(".comments").on("click", ".hide-replies", function() {
  var $this = $(this);
  var commentDiv = $this.closest(".comment");
  var repliesDiv = commentDiv.children(".replies");
  repliesDiv.hide();
  $this.hide();
  var controlsDiv = $this.closest(".controls");
  var showRepliesButton = controlsDiv.children(".show-replies");
  showRepliesButton.show();
  $(showRepliesButton).text(function() {
    var replyNumber =  $(this).closest('.comment').find('.comment').length;
    return "Show Replies: " + replyNumber;
  })

});

$(".comments").on("click", ".show-replies", function() {
  var $this = $(this);
  var commentDiv = $this.closest(".comment");
  var repliesDiv = commentDiv.children(".replies");
  repliesDiv.show();
  $this.hide();
  var controlsDiv = $this.closest(".controls");
  var hideRepliesButton = controlsDiv.children(".hide-replies");
  hideRepliesButton.show();
});
