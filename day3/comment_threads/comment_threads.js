"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

// Hide all the Show Replies buttons on the page when the page first load
$(document).ready(()=> {
  $(".show-replies").hide();
})


$('.post').click(function() {
  var author = prompt("Enter your author");
  var comment = prompt("Enter your comment");

/*
  // creates a new div element of class=comment
  var commentDiv = $('<div class="comment">');
  // creates a new div element of class=author
  var authorDiv = $('<div class="author">');
  // set the text content of authorDiv
  authorDiv.text('""' + author + '"says: ');
  // append authorDiv element to the end of the commentDiv element
  commentDiv.append(authorDiv);
  // creates a new div element of class=message
  var messageDiv = $('<div class="message">');
  messageDiv.text(comment);
  // append messageDiv element to the end of the commentDiv element
  commentDiv.append(messageDiv);

  var controlsDiv = $('<div class="controls">');
  // create a new button element
  var hideButton = $('<button class="hide-replies btn btn-default">Hide Replies</button>');
  // append the new button element to controlsDiv
  controlsDiv.append(hideButton);
  var showButton = $('<button class="show-replies btn btn-default">Show Replies</button>');
  controlsDiv.append(showButton);
  controlsDiv.append($('<button class="reply btn btn-default">Reply</button>'));
  // append controlsDiv to commentDiv
  commentDiv.append(controlsDiv);
  commentDiv.append($('<div class="replies">'));

  $(".comments").append(commentDiv);
  // this tells you what's constructed out of commentDiv
  console.log(commentDiv.outerHTML());
*/

// slash is a new line separator
  var text = '<div class="comment">\
  <div class="author">"' + author + '" says:</div>\
  <div class="message">' + comment + '</div>\
  <div class="controls">\
    <button class="hide-replies btn btn-default">Hide Replies</button>\
    <button class="show-replies btn btn-default">Show Replies</button>\
    <button class="reply btn btn-default">Reply</button>\
  </div>\
  <div class="replies"></div>\
</div>'
  var textObj = $(text);
  $(".comments").append(textObj);
});


$('.comments').on('click', '.reply', function() {
  var author = prompt("Enter your author");
  var comment = prompt("Enter your comment");
  // `this` points to the current `.reply` button that was clicked
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var text = '<div class="comment">\
  <div class="author">"' + author + '" says:</div>\
  <div class="message">' + comment + '</div>\
  <div class="controls">\
    <button class="hide-replies btn btn-default">Hide Replies</button>\
    <button class="show-replies btn btn-default">Show Replies</button>\
    <button class="reply btn btn-default">Reply</button>\
  </div>\
  <div class="replies"></div>\
</div>'
  var textObj = $(text);
  repliesDiv.append(textObj);
});


$('.comments').on('click', '.hide-replies', function() {
  // `this` points to the current `.reply` button that was clicked
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
  // hide the current Hide Replies button and show the current Show Replies button
  $this.hide();
  var showButt = $this.closest('.controls').children('.show-replies');
  showButt.show();
});


$('.comments').on('click', '.show-replies', function() {
  // `this` points to the current `.reply` button that was clicked
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
  $this.hide();
  var hideButt = $this.closest('.controls').children('.hide-replies');
  hideButt.show();
});
