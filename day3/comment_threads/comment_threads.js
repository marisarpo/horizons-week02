"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.post').on("click", function(){

  var author = prompt('Enter an author: ');
  var comment = prompt('Enter a comment: ');

  var newElement = '<div class=' + '"comment">' + '<div class="author">' + author +
    ' says: </div>' + '<div class="message">' + comment + '</div>' + '<div class="controls">' +
    '<button class="hide-replies btn btn-default">' + 'Hide Replies</button>' +
    '<button class="show-replies btn btn-default">' + 'Show Replies</button>' +
    '<button class="reply btn btn-default">' + 'Reply</button>' +
    '</div>' + '<div class="replies">' + '</div>' + '</div>';

    console.log(newElement);

  $('.comments').append(newElement);


});

//$('.reply').on("click", function(){

$('.comments').on('click', '.reply', function(){

  var author = prompt('Enter an author: ');
  var comment = prompt('Enter a comment: ');

  var newElement = '<div class=' + '"comment">' + '<div class="author">' + author +
    ' says: </div>' + '<div class="message">' + comment + '</div>' + '<div class="controls">' +
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

$('.comments').on("click", '.hide-replies', function(){

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();

  //return false;

});

$('.comments').on("click", '.show-replies', function(){

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();

  return false;

});
