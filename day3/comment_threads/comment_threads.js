"use strict";

$('.post').on('click', function(){
//enter an author and comment using prompt();
  var authorName = prompt('Please enter an author');
  var userComment = prompt('Please enter a comment');
  var postedElement = $('<div class="comment"> <div class="author"> '+ authorName +'  says:</div> <div class="message"> '+ userComment +' </div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div> </div>')

  $('.comments').append(postedElement)
})

$('.comments').on('click', '.reply', function(){
  var authorNameReply = prompt('Please enter an author');
  var userCommentReply = prompt('Please enter a comment');
  var postedElementReply = $('<div class="comment"> <div class="author"> '+ authorNameReply +'  says:</div> <div class="message"> '+ userCommentReply +' </div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div> </div>')


  var $this = $(this);
  var parent = $this.parent();
  var correctReplies = parent.siblings('.replies');
  correctReplies.append(postedElementReply);

})
//hide replies
$('.comments').on('click', '.hide-replies', function(){
  var $this = $(this);
  var parent = $this.parent();
  var commentsHide = parent.siblings('.replies');
  commentsHide.hide();
})

// show-replies
$('.comments').on('click', '.show-replies', function(){
  var $this = $(this);
  var parent = $this.parent();
  var commentsHide = parent.siblings('.replies');
  commentsHide.show();
})
