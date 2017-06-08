"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.comments').on('click', '.hide-replies', function(){
  $(this).parent().siblings('.replies').hide();
})

$('.comments').on('click', '.show-replies', function(){
  $(this).parent().siblings('.replies').show();
})

$('.comments').on('click', '.post', function(){
  var myName = (prompt('Please enter your name.'));
  var myComment = (prompt('Please enter your comment.'));
  console.log(myName, myComment);
  $(".comments").append(`
    <div class="message comment">
      <div class="author">"` + myName + `" says:</div>` + myComment + `
      <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button></div>
      </div>`);
})

$('.comments').on('click', '.reply', function(){
  var myName = (prompt('Please enter your name.'));
  var myComment = (prompt('Please enter your comment.'));
  // console.log(myName, myComment);
  $(this).parent().siblings('.replies').append(`
    <div class="message comment">
    <div class="author">"` + myName + `" says:</div>` + myComment + `
    <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button></div>
    <div class="replies"></div>
    </div>`);
})
