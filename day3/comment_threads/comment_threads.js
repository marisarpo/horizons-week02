"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.show-replies').hide();
$('.btn.post').on('click',function () {
  var author = prompt("Enter your name");
  var comment = prompt("your comment?");
  var commentya = $(`<div class="comment">
    <div class="author">`+author +` says:</div>
    <div class="message">`+comment+`</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`);
  $('.comments').append(commentya);
});

$('.comments').on('click','.reply',function() {
  var author = prompt("Enter your name");
  var comment = prompt("your comment?");
  var storeplace = $(this).closest('.comment').children('.replies');
  var commentya = $(`<div class="comment">
    <div class="author">`+author +` says:</div>
    <div class="message">`+comment+`</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`);
  storeplace.append(commentya);
})

$('.comments').on('click','.hide-replies',function () {
  $(this).closest('.comment').children('.replies').hide('.replies');
  $(this).parent().children('.show-replies').show();
  var len =  $(this).closest('.comment').children('.replies').children().length;
  $(this).parent().children('.show-replies').text('Show Replies'+len);
  $(this).hide();
});

$('.comments').on('click','.show-replies',function () {
  $(this).closest('.comment').children('.replies').show('.replies');
  $(this).parent().children('.hide-replies').show();
  $(this).hide();
});
