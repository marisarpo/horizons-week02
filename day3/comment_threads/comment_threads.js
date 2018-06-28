"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('button.post').on('click', function(event) {
  event.preventDefault();
  var author=prompt('author');
  var comment=prompt('comment');
  var myText=`<div class="comment">
  <div class="author">"${author}" says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`
  // console.log(myText);
  $('.comments').append(myText);
});

$('.comments').on('click', 'button.reply', function(event) {
  event.preventDefault();
  var author=prompt('author');
  var comment=prompt('comment');
  var myReply=`<div class="comment">
  <div class="author">"${author}" says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
  </div>`;
  // console.log(myText);
  $(this).closest('.comment').children('.replies').append(myReply);
});

$('.comments').on('click', 'button.hide-replies', function(event) {
  event.preventDefault();
  $(this).closest('.comment').children('.replies').hide();
});

$('.comments').on('click', 'button.show-replies', function(event) {
  event.preventDefault();
  $(this).closest('.comment').children('.replies').show();
});
