"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
// every parent needs to be appended on separately
$('.show-replies').hide()

$('.post').on('click', function() {
  $('.comments').append(promptER())
})

function promptER() {
  var author = prompt("Enter author");
  var comment = prompt("Enter Comment");
  var main = $('<div class="comment">');
  main.append($('<div class="author">').text('"' + author + '" says:'));
  main.append($('<div class="message">').text(comment));
  var controls = $('<div class="controls">');
  controls.append($('<button class="hide-replies btn btn-default">Hide Replies</button>'));
  controls.append($('<button class="show-replies btn btn-default">Show Replies</button>'));
  controls.append($('<button class="reply btn btn-default">Reply</button>'));
  main.append(controls);
  main.append($('<div class="replies">'));
  return main;
}

$('.comments').on('click', '.comment .controls .reply', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(replyER());
})

function replyER() {
  var author = prompt("Enter author");
  var comment = prompt("Enter Comment");
  var main = $('<div class="comment">');
  main.append($('<div class="author">').text('"' + author + '" says:'));
  main.append($('<div class="message">').text(comment));
  var controls = $('<div class="controls">');
  controls.append($('<button class="hide-replies btn btn-default">Hide Replies</button>'));
  controls.append($('<button class="show-replies btn btn-default">Show Replies</button>'));
  controls.append($('<button class="reply btn btn-default">Reply</button>'));
  main.append(controls);
  main.append($('<div class="replies">'));
  return main;
}

$('.comments').on('click', '.comment .controls .hide-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).hide();
  $this.hide();
  $($this.closest('controls').find('.show-replies')).show();
})

$('.comments').on('click', '.comment .controls .show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).show();
  $this.hide();
  $($this.closest('.controls')find('.hide-replies')).show();
})
