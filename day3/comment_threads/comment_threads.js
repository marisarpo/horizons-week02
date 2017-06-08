"use strict";

$(".show-replies").hide();
$(".post").on("click", function () {
  var author = window.prompt("Enter your name");
  var comment = window.prompt("Enter your comment");
  var element = $('<div class = "comment">' + '<div class="author">' + author + ' says:</div>' +
    '<div class="message">' + comment + '</div>' +
    '<div class = "controls">' +
    '<button class = "hide-replies btn btn-default" > Hide Replies </button>' +
    '<button class = "show-replies btn btn-default" > Show Replies </button>' +
    '<button class = "reply btn btn-default" > Reply </button> ' +
    '</div> ' +
    '<div class = "replies" > </div>' +
    '</div>');
  $('.comments').append(element);
});

$(".comments").on("click", ".reply", function () {
  var author = window.prompt("Enter your name");
  var comment = window.prompt("Enter your comment");
  var element = $('<div class = "comment">' + '<div class="author">' + author + ' says:</div>' +
    '<div class="message">' + comment + '</div>' +
    '<div class = "controls">' +
    '<button class = "hide-replies btn btn-default" > Hide Replies </button>' +
    '<button class = "show-replies btn btn-default" > Show Replies </button>' +
    '<button class = "reply btn btn-default" > Reply </button> ' +
    '</div> ' +
    '<div class = "replies" > </div>' +
    '</div>');

  var $this = $(this);
  var commentBox = $this.closest('.comment');
  var repliesBox = commentBox.children('.replies');
  repliesBox.append(element);
});


$(".comments").on("click", ".hide-replies", function () {
  var $this = $(this);
  var commentBox = $this.closest('.comment');
  var repliesBox = commentBox.children('.replies');
  var showRepliesButton = commentBox.children('.controls').children('.show-replies');
  var hideRepliesButton = commentBox.children('.controls').children('.hide-replies');
  repliesBox.hide();

  var times = repliesBox.find(".replies").length;
  showRepliesButton.text("Show Replies (" + times + ")");
  showRepliesButton.show();
  hideRepliesButton.hide();

});


$(".comments").on("click", ".show-replies", function () {
  var $this = $(this);
  var commentBox = $this.closest('.comment');
  var repliesBox = commentBox.children('.replies');
  var showRepliesButton = commentBox.children('.controls').children('.show-replies');
  var hideRepliesButton = commentBox.children('.controls').children('.hide-replies');
  repliesBox.show();
  showRepliesButton.hide();
  hideRepliesButton.show();
});


// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
