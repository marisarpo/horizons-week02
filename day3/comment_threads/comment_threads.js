"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click',function(){

  var name = prompt('Enter your name');
  var comment = prompt('Enter your comment');

  console.log(makeComment(name, comment);
});

function makeComment(name, comment){

  return `<div class="comment">
    <div class="author">"${name}" says:</div>
    <div class="message">{comment}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`;

}

$('.comments').on('click', '.reply', function(){

  var name = prompt('Enter your name:');
  var comment = prompt('Enter your comment');

  console.log($(this).closest('.comment'));

  var commentDiv = $(this.)closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  repliesDiv.append(makeComment(name, comment));

});

$('.comments').on('click', '.show-replies', function(){
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();

});

$('.comments').on('click', '.hide-replies', function(){
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();

});
