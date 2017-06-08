"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('document').ready(function(){
  $('.show-replies').hide();
})

$('.post').on('click',function() {
  var author = prompt('Enter your name');
  var comment = prompt('Enter your comment');
  if(author && comment){
    $('.comments').append(input(author, comment));
  }
});


function input(author, comment) {
  var x = $('<div class="comment"></div>');
  x.append($('<div class="author">').text('"' + author + '" says:'));
  x.append($('<div class="message">').text(comment));
  var controls = $('<div class="controls"></div>');
  controls.append($('<button class="hide-replies btn btn-default">Hide Replies</button>'));
  controls.append($('<button class="show-replies btn btn-default">Show Replies</button>'));
  controls.append($('<button class="reply btn btn-default">Reply</button>'));
  x.append(controls);
  x.append($('<div class="replies"></div>'));
  return x;
}

$('.comments').on('click', '.reply', function() {
  var author = prompt('Enter your name');
  var comment = prompt('Enter your comment');
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(input(author, comment));
});

$('.comments').on('click', '.hide-replies', function(){
  var $this = $(this);
  $this.closest('.comment').children('.replies').hide();
  $this.hide();
  $this.closest('.comment').find('.show-replies').show();
})

$('.comments').on('click', '.show-replies', function(){
  var $this = $(this);
  $this.closest('.comment').children('.replies').show();
  $this.hide();
  $this.closest('.comment').children('.controls').children('.hide-replies').show();
})
