"use strict";

// This file contains JavaScript that will run on your page.

$('.show-replies').hide();

//creates a function that will creates and fill the divs
var createComment = function() {
  //prompts for author and comment
  var nameString = prompt('Enter your name');
  var commentString = prompt('Enter your comment');

  //creates the new divs
  var commentDiv = $('<div class="comment">');
  var authorDiv = $('<div class="author">');
  var messageDiv = $('<div class="message">');
  var controlsDiv = $('<div class="controls">');
  var repliesDiv = $('<div class="replies">');

  //creates new buttons
  var hideRepliesButton = $('<button class="hide-replies btn btn-default">');
  var showRepliesButton = $('<button class="show-replies btn btn-default">');
  var replyButton = $('<button class="reply btn btn-default">');

  //fills the divs with text
  authorDiv.text('"' + nameString + '" says:');
  messageDiv.text(commentString);

  //fills the buttons with text
  hideRepliesButton.text('Hide Replies');
  showRepliesButton.text('Show Replies');
  replyButton.text('Reply');

  //appends the divs to the comment div
  commentDiv.append(authorDiv);
  commentDiv.append(messageDiv);
  commentDiv.append(controlsDiv);
  commentDiv.append(repliesDiv);

  //appends the buttons to the controlsDiv
  controlsDiv.append(hideRepliesButton);
  controlsDiv.append(showRepliesButton);
  controlsDiv.append(replyButton);

  return commentDiv;
}

//posting button event handler
$('.post').on('click', function() {
  //invokes and catches the return value of the create comment method
  var commentDiv = createComment();

  //adds the new post
  $('div .comments').append(commentDiv)
})

//reply button event handler
$('.comments').on('click', '.reply', function() {
  //invokes and catches the return value of the create comment method
  var appendedCommentDiv = createComment();

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(appendedCommentDiv);
})

//hide button event handler
$('.comments').on('click', '.hide-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var controlsDiv = commentDiv.children('.controls');
  var showButton = controlsDiv.children('.show-replies');
  var hideButton = controlsDiv.children('.hide-replies');
  var count = repliesDiv.find('.replies').length;
  repliesDiv.hide();
  showButton.show();
  hideButton.hide();

  //checks the number of messages and alerts after hiding
  setTimeout(function() {
    if (count > 1)
      alert('You have ' + count + ' hidden messages');
    else if (count > 0)
      alert('You have ' + count + ' hidden message');
  }, 10)
})

//show button event handler
$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var controlsDiv = commentDiv.children('.controls');
  var showButton = controlsDiv.children('.show-replies');
  var hideButton = controlsDiv.children('.hide-replies');
  repliesDiv.show();
  showButton.hide();
  hideButton.show();
})