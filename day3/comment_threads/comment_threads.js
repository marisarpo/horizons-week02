"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function() {
  var user = prompt("Enter your name");
  var comment = prompt("Enter your comment");
  addComment(user, comment);
})

function addComment(user, comment) {
  var newComment = '<div class="comment">' +
                    '<div class="author">' + user + 'says:</div>' +
                    '<div class="message">' + comment+ '</div>' +
                    '<div class="controls">' +
                      '<button class="hide-replies btn btn-default">Hide Replies</button>' +
                      '<button class="show-replies btn btn-default">Show Replies</button>' +
                      '<button class="reply btn btn-default">Reply</button>' +
                    '</div>' +
                    '<div class="replies"></div>' +
                  '</div>'
  $('.comments').append(newComment);
}

/*
$('.reply').on('click', function() {
  var user = prompt("Enter your name");
  var comment = prompt("Enter your comment");
  var $this = $(this);
  var parent = $(this).closest('.comment');
  var commentDiv = parent.children('.replies');
  var commentItem = '<div class="comment">' +
                    '<div class="author">' + user + 'says:</div>' +
                    '<div class="message">' + comment+ '</div>' +
                    '<div class="controls">' +
                      '<button class="hide-replies btn btn-default">Hide Replies</button>' +
                      '<button class="show-replies btn btn-default">Show Replies</button>' +
                      '<button class="reply btn btn-default">Reply</button>' +
                    '</div>' +
                    '<div class="replies"></div>' +
                  '</div>'
  commentDiv.append(commentItem);
})
*/
$('.comments').on('click', '.reply', function() {
  var user = prompt("Enter your name");
  var comment = prompt("Enter your comment");
  var $this = $(this);
  var parent = $(this).closest('.comment');
  var commentDiv = parent.children('.replies');
  var commentItem = '<div class="comment">' +
                    '<div class="author">' + user + 'says:</div>' +
                    '<div class="message">' + comment+ '</div>' +
                    '<div class="controls">' +
                      '<button class="hide-replies btn btn-default">Hide Replies</button>' +
                      '<button class="show-replies btn btn-default">Show Replies</button>' +
                      '<button class="reply btn btn-default">Reply</button>' +
                    '</div>' +
                    '<div class="replies"></div>' +
                  '</div>'
  commentDiv.append(commentItem);
})

$('.comments').on('click', '.hide-replies', function() {
  var $this = $(this);
  var parent = $(this).closest('.comment');
  var commentDiv = parent.children('.replies');
  var controls = parent.children('.controls');
  var showButton = controls.children('.show-replies');
  var replyButton = controls.children('.reply');
  var count = commentDiv.children().length;
  replyButton.after("<p class='counter'>" + count + "</p>");
  showButton.show();
  $this.hide();
  commentDiv.hide();

})

$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  var parent = $(this).closest('.comment');
  var commentDiv = parent.children('.replies');
  var controls = parent.children('.controls')
  var hideButton = controls.children('.hide-replies');
  var counterP = controls.find('.counter');
  counterP.hide();
  $this.hide();
  commentDiv.show();
  hideButton.show();
})

$(document).ready(function() {
  $('.show-replies').hide();
})
