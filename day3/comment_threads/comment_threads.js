"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.post').on('click', function(){
  var author = prompt("Please enter your name");
  var message = prompt("Enter your comment");
  var newComment = $('<div class="comment"><div class="author">'+author+' says: </div> <div class="message">'+message+'</div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div> </div>');
  $('.comments').append(newComment);
})

$('.comment .controls, .replies').on('click', 'button.reply', function(){
  var author = prompt("Please enter your name");
  var message = prompt("Enter your comment");
  var newReply = $('<div class="comment"><div class="author">'+author+' says: </div> <div class="message">'+message+'</div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div> </div>');
  $(this).closest('.comment').children('.replies').append(newReply);
  event.stopPropagation();
})

$('.comments').on('click', 'button.hide-replies', function(){
  $(this).closest('.comment').children('.replies').hide();
  $(this).sibling('.show-replies').hide();

})

$('.comments').on('click', 'button.show-replies', function(){
  $(this).closest('.comment').children('.replies').show();
})
