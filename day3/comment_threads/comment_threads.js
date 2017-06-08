"use strict";


// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.comments .show-replies').hide();

$('.post').on('click', function(){
  var author = prompt('Enter an author');
  var comment = prompt('Enter a comment');


  var newEle = $(`<div class="comment">
  <div class="author"> ${author} says:</div>
  <div class="message"> ${comment} </div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);

  // console.log($('.comments'));
  $('.comments').append(newEle);

  $('.comments .show-replies').hide();
})

$('.comments').on('click', '.reply', function(){
  var author = prompt('Enter an author');
  var comment = prompt('Enter a comment');


  var newEle = $(`<div class="comment">
  <div class="author"> ${author} says:</div>
  <div class="message"> ${comment} </div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  repliesDiv.append(newEle);

  $('.comments .show-replies').hide();
})

$('.comments').on('click', '.hide-replies', function(){

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  repliesDiv.hide();

  $this.closest('.controls').children('.show-replies').show();

  $this.closest('.controls').children('.hide-replies').hide();
    var count = commentDiv.find('.comment').length;
    var countString = $(`<div class = 'count'>${count}</div>`);
    commentDiv.append(countString);

})



$('.comments').on('click', '.show-replies', function(){

  var $this = $(this);
  // console.log($(this));
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  repliesDiv.show();

  $this.closest('.controls').children('.show-replies').hide();

  $this.closest('.controls').children('.hide-replies').show();

  commentDiv.children('.count').remove();

})
