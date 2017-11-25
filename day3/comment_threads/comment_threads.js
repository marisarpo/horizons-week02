"use strict";

$('.post').click(function() {
  $('.comments').append(promptForComment());
});

function promptForComment() {
  let author = prompt('Enter your name');
  let comment = prompt('Enter your comment');
  console.log(comment, author);
  if (comment && author) {
    return createComment(author, comment);
  }
}

function createComment(author, comment, replies) {
  var elem = $('<div class="comment">');
  elem.append($('<div class="author">').text('"' + author + '" says:'));
  elem.append($('<div class="message">').text(comment));
  var controls = $('<div class="controls">');
  controls.append($('<button class="hide-replies btn btn-default">Hide Replies</button>'));
  controls.append($('<button class="show-replies btn btn-default">Show Replies</button>'));
  controls.append($('<button class="reply btn btn-default">Reply</button>'));
  elem.append(controls);
  elem.append($('<div class="replies">').append(replies));
  return elem;
}


$('.comments').on('click', '.reply', function() {
  let $this = $(this);
  let replies = $this.closest('.comment').children('.replies');
  replies.show();
  replies.append(promptForComment());
});

$('.comments').on('click', '.hide-replies', function() {
  let $this = $(this);
  $this.closest('.comment').children('.replies').hide();
  $this.hide();
  $this.closest('.controls').find('.show-replies').show();
});

$('.comments').on('click', '.show-replies', function() {
  let $this = $(this);
  $this.closest('.comment').children('.replies').show();
  $this.hide();
  $this.closest('.controls').find('.hide-replies').show();
});
