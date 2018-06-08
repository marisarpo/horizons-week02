"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(window).on('load', function(){
  $('.show-replies').hide();
});

$('.post').on('click',function(){
  var author = prompt('Enter your name');
  var message = prompt('Enter your comment');
  var newElem = $(`<div class="comment">
    <div class="author">"${author}" says:</div>
    <div class="message">${message}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`);
  $('.comments').append(newElem);
});

$('.comments').on('click', '.reply', function(){
  var author = prompt('Enter your name');
  var message = prompt('Enter your comment');
  var newElem = $(`<div class="comment">
    <div class="author">"${author}" says:</div>
    <div class="message">${message}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`);
  $(this).closest('.comment').children('.replies').append(newElem);
});

$('.comments').on('click', '.hide-replies', function(){
  $(this).closest('.comment').children('.replies').hide();
  var count = $(this).parent('.controls').siblings('.replies').children().length;
  $(this).siblings('.show-replies').text(`Show Replies (${count})`)
  $(this).hide();
  $(this).siblings('.show-replies').show();
});

$('.comments').on('click', '.show-replies', function(){
  $(this).closest('.comment').children('.replies').show();
  $(this).hide();
  $(this).siblings('.hide-replies').show();
})
