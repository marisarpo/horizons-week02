"use strict";

// This file contains JavaScript that will run on your page.
//hides the show button
$('.show-replies').hide();

//creates a function that will creates and fill the divs
var createComment = function() {
  //prompts for author and comment
  var nameString = prompt('Enter your name');
  var commentString = prompt('Enter your comment');

  //creates the new divs
  var commentDiv = `<div class="comment">
  <div class="author">"${nameString}" says:</div>
  <div class="message">${commentString}</div>
  <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`

  return commentDiv;
}

//posting button event handler
$('.post').on('click', function() {
  //invokes and catches the return value of the create comment method
  var commentDiv = createComment();

  //adds the new post and hides the show button
  $('div .comments').append(commentDiv)
  $('.show-replies').hide();
})

//reply button event handler
$('.comments').on('click', '.reply', function() {
  //invokes and catches the return value of the create comment method
  var appendedCommentDiv = createComment();

  //find the comment that called hide replies
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(appendedCommentDiv);

  //hides the show button
  $('.show-replies').hide();

})

//hide button event handler
$('.comments').on('click', '.hide-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var controlsDiv = commentDiv.children('.controls');
  var showButton = controlsDiv.children('.show-replies');
  var hideButton = controlsDiv.children('.hide-replies');
  var count = repliesDiv.find('.replies').length;
  repliesDiv.hide();
  showButton.show();
  hideButton.hide();

  //checks the number of messages and alerts after hiding
  setTimeout(function() {
    if (count > 1)
      alert('You have ' + count + ' hidden messages');
    else if (count > 0)
      alert('You have ' + count + ' hidden message');
  }, 10)
})

//show button event handler
$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var controlsDiv = commentDiv.children('.controls');
  var showButton = controlsDiv.children('.show-replies');
  var hideButton = controlsDiv.children('.hide-replies');
  repliesDiv.show();
  showButton.hide();
  hideButton.show();
})