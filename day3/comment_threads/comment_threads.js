"use strict";

// This file contains JavaScript that will run on your page.

var author;
var comment;

// Helper function that returns new comment html
function promptUser(){
  // prompt user for info
  author = window.prompt("What is your name?") || "anonymous";
  comment = window.prompt("Enter your comment here:") || "no comment";
  // construct a new post
  var newHtml = '<div class="comment"><div class="author">"' +
  author + '" says:</div><div class="message">' + comment +
  '</div> <div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>';
  return newHtml;
}

// Post Button
$('.post').on('click', function(){
  var post = promptUser();
  // appends new post to end of .comments
  $('.comments').append(post);
});

$('.container').on('click', '.reply', function(){
  // prompt user for info
  var post = promptUser();
  // appends new post to the end of this
  var $this = $(this); // .reply
  var commentDiv = $this.closest($('.comment'));
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(post);
});

$('.container').on('click', '.hide-replies', function(){
  // find the replies div
  var $this = $(this); // .hide-replies
  var commentDiv = $this.closest($('.comment'));
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
});

$('.container').on('click', '.show-replies', function(){
  // find the replies div
  var $this = $(this); // .show-replies
  var commentDiv = $this.closest($('.comment'));
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
});
