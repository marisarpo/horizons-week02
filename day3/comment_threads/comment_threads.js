"use strict";

// This file contains JavaScript that will run on your page.
// version 1
/*
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

"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

function createComment(){
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


$(document).ready(function() {
  $('.show-replies').hide();
  // note we cannot do this, we have to use ocmments in order for jquery to run through new elements
  $('.comments').on('click','.hide-replies',function(e){
    var replies = $(this).parent().siblings(".replies");
    $(replies).hide();
    $(this).siblings('.show-replies').show();
    $(this).siblings('.show-replies').text(`Show Replies (${$(replies)[0].childElementCount})`);
    $(this).hide();
  });

  $('.comments').on('click','.show-replies',function(e){
    $(this).hide();
    $(this).siblings('.hide-replies').show();
    $(this).parent().siblings(".replies").show();
  });

  $('.post').click(function(e){
    $(this).siblings('.comments').append(createComment());
  });

  $('.comments').on('click','.reply',function(e){
    var replies = $(this).parent().siblings(".replies");
    replies.append(createComment());
    replies.show();
    $(this).siblings('.hide-replies').show();
    $(this).siblings('.show-replies').hide();
  });


});
*/

// version 2

function createComment(){
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


$(document).ready(function() {
  $('.show-replies').hide();
  // note we cannot do this, we have to use ocmments in order for jquery to run through new elements
  $('.comments').on('click','.hide-replies',function(e){
    var replies = $(this).parent().siblings(".replies");
    $(replies).hide();
    $(this).siblings('.show-replies').show();
    $(this).siblings('.show-replies').text(`Show Replies (${$(replies)[0].childElementCount})`);
    $(this).hide();
  });

  $('.comments').on('click','.show-replies',function(e){
    $(this).hide();
    $(this).siblings('.hide-replies').show();
    $(this).parent().siblings(".replies").show();
  });

  $('.post').click(function(e){
    $(this).siblings('.comments').append(createComment());
  });

  $('.comments').on('click','.reply',function(e){
    var replies = $(this).parent().siblings(".replies");
    replies.append(createComment());
    replies.show();
    $(this).siblings('.hide-replies').show();
    $(this).siblings('.show-replies').hide();
  });


});

