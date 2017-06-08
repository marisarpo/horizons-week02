"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(document).ready(function(){
  $('.show-replies').hide();
})



$('.post').on('click',function(){
  var name = window.prompt('Enter your name');
  var comment = window.prompt('Enter your comment');
  $('.comments').append($('<div class="comment"> <div class="author">'+name+' says:</div> <div class="message">'+ comment+'</div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div> </div>'));

})

$('.comments').on('click','.reply',function(){
  var name = window.prompt('Enter your name');
  var comment = window.prompt('Enter your comment');
  $(this).parent().parent().children('.replies').append('<div class="comment"> <div class="author">'+name+' says:</div> <div class="message">'+ comment+'</div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div> </div>');
  return false;
})


$('.comments').on('click','.hide-replies',function(){
  $(this).parent().parent().find('.replies').hide();
  var numcomments = $(this).parent().parent().find('.replies').length -1;
  console.log(numcomments);
  $(this).hide();
  $(this).parent().find('.show-replies').show();
  // $(this).parent().find('.show-replies').after().empty();
  $(this).parent().find('.show-replies').text("Show Replies "+"("+numcomments+")");
})

$('.comments').on('click','.show-replies',function(){
  $(this).parent().parent().find('.replies').show();
  $(this).hide();
  $(this).parent().find('.hide-replies').show();
})
