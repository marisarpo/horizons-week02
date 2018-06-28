"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(".post").on('click', function(){

  var author = prompt("Enter author: ");
  var comment = prompt("Enter comment: ");

var temp = `<div class="comment">
  <div class="author">${author} says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`


$('.comments').append(temp)


});

$(".comments").on('click','.reply', function(){

  var author = prompt("Enter author: ");
  var comment = prompt("Enter comment: ");

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(`<div class="comment">
    <div class="author">${author} says:</div>
    <div class="message">${comment}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`);
})

$(".comments").on('click', '.hide-replies', function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

repliesDiv.hide();


})

$(".comments").on('click', '.show-replies', function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

repliesDiv.show();


})
