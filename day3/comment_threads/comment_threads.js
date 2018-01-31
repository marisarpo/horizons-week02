"use strict";

// This file contains JavaScript that will run on your page.
$('.post').on('click', function(event){
  var newAuthor = prompt('enter author');
  var newComment = prompt('enter comment');
  $('.comments').append($(`<div class="author">` + newAuthor +`
  <div class="comment">` + newComment +`
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`));
})

$('.comments').on('click', '.reply', function(){
  var $this = $(this);
  var newAuthor = prompt('Enter Author');
  var newComment = prompt('Enter comment');
  var repliesDiv = $this.closest('.comment').children('.replies');
  repliesDiv.append($(`<div class="author">` + newAuthor +` says:
  <div class="comment">` + newComment +`
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`));

});

$('.comments').on('click', '.hide-replies', function(){
  var $this = $(this);
  var repliesDiv = $this.closest('.comment').children('.replies');
  repliesDiv.hide();
});

$('.comments').on('click', '.show-replies', function(){
  var $this = $(this);
  var repliesDiv = $this.closest('.comment').children('.replies');
  repliesDiv.show();
});
