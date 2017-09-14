"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.post').on('click', function(){
  var firstName = prompt('Enter your first name');
  var comment = prompt('Enter your comment');

  $('.comments').append(function(){
  var str = `<div class="comment">
  <div class="author"> ` + `"` + firstName + `"` + ` says:</div>
   <div class="message"> ` + comment +
   `</div>
  <div class="controls">
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

//hides replies when clicked
$('.comments').on('click', '.hide-replies', function(){
  $(this).closest('.comment').children('.replies').slideUp();
  $(this).attr('class', 'show-replies btn btn-default');
  var RepliesDiv = $(this).closest('.comment').children('.replies');
  var numHidden = RepliesDiv.find(".comment").size();

  $(this).text('Show Replies (' + numHidden + ' hidden)');
  //console.log(numHidden);
  //$(this).children.hide();
})

//show hidden replies
$('.comments').on('click', '.show-replies', function(){
  $(this).closest('.comment').children('.replies').slideDown();
  $(this).attr('class', 'show-replies btn btn-default');
  $(this).text('Hide Replies');


  //$(this).children.hide();
})

//hides all show replies when page loads
$(window).on('load', function(){
  $('.show-replies').hide();
})
