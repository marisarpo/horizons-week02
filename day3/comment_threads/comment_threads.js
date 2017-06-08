"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function(){
  var author = prompt("What is your name?");
  var comment = prompt("What do you want to say?");
  var newElem = $('<div class="comment">'
  + '<div class="author">' + author + ' says:</div>'
  + '<div class="message">'+ comment +'</div>'
  + '<div class="controls">'
  + '<button class="hide-replies btn btn-default">Hide Replies</button>'
  + '<button class="show-replies btn btn-default">Show Replies</button>'
  + '<button class="reply btn btn-default">Reply</button>'
  + '</div>'
  + '<div class="replies"></div>'
  + '</div>');

  console.log(newElem);
  $('.comments').append(newElem);
})

$('.comments').on('click', '.reply', function(){
  var author = prompt("What is your name?");
  var comment = prompt("What do you want to say?");
  var newElem = $('<div class="comment">'
  + '<div class="author">' + author + ' says:</div>'
  + '<div class="message">'+ comment +'</div>'
  + '<div class="controls">'
  + '<button class="hide-replies btn btn-default">Hide Replies</button>'
  + '<button class="show-replies btn btn-default">Show Replies</button>'
  + '<button class="reply btn btn-default">Reply</button>'
  + '</div>'
  + '<div class="replies"></div>'
  + '</div>');

  //$(this).parent().children('replies').append(newElem);
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newElem);
})

$('.comments').on('click', '.hide-replies', function(){
  $(this).closest('.comment').children('.replies').hide();
  $(this).closest('.comment').children('.controls').children('.show-replies').show();
  $(this).hide();

  var numReplies = $(this).closest('.comment').find('.comment').length;
  $(this).closest('.comment').children('.controls').children('.show-replies').text('Show Replies (' + numReplies + ')');
})

$('.comments').on('click', '.show-replies', function(){
  $(this).closest('.comment').children('.replies').show();
  $(this).closest('.comment').children('.controls').children('.hide-replies').show();
  $(this).hide();
})

$(document).ready(function(){
  $('.comments .show-replies').hide();
})
