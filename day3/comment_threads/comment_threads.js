"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
var makeComment = function(){
  return `<div class="comment">
    <div class="author">"${prompt("Please enter your name")}" says:</div>
    <div class="message">${prompt("Please enter your comment")}</div>
    <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div></div>`;
}

$(document).ready(function(){
  $('.show-replies').hide();

  $('.post').on('click',function(event){
    var completedComment = makeComment();
    var commentsContainer = $(this).siblings('.comments');
    $(commentsContainer).append(completedComment);
  })

  $('.comments').on('click','.reply',function(event){
    var completedComment = makeComment();
    var replyParent = $(this).parent().siblings('.replies');
    $(replyParent).append(completedComment);
  })

  $('.comments').on('click','.hide-replies',function(event){

    var numReplies = $(this).parent().parent().find('.replies').length-1;
    if(numReplies>0){
      var newText = `Show Replies (${numReplies})`;
      $(this).siblings('.show-replies').text(newText);
      $(this).siblings('.show-replies').show();
      var replies = $(this).parent().siblings('.replies');
      $(replies).hide();

      $(this).hide();
    }
  })

  $('.comments').on('click','.show-replies',function(event){
    $(this).siblings('.hide-replies').show();
    var replies = $(this).parent().siblings('.replies');
    $(replies).show();
    $(this).hide();
  })

})
