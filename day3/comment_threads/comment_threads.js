"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
function coolFunction() {
  $('.show-replies').hide();
  $('.comment').each(function() {
    if($(this).find('.comment').length === 0) {
      $(this).find('.hide-replies').hide();
    } else {
      $(this).find('.hide-replies').show();
    }
  })
};

coolFunction();

$('.post').click(function() {
  var author = prompt("What's your name?");
  var comment = prompt("What's your comment?");
  var newComment = $('<div class="comment">' +
    '<div class="author"> "'+ author + '" says:</div>' +
    '<div class="message">' + comment + '</div>' +
    '<div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div>' +
    '<div class="replies"></div>' +
  '</div>');
  $('.comments').append(newComment);
  coolFunction();
})

// $('.reply').click(function() {
//   var author = prompt("What's your name?");
//   var comment = prompt("What's your comment?");
//   var newComment = $('<div class="comment">' +
//     '<div class="author"> "'+ author + '" says:</div>' +
//     '<div class="message">' + comment + '</div>' +
//     '<div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div>' +
//     '<div class="replies"></div>' +
//   '</div>');
//   var $this = $(this);
//   var commentDiv = $this.closest('.comment');
//   var repliesDiv = commentDiv.children('.replies');
//   repliesDiv.append(newComment);
// })

$('.comments').on('click', '.reply', function() {
  var author = prompt("What's your name?");
  var comment = prompt("What's your comment?");
  var newComment = $('<div class="comment">' +
    '<div class="author"> "'+ author + '" says:</div>' +
    '<div class="message">' + comment + '</div>' +
    '<div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div>' +
    '<div class="replies"></div>' +
  '</div>');
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newComment);
  coolFunction();
})

$('.comments').on('click', '.hide-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).hide();
  $(this).hide();
  $(this).parent().children('.show-replies').show();
  $(this).parent().children('.show-replies').text("Show Replies (" + (commentDiv.find('.comment').length) + ")")
})

$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).show();
  $(this).hide();
  $(this).parent().children('.hide-replies').show();
})
