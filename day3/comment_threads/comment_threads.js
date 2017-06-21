"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.show-replies').hide();

var createComment = function() {
  var nameString = prompt('Enter your name');
  var commentString = prompt('Enter your comment');

  var commentDiv = $('<div class="comment">');
  var authorDiv = $('<div class="author">');
  var messageDiv = $('<div class="message">');
  var controlsDiv = $('<div class="controls">');
  var repliesDiv = $('<div class="replies">');

  var hideReplyBtn = $('<button class="hide-replies btn btn-default">');
  var showReplyBtn = $('<button class="show-replies btn btn-default">');
  var replyBtn = $('<button class="reply btn btn-default">');

  hideReplyBtn.text('Hide Replies');
  showReplyBtn.text('Show Replies');
  replyBtn.text('Reply');

  authorDiv.text('"' + nameString + '" says:');
  messageDiv.text(commentString);

  commentDiv.append(authorDiv);
  commentDiv.append(messageDiv);
  commentDiv.append(controlsDiv);
  commentDiv.append(repliesDiv);

  controlsDiv.append(hideReplyBtn);
  controlsDiv.append(showReplyBtn);
  controlsDiv.append(replyBtn);

  return commentDiv;
}

$('.post').on('click', function() {
  var commentDiv = createComment();
  $('div .comments').append(commentDiv);
});

$('.comments').on('click', '.reply', function() {
  var appendedCommentDiv = createComment();
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(appendedCommentDiv);
});

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
  setTimeout(function() {
    if (count > 0) {
      if (count > 1)
        alert('You hid ' + count + ' comments.');
      else {
        alert('You hid ' + count + ' comment.');
      }
    }
  }, 10);
});

$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var controlsDiv = commentDiv.children('.controls');
  var hideButton = controlsDiv.children('.hide-replies');
  var showButton = controlsDiv.children('.show-replies');
  repliesDiv.show();
  showButton.hide();
  hideButton.show();
});
