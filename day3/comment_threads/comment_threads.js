"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(document).ready(function() {

  $('.show-replies').hide();

  $('.post').on('click', function() {
    var author = prompt("Enter your name");
    var comment = prompt("Enter a comment");
    var newComment = $(
      '<div class="comment"> \
        <div class="author">author says:</div> \
        <div class="message">comment</div> \
        <div class="controls"> \
          <button class="hide-replies btn btn-default">Hide Replies</button> \
          <button class="show-replies btn btn-default">Show Replies</button> \
          <button class="reply btn btn-default">Reply</button> \
        </div> \
        <div class="replies"></div> \
  </div>');
    newComment.children().eq(0).text(author + ' says:');
    newComment.children().eq(1).text(comment);
    $('.comments').append(newComment);
  });

  $('.comments').on('click', '.reply', function() {
    var reply_author = prompt("Enter your name");
    var reply_comment = prompt("Enter a comment");
    var replyComment = $( //creating a new HTML div comment with the new comment
      '<div class="comment"> \
        <div class="author">author says:</div> \
        <div class="message">comment</div> \
        <div class="controls"> \
          <button class="hide-replies btn btn-default">Hide Replies</button> \
          <button class="show-replies btn btn-default">Show Replies</button> \
          <button class="reply btn btn-default">Reply</button> \
        </div> \
        <div class="replies"></div> \
  </div>');
    replyComment.children().eq(0).text(reply_author + ' says:');
    replyComment.children().eq(1).text(reply_comment);
    var curr = $(this);
    console.log(reply);
    var commentdiv = curr.closest('.comment');  //last parent comment
    var repliesdiv = commentdiv.children('.replies'); //child of the last parent comment
    repliesdiv.append(replyComment);
  });

  $('.comments').on('click', '.hide-replies', function() {
    var curr = $(this);
    var commentdiv = curr.closest('.comment');  //last parent comment
    var repliesdiv = commentdiv.children('.replies'); //child of the last parent comment
    repliesdiv.hide();
    commentdiv.children().eq(2).children().eq(1).show();
    commentdiv.children().eq(2).children().eq(0).hide();
  });

  $('.comments').on('click', '.show-replies', function() {
    var curr = $(this);
    var commentdiv = curr.closest('.comment');  //last parent comment
    var repliesdiv = commentdiv.children('.replies'); //child of the last parent comment
    repliesdiv.show();
    commentdiv.children().eq(2).children().eq(0).show();
    commentdiv.children().eq(2).children().eq(1).hide();
  });




})
