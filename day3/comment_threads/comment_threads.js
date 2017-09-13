"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(document).ready(function(){
  //post comment handler
  $('.show-replies').hide();
  $(document).on('click', '.post', function(e){
    var name = prompt("Enter your name");
    var comment = prompt("Enter your comment");
    var newCommentHtml = `<div class="comment">
  <div class="author">` + name + ` says:</div>
  <div class="message">`+ comment + `</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`;
  if(name && comment){
    $('.comments').append(newCommentHtml);
  }

  });
  //post reply handler

  $(document).on('click', '.reply', function(e){
    var name = prompt("enter your name");
    var reply = prompt("Enter your reply");
    var newReplyHtml = `<div class="comment">
  <div class="author">` + name + ` says:</div>
  <div class="message">`+ reply + `</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`;
    if(name && reply){
      $(this).closest('.comment').append(newReplyHtml);
    }

  });

  //hide replies handler
  $('.comments').on('click', '.hide-replies', function(e){
    console.log($(this).closest('.comment').find('.comment').length);
    $(this).removeClass('hide-replies');
    $(this).addClass('show-replies');
    var commentsLength = $(this).closest('.comment').find('.comment').length;
    $(this).html("Show " + commentsLength + " Replies")
    $(this).closest('.comment').find('.comment').hide();
  })

  //show-replies
  $('.comments').on('click', '.show-replies', function(e){
    console.log($(this).parent());
    $(this).removeClass('show-replies');
    $(this).addClass('hide-replies');
    $(this).html("Hide Replies")
    $(this).closest('.comment').find('.comment').show();
  })
})
