"use strict";
$( document).ready(function(){
// This file contains JavaScript that will run on your page.
$('.post').on("click",function(){

  var author = prompt("Enter your name");

  var nComment=prompt("Enter your comment");


  var newComment=$(`<div class="comment">
    <div class="author">  ${author} says:</div>
    <div class="message">${nComment}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`)


  $('.comments').append(newComment)
});



$('.comments').on("click",'.reply',function(){

  var author = prompt("Enter your name");

  var nComment=prompt("Enter your comment");
  var newComment=$(`<div class="comment">
    <div class="author">  ${author} says:</div>
    <div class="message">${nComment}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`)
  var $this = $(this);

  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newComment);

})

$('.comments').on("click",'.hide-replies',function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).hide();

})

$('.comments').on("click",'.show-replies',function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).show();

})


});
