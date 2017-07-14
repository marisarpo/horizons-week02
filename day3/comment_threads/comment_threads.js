"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function() {
  $('.comments').append(promptComm());
})

function promptComm() {
  var author = prompt("What's your name?");
  var comment = prompt("What's your comment?");
  if (comment && author) {
    var commentHTML = `<div class="comment">
<div class="author">${author} says:</div>
<div class="message">${comment}</div>
<div class="controls">
  <button class="hide-replies btn btn-default">Hide Replies</button>
  <button class="show-replies btn btn-default">Show Replies</button>
  <button class="reply btn btn-default">Reply</button>
</div>
<div class="replies"></div>
</div>`;
return $(commentHTML);
  }
}

$('.comments').on('click', '.reply', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(promptComm());
})

$('.comments').on('click', '.hide-replies', function() {
  $(this).parent().parent().children().eq(3).hide();
})

$('.comments').on('click', '.show-replies', function() {
  $(this).parent().parent().children().eq(3).show();
})
