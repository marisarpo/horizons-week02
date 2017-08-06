"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.show-replies').hide();

var commentCounter
$('.post').on('click', function(){
  var author = prompt('Enter your name');
  var input = prompt("Enter your comment");
  console.log(input);
  var newComment = `<div class="comment">
  <div class="author">"${author}" says:</div>
  <div class="message">` + input + `</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`
$('.comments').append(newComment);
});



$('.comments').on('click','.reply', function(){
  var replyAuthor = prompt('Enter your name');
  var replyInput = prompt('Enter your comment');
  var newComment = `<div class="comment">
  <div class="author">"${replyAuthor}" says:</div>
  <div class="message">` + replyInput + `</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`
var parentClass = $(this).closest('.comment');
var repliesClass = parentClass.children('.replies');
repliesClass.append(newComment);

})

$('.comment').on('click', '.hide-replies', function(){
  var comm = $(this).closest('.comment');
  var newClass = comm.children('.replies')
  $(this).hide();
  var hideButton = $(this).siblings('.show-replies');
  hideButton.show();
  newClass.hide();

  var size = newClass.find('.comment').length;
  console.log(size);

  var line = `<li class='number'> Number of Comments: ${size} </li>`;
  comm.append(line);


})

$('.comment').on('click', '.show-replies', function(){
  var comm = $(this).closest('.comment');
  var newClass = comm.children('.replies')
  $(this).hide();
  var showButton = $(this).siblings('.hide-replies');
  showButton.show();

  $('.number').remove();

  newClass.show();
})
