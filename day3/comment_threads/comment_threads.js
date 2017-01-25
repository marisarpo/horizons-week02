"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

// remove hide/show replies buttons on page load
$(function() {
  var replies = $('.replies');
  for (var i=0; i<replies.length; i++) {
    if ($(replies[i]).children().length) {
      $(replies[i]).parent().children('.controls').children('.show-replies').hide();
    } else {
      $(replies[i]).parent().children('.controls').children('.show-replies, .hide-replies').hide();
    }
  }
});

// comment generator
function generateCommentDiv(name, comment) {
  var commentDiv = $('<div class="comment"></div');
  commentDiv.append('<div class="author">' + '"' + name + '""' + ' says:' + '</div>');
  commentDiv.append('<div class="message">' + comment + '</div>');

  var controlsDiv = $('<div class="controls"></div>');
  controlsDiv.append('<button class="hide-replies btn btn-default">Hide Replies</button>');
  controlsDiv.append('<button class="show-replies btn btn-default">Show Replies</button>');
  controlsDiv.append('<button class="reply btn btn-default">Reply</button>');
  commentDiv.append(controlsDiv);

  var repliesDiv = $('<div class="replies"></div>');
  commentDiv.append(repliesDiv);

  // hide show/hide buttons on comment creation
  commentDiv.children('.controls').children('.hide-replies, .show-replies').hide();

  return commentDiv;
}

// create new comment
$('button.post').on('click', function(e){
  var name = prompt("Enter your name");
  var comment = prompt("Enter your comment");
  var commentDiv = generateCommentDiv(name, comment);

  // append to comments list
  $('div.comments').append(commentDiv);
});

// create reply
$('div.comments').on('click', '.reply', function(e) {
  var name = prompt("Enter your name");
  var reply = prompt("Enter your reply");
  var commentDiv = generateCommentDiv(name, reply);

  $(this).parent().children('.hide-replies').show();

  $(this).closest('.comment').children('.replies').append(commentDiv);
});

// click hide replies
$('div.comments').on('click', '.hide-replies', function(e) {
  $(this).closest('.comment').children('.replies').hide();
  $(this).hide();
  $(this).parent().children('.show-replies').show();
});

// click show replies
$('div.comments').on('click', '.show-replies', function(e) {
  $(this).closest('.comment').children('.replies').show();
  $(this).hide();
  $(this).parent().children('.hide-replies').show();
});
