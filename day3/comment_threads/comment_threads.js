"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function() {
  var author = prompt('Enter your name');
  var comment = prompt('Enter your comment');

  var newElement = '<div class=' + '"comment">' + '<div class="author">' + author +
     ' says: &nbsp</div>' + '<div class="message">' + comment + '</div>' + '<div class="controls">' +
     '<button class="hide-replies btn btn-default">' + 'Hide Replies</button>' +
     '<button class="show-replies btn btn-default">' + 'Show Replies</button>' +
     '<button class="reply btn btn-default">' + 'Reply</button>' +
     '</div>' + '<div class="replies">' + '</div>' + '</div>';

$('.comments').append(newElement);
});

// STEP 2
$('.comments').on('click', '.reply.btn.btn-default', function() {
  var author = prompt('Enter your name');
  var comment = prompt('Enter your comment');

  var newElement = '<div class=' + '"comment">' + '<div class="author">' + author +
     ' says: &nbsp</div>' + '<div class="message">' + comment + '</div>' + '<div class="controls">' +
     '<button class="hide-replies btn btn-default">' + 'Hide Replies</button>' +
     '<button class="show-replies btn btn-default">' + 'Show Replies</button>' +
     '<button class="reply btn btn-default">' + 'Reply</button>' +
     '</div>' + '<div class="replies">' + '</div>' + '</div>';

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newElement);
  repliesDiv.show();
  return false;

});


// STEP 3
$('.comments').on('click', '.hide-replies.btn.btn-default', function() {

  //var $this = $(this); // the comment on which we're clicking hide reply
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  var sibling = $(this).siblings('.reply');
  sibling.hide();
  repliesDiv.hide();

});


$('.comments').on('click', '.show-replies.btn.btn-default', function() {

  //var $this = $(this); // the comment on which we're clicking hide reply
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  var sibling = $(this).siblings('.reply');
  sibling.show();
  repliesDiv.show();

});
