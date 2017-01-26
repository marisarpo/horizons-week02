"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').click( function() {
  var name = prompt("What's your name?");
  var comment = prompt("Enter your comment");
  $('.comments').append('<div class= "comment"><div class="author">' + name
  +'says:</div><div class = "message">' +comment+
  '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
})

$('.comments').on('click', '.reply', function(event) {
  var name = prompt("What's your name?");
  var comment = prompt("Enter your comment");

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).append(" <div class='comment'> <div class='author'>" + name
  + " says:</div> <div class='message'>" + comment
  + "</div><div class='controls'><button class='hide-replies btn btn-default'>Hide Replies</button><button class='show-replies btn btn-default'>Show Replies</button><button class='reply btn btn-default'>Reply</button></div><div class='replies'></div></div>")
  event.stopPropagation();
  $(repliesDiv).show();
})

$('.show-replies').hide();

$('.comments').on('click', '.hide-replies', function(event) {
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var reshow = $(this).siblings('.show-replies');
  var num = repliesDiv.find('*').length/8;
  if(repliesDiv.children().length !== 0) {
    $(reshow).show();
    $(this).hide();
    commentDiv.append('<div class = "count">Count:' + num + '</div>');
  }
  $(repliesDiv).hide();
})

$('.comments').on('click', '.show-replies', function(event) {
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var reshow = $(this).siblings('.hide-replies');
  if(repliesDiv.children().length !== 0) {
    $(reshow).show();
    $(this).hide();
    commentDiv.children('.count').remove();
  }
  $(repliesDiv).show();
})
