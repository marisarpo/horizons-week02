"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function(event){
  var name1 = prompt("Enter your name");
  var comment1 = prompt("Enter a comment");
  var newDiv = `<div class="comment">
  <div class="author">"` +name1+ ` "says:</div>
  <div class="message">`+comment1+`</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`;
console.log(newDiv);
var elementAdd = $(newDiv);
$('.comments').append(elementAdd);



})
$('.comments').on('click',".reply" , function(event){
  var name2 = prompt("Enter your name");
  var comment2 = prompt("Enter a comment");
  var newDiv1 = `<div class="comment">
  <div class="author">"` +name2+ ` "says:</div>
  <div class="message">`+comment2+`</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`;
console.log(newDiv1);
var elementAdd1 = $(newDiv1);
var $this = $(this);
var commentDiv = $this.closest('.comment');
var repliesDiv = commentDiv.children('.replies')
repliesDiv.append(elementAdd1);


})
$('.comments').on('click', ".hide-replies", function(event){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
} )
$('.comments').on('click', ".show-replies", function(event){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
} )
