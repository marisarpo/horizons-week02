"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.show-replies').hide();

$('.post').on('click', function() {
  var name = prompt('Enter your name');
  var comment = prompt('Enter your comment');
  var newElement= $('<div class="comment"><div class="author">' + name
  +'says:</div><div class="message">' + comment + '</div><div class="controls">'
  + '<button class="hide-replies btn btn-default">Hide Replies</button>'
  + '<button class="show-replies btn btn-default">Show Replies</button>'
  + '<button class="reply btn btn-default">Reply</button></div><div class="replies"></div>'
  + '</div>')
  $('.comments').append(newElement);
})

$('.comments').on('click', '.reply', function() {
  var name = prompt('Enter your name');
  var comment = prompt('Enter your comment');
  var newElement= $('<div class="comment"><div class="author">' + name
  +'says:</div><div class="message">' + comment + '</div><div class="controls">'
  + '<button class="hide-replies btn btn-default">Hide Replies</button>'
  + '<button class="show-replies btn btn-default" style="display: none;">Show Replies</button>'
  + '<button class="reply btn btn-default">Reply</button></div><div class="replies"></div>'
  + '</div>')
  // `this` points to the current `.reply` button that was clicked
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newElement);
});

$('.comments').on('click', '.hide-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).hide();
  var control = commentDiv.find('.show-replies');
  $(control).show();
  $(this).hide();
});


$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).show();
  var control = commentDiv.find('.hide-replies');
  $(control).show();
  $(this).hide();
});
