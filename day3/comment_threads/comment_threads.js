"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$( '.post' ).on('click', function() {
  var firstName = prompt('Enter your first name');
  var comment = prompt('Enter your comment');

  $( '.comments' ).append(function() {
    // var str = 'hey'
    var str = `<div class="comment">
    <div class="author">` + '"' + firstName + '"' + ` says:</div>` +
    `<div class="message">` + comment + `</div>` +
    `<div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
    </div>`
    return str;
  })
})

$( '.comments' ).on('click', '.reply', function() {
  var authorName = prompt('Enter your name');
  var reply = prompt('Enter your reply');

  var $this = $(this);
  var commentDiv = $this.closest( '.comment' );
  var repliesDiv = commentDiv.children( '.replies' );
  repliesDiv.append(function() {
    var str = `<div class="comment">
    <div class="author">` + '"' + authorName + '"' + ` says:</div>` +
    `<div class="message">` + reply + `</div>` +
    `<div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
    </div>`
    return str;
  });
  return false;
})


// slides all replies up when click on "Hide Replies"
$( '.comments' ).on('click', '.hide-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest( '.comment' );
  var repliesDiv = commentDiv.children( '.replies' );
  var commentCount = repliesDiv.find(".comment").size();

  repliesDiv.slideUp();
  $(this).attr('class', 'show-replies btn btn-default' );
  $(this).text('Show Replies - (' + commentCount + ' hidden)');
})


// opens all replies when click "Show Replies"
$( '.comments' ).on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest( '.comment' );
  var repliesDiv = commentDiv.children( '.replies' );
  repliesDiv.slideDown();
  $(this).attr('class', 'hide-replies btn btn-default' );
  $(this).text('Hide Replies');

})

// hide all "Show Replies" buttons on window load
$( window ).on('load', function() {
  $( '.show-replies' ).hide();
})
