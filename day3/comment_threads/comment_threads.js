"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

// add the click handler
var firstLoad = true;

if(firstLoad){
  $('.show-replies').hide();
  firstLoad = false;
}

$('.post').on('click', function() {
  var name = prompt("Enter your name");
  var comment = prompt("Enter your comment");

  var commentDiv = $('<div class="comment"><div class="author">"' + name +  '" says: </div><div class="message">' + comment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>')

  $('.comments').append(commentDiv);
})

$('.comment').on('click', '.reply', function() {
  var name = prompt("Enter your name");
  var comment = prompt("Enter your comment");

  var commentDiv = $('<div class="comment"><div class="author">"' + name +  '" says: </div><div class="message">' + comment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>')
  var $this = $(this);
  var commentLoc = $this.closest('.comment');
  var repliesLoc = commentLoc.children('.replies');
  repliesLoc.append(commentDiv);
})


$('.comments').on('click', '.hide-replies', function(){
  var $this = $(this);
  var commentLoc = $this.closest('.comment');
  var repliesLoc = commentLoc.children('.replies');
  repliesLoc.hide();

  $this.closest('.comment').children('.controls').children('.show-replies').show();
  $this.hide();

})

$('.comments').on('click', '.show-replies', function(){
  var $this = $(this);
  var commentLoc = $this.closest('.comment');
  var repliesLoc = commentLoc.children('.replies');
  repliesLoc.show();
  $this.closest('.comment').children('.controls').children('.hide-replies').show();
  $this.hide();
})
