"use strict";

// This file contains JavaScript that will run on your page.

// Post button implementation
var newPost = function(author, comment) {
  return `<div class="comment">
    <div class="author"> ${author} says:</div>
    <div class="message"> ${comment} </div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`;

}
function init() {
  $('.show-replies').hide();

  $('.post').on('click', function(event) {
    var author = window.prompt("Enter your name.");
    var comment = window.prompt("Enter your comment.");
    $('.comments').append(newPost(author, comment));
  });

  $('.comments').on('click', '.reply', function(event) {
    var commentAncestor = $(this).closest('.comment');
    var correctReply = $(commentAncestor).children('.replies');
    var replyAuthor = window.prompt("Enter your name.");
    var replyComment = window.prompt("Enter your reply.");
    $(correctReply).append(newPost(replyAuthor, replyComment));
  });

  $('.comments').on('click', '.hide-replies', function(event) {
    var commentAncestor = $(this).closest('.comment');
    var correctReply = $(commentAncestor).children('.replies');
    $(correctReply).hide();
    var controls = $(commentAncestor).children('.controls');
    var activateButton = $(controls).children('.show-replies');
    var deactivateButton = $(controls).children('.hide-replies');
    $(activateButton).show();
    var commentsHidden = $(correctReply).find('.comment');
    var numHidden = commentsHidden.length;
    $(deactivateButton).text(numHidden + " comments hidden");
  });

  $('.comments').on('click', '.show-replies', function(event) {
    var commentAncestor = $(this).closest('.comment');
    var correctReply = $(commentAncestor).children('.replies');
    $(correctReply).show();
    var controls = $(commentAncestor).children('.controls');
    var activateButton = $(controls).children('.hide-replies');
    var deactivateButton = $(controls).children('.show-replies');
    $(deactivateButton).hide();
    var commentsHidden = $(correctReply).find('.comment');
    var numHidden = commentsHidden.length;
    $(activateButton).text('Hide Replies');
  });
}

$(document).ready(init);
