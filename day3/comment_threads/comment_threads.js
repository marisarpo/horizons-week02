"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('button.post').on('click', function(event) {
  event.preventDefault();
  var author = prompt("Input author name");
  var comment = prompt("Input comment");
  var myText = `<div class="comment">
  <div class="author"> ${author} says:</div>
  <div class="message"> ${comment} </div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`;
  $('.comments').append(myText);
}
)

$('.comments').on('click', '.reply', function(event){
  event.preventDefault();
  var author = prompt("Input author name");
  var comment = prompt("Input comment");
  var myText = `<div class="comment">
  <div class="author"> ${author} says:</div>
  <div class="message"> ${comment} </div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`;
  $(this).closest('.comment').children('.replies').append(myText);
})

$('.comments').on('click', '.hide-replies', function(event){
  event.preventDefault();
  $(this).closest('.comment').children('.replies').hide();
})

$('.comments').on('click', '.show-replies', function(event){
  event.preventDefault();
  $(this).closest('.comment').children('.replies').show();
})
