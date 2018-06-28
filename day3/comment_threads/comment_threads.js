"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.post').on('click', function() {
 var author = prompt("Enter name");
 var message = prompt("Enter message");
 var htmlString = '<div class="comment">';
 htmlString = htmlString + '<div class="author">' + author + ' says:</div>'
 htmlString = htmlString + '<div class="message">' + message + '</div>'
 htmlString = htmlString + '<div class="controls">'
 htmlString = htmlString + '<button class="hide-replies btn btn-default">Hide Replies</button>'
 htmlString = htmlString + '<button class="show-replies btn btn-default">Show Replies</button>'
 htmlString = htmlString + '<button class="reply btn btn-default">Reply</button>'
 htmlString = htmlString + '</div>'
 htmlString = htmlString + '<div class="replies"></div>'
 htmlString = htmlString + '</div>'

 $(htmlString);

 $('.comments').append(htmlString);

})

$('.reply').on('click', function(event){
  // `this` points to the current `.reply` button that was clicked
  var author = prompt("Enter name");
  var message = prompt("Enter message");
  var htmlString = '<div class="comment">';
  htmlString = htmlString + '<div class="author">' + author + ' says:</div>'
  htmlString = htmlString + '<div class="message">' + message + '</div>'
  htmlString = htmlString + '<div class="controls">'
  htmlString = htmlString + '<button class="hide-replies btn btn-default">Hide Replies</button>'
  htmlString = htmlString + '<button class="show-replies btn btn-default">Show Replies</button>'
  htmlString = htmlString + '<button class="reply btn btn-default">Reply</button>'
  htmlString = htmlString + '</div>'
  htmlString = htmlString + '<div class="replies"></div>'
  htmlString = htmlString + '</div>'

 $(htmlString);

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(htmlString);
})


$('.comments').on('click', '.reply', function() {
  var author = prompt("Enter name");
  var message = prompt("Enter message");
  var htmlString = '<div class="comment">';
  htmlString = htmlString + '<div class="author">' + author + ' says:</div>'
  htmlString = htmlString + '<div class="message">' + message + '</div>'
  htmlString = htmlString + '<div class="controls">'
  htmlString = htmlString + '<button class="hide-replies btn btn-default">Hide Replies</button>'
  htmlString = htmlString + '<button class="show-replies btn btn-default">Show Replies</button>'
  htmlString = htmlString + '<button class="reply btn btn-default">Reply</button>'
  htmlString = htmlString + '</div>'
  htmlString = htmlString + '<div class="replies"></div>'
  htmlString = htmlString + '</div>'
 $(htmlString);
  var $this = $(this);
  var replies = $this.closest('.comment').children('.replies');
  replies.show();
  replies.append(htmlString);
});


$('.comments').on('click', '.hide-replies', function() {
  var $this = $(this);
  $this.closest('.comment').children('.replies').hide();
  $this.hide();
  $this.closest('.controls').find('.show-replies').show();
});


$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  $this.closest('.comment').children('.replies').show();
  $this.hide();
  $this.closest('.controls').find('.show-replies').show();
});
