"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {
  $('.post').on('click', function() {
    var author = prompt("Enter your name");
    var comment = prompt("Enter your comment");
    var toAdd ='<div class="comment"><div class="author">"'+ author +'" says:</div><div class="message">' + comment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>'
    $('.comments').append(toAdd);
  })

  function replyNew() {
    var $this = $(this);
    var author = prompt("Enter your name");
    var comment = prompt("Enter your comment");
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    var toAdd ='<div class="comment"><div class="author">"'+ author +'" says:</div><div class="message">' + comment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>'
    repliesDiv.append(toAdd);
  }

  $('.comments').on('click', '.reply', replyNew);

  var repliesDiv = $('body').find('.show-replies');
  repliesDiv.hide();

  $('.comments').on('click', '.hide-replies', function(event) {
    var $this = $(this);
    var currTarget = event.currentTarget;
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.hide();
    var repliesDiv2 = commentDiv.find('.replies');
    var replies = repliesDiv2.length - 1;
    commentDiv.find('.show-replies').show();
    commentDiv.find('.hide-replies').hide();
    console.log(commentDiv.find('.show-replies'));
    commentDiv.find('.show-replies').text("Show " + replies + " Replies");
  })

  $('.comments').on('click', '.show-replies', function() {
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.show();
    commentDiv.find('.show-replies').hide();
    commentDiv.find('.hide-replies').show();
  })


})
