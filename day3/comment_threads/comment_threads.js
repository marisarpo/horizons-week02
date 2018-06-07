"use strict";

$('.post').on('click', function(event){
  var author = prompt("Author:");
  var message = prompt("Comment:");
  $('.comments').append('<div class="comment"><div class="author">"' +
   author + '" says:</div><div class="message">' + message + '</div><div class="controls">' +
   '<button class="hide-replies btn btn-default">Hide Replies</button>' +
   '<button class="show-replies btn btn-default">Show Replies</button>' +
   '<button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
});

$('.comments').on('click', '.reply', function(event){
  var author = prompt("Author:");
  var message = prompt("Comment:");
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append('<div class="comment"><div class="author">"' +
   author + '" says:</div><div class="message">' + message + '</div><div class="controls">' +
   '<button class="hide-replies btn btn-default">Hide Replies</button>' +
   '<button class="show-replies btn btn-default">Show Replies</button>' +
   '<button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
});

$('.comments').on('click', '.hide-replies', function(event){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
  $this.hide();
  $this.closest('.controls').find('.show-replies').show();
})

$('.comments').on('click', '.show-replies', function(event){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
  $this.hide();
  $this.closest('.controls').find('.hide-replies').show();
})

$('.show-replies').hide();
