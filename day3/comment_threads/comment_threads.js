"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function() {
  var name = null;
  var comment = null;
  while (name === null) {
    name = prompt('Enter your name', 'Name');
  }
  while (comment === null) {
    comment = prompt('Enter your comment', 'Amy is awesome!');
  }
  var string = `<div class="comment">
  <div class="author">${name} says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`
  $('.comments').append($(string));
})

$('.comments').on('click', '.reply', function() {
  var name = null;
  var comment = null;
  while (name === null) {
    name = prompt('Enter your name', 'Name');
  }
  while (comment === null) {
    comment = prompt('Enter your comment', 'Amy is awesome!');
  }
  var string = `<div class="comment">
  <div class="author">${name} says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).append($(string));
})

$('.comments').on('click', '.replies-view', function() {
  var $this = $(this);
  var count = 0;
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var text = $(this).text();
  if (text.startsWith("Hide Replies")) {
    $(repliesDiv).hide();
    var arr = [commentDiv];
    while (arr[0].children('.replies').length !== 0) {
      count++;
      var obj = arr[0].children('.replies').children('.comment');
      arr.unshift(obj);
    }
    $(this).text("Show Replies (" + (count - 1) + ")");
  } else if (text.startsWith("Show Replies")) {
    $(repliesDiv).show();
    $(this).text("Hide Replies");

  }
})

/*$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).show();
})*/
