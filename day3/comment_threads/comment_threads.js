"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

// <button class="post btn btn-default">Post Comment</button>

// post comment button
$('.post.btn.btn-default').on('click', function() {
  var author = prompt("Enter your name:");
  var comment = prompt("Enter your comment:")

  var html = '<div class="comment">' +
    '<div class="author">"' + author + '" says:</div>' +
    '<div class="message">' + comment + '</div>' +
    '<div class="controls">' +
      '<button class="hide-replies btn btn-default">Hide Replies</button>' +
      '<button class="show-replies btn btn-default">Show Replies</button>' +
      '<button class="reply btn btn-default">Reply</button>' +
    '</div>' +
    '<div class="replies"></div>' +
  '</div>'

  $('.comments').append(html);
});


// reply buttons
$('.comments').on('click', '.reply', function() {
  // `this` points to the current `.reply` button that was clicked
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  var author = prompt("Enter your name:");
  var comment = prompt("Enter your comment:");

  var html = '<div class="comment">' +
    '<div class="author">"' + author + '" says:</div>' +
    '<div class="message">' + comment + '</div>' +
    '<div class="controls">' +
      '<button class="hide-replies btn btn-default">Hide Replies</button>' +
      '<button class="show-replies btn btn-default">Show Replies</button>' +
      '<button class="reply btn btn-default">Reply</button>' +
    '</div>' +
    '<div class="replies"></div>' +
  '</div>'

  repliesDiv.append(html);
});

// hide buttons
$('.comments').on('click', '.hide-replies',
 function() {
   var $this = $(this); // this refer to the class "comment"
   var commentDiv = $this.closest('.comment'); // parent of comment is comments -> find "comment"
   var repliesDiv = commentDiv.children('.replies'); //replies are children of Comment -> find children

   repliesDiv.hide();
 });

// show replies
 $('.comments').on('click', '.show-replies',
   function() {
     var $this = $(this); // this refer to the class "comment"
     var commentDiv = $this.closest('.comment'); // parent of comment is comments -> find "comment"
     var repliesDiv = commentDiv.children('.replies'); //replies are children of Comment -> find children


   repliesDiv.show();

   });
