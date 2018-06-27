"use strict";

$(document).ready(function() {
  $('.show-replies').hide();
  // This file contains JavaScript that will run on your page.
  // YOUR CODE HERE
  //need to fix linter
  //need to understand why need delegated event handler
  //why can't do new comments w undelegated
  $(".post").on("click", function(event) {
    var author = prompt("Please enter your name");
    var comment = prompt("Please enter your comment")
    var newElement = $(`<div class="comment"><div class="author">${author} says:</div><div class="message">${comment}</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>`);
    $(".comments").append(newElement);
  });
  /**
  $(".reply").on("click", function(event) {
    var author = prompt("Please enter your name");
    var comment = prompt("Please enter your comment")
    var newElement = $(`<div class="comment"><div class="author">${author} says:</div><div class="message">${comment}</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>`);
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.append(newElement);
  });
  **/
  $('.comments').on('click', '.reply', function(event) {
    var author = prompt("Please enter your name");
    var comment = prompt("Please enter your comment")
    var newElement = $(`<div class="comment"><div class="author">${author} says:</div><div class="message">${comment}</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>`);
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.append(newElement);
  });

  $('.comments').on('click', '.hide-replies', function(event) {
    $(this).hide();
    $(this).siblings('.show-replies').show();
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    var numReplies = repliesDiv.children().length;
    repliesDiv.before(`<p class='num-replies'>Number of replies: ${numReplies}</p>`)
    repliesDiv.hide();
  });

  $('.comments').on('click', '.show-replies', function(event) {
    $(this).hide();
    $(this).siblings('.hide-replies').show();
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    $('.num-replies').remove();
    repliesDiv.show();
  });

});
