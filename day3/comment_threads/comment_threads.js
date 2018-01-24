"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function(event){
  var name = prompt('Enter name');
  var comment = prompt('Enter comment');
  $('.comments').append(newComment(name, comment));
})

function newComment(name, comment) {
  return `<div class="comment">
  <div class="author">${name} says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`};

$('.comments').on('click', '.reply', function(event){
  // `this` points to the current `.reply` button that was clicked
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var name = prompt('Enter name');
  var comment = prompt('Enter comment');
  repliesDiv.append(newComment(name, comment));
});

$('.comments').on('click', '.hide-replies', function(event){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
  var controlsDiv = $this.closest('.controls');
  var showDiv = controlsDiv.children('.show-replies');
  showDiv.show();
  $this.hide();

});

$('.comments').on('click', '.show-replies', function(event){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
  var controlsDiv = $this.closest('.controls');
  var hideDiv = controlsDiv.children('.hide-replies');
  hideDiv.show();
  $this.hide();
});

$('.show-replies').hide();
