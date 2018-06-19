"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
function makeNewComment(name, comment) {
  return `<div class="comment">
  <div class="author">${name} says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`;
}

$(document).ready(function() {
  $('.show-replies').hide();
})

//new post
$('.post').on('click', function(event){
  var name = window.prompt('enter your name');
  var comment = window.prompt('enter you comment');
  var newElem = makeNewComment(name, comment);
  $('.comments').append(newElem);
});

//new reply
$('.comments').on('click', '.reply',function(event) {
  var name = window.prompt('enter your name');
  var comment = window.prompt('enter you comment');
  var newElem = makeNewComment(name, comment);

  var commentDiv = $(this).closest('.comment');
  //console.log(commentDiv);
  //console.log(commentDiv.children('.replies'));

  commentDiv.children('.replies').append(newElem);
  commentDiv.children('.replies:last-child').find('.show-replies').hide();
});

//hide replies
$('.comments').on('click', '.hide-replies', function(event) {
  var currentButton = $(this);
  var showButton = $(this).parent().children('.show-replies');
  console.log(showButton);
  showButton.show();
  currentButton.hide();

  var repliesDiv = $(this).closest('.comment').children('.replies');
  repliesDiv.hide();
});

//show replies
$('.comments').on('click', '.show-replies', function(event) {
  var currentButton = $(this);
  var hideButton = $(this).parent().children('.hide-replies');
  console.log(hideButton);
  hideButton.show();
  currentButton.hide();

  var repliesDiv = $(this).closest('.comment').children('.replies');
  repliesDiv.show();
});
