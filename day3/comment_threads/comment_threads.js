"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {

//$('.show-replies').hide();

$('.post').on('click', function() {
  var author = prompt('Enter an author');
  var comment = prompt('Enter a comment');
  var addDiv = $(`<div class="comment">
    <div class="author">` + author + ` says:</div>
    <div class="message">` + comment + `</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`);

  $('.comments').append(addDiv);
})

$('.comments').on('click', '.reply', function () {
  var author = prompt('Enter an author');
  var comment = prompt('Enter a comment');
  var addDiv = $(`<div class="comment">
    <div class="author">` + author + ` says:</div>
    <div class="message">` + comment + `</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`);

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(addDiv);
})

$('.comments').on('click', '.hide-replies', function () {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).hide();

})

$('.comments').on('click', '.show-replies', function () {
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    $(repliesDiv).show();



})

})
