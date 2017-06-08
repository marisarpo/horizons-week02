"use strict";

// This file contains JavaScript that will run on your page.
$('.post').on('click', function() {
var userName = prompt('Enter your name')
var userEntry = prompt('Enter your comment')
var postedElement = $('<div class="comment"><div class="author"> "' + userName + '" says:</div><div class="message">' + userEntry + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>')
$('.comments').append(postedElement)
})



$('.comments').on('click', '.reply',
    function() {
  var userName = prompt('Enter your name')
  var userEntry = prompt('Enter your comment')
  var postedElement = $('<div class="comment"><div class="author"> "' + userName + '" says:</div><div class="message">' + userEntry + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>')
  var $this = $(this);
   var commentDiv = $this.closest('.comment');
   var repliesDiv = commentDiv.children('.replies')
   repliesDiv.append(postedElement);
  })

$('.comments').on('click', '.hide-replies',
function() {
var $this = $(this);
var commentDiv = $this.closest('.comment');
var repliesDiv = commentDiv.children('.replies')
$(repliesDiv).hide();
})

$('.comments').on('click', '.show-replies',
function() {
var $this = $(this);
var commentDiv = $this.closest('.comment');
var repliesDiv = commentDiv.children('.replies')
$(repliesDiv).show();
})
