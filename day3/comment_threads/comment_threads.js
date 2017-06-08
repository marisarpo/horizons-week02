"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {

  //hide show-replies button on load
  $('.show-replies').hide();

  //post comment
  $('.post').on('click', function() {
    var author = prompt('Enter the name of an author:');
    var comment = prompt('Enter a message:');

    var toAdd = $(`<div class="comment">
      <div class="author">"` + author + `" says:</div>
      <div class="message">` + comment + `</div>
      <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
    </div>`);

    $('.comments').append(toAdd);
  })

  //reply to comments
  $('.comments').on('click', '.reply', function() {
    var author = prompt('Enter the name of an author:');
    var comment = prompt('Enter a message:');


    var toAdd = $(`<div class="comment">
        <div class="author">"` + author + `" says:</div>
        <div class="message">` + comment + `</div>
        <div class="controls">
          <button class="hide-replies btn btn-default">Hide Replies</button>
          <button class="show-replies btn btn-default">Show Replies</button>
          <button class="reply btn btn-default">Reply</button>
        </div>
        <div class="replies"></div>
      </div>`);

    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    $(repliesDiv).append(toAdd);

  })



  //hide replies
$('.comments').on('click', '.hide-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).hide();

  //hides current hide-replies button
  $(this).hide();

  //shows sibling show-replies button
  var showButton = $this.siblings('.show-replies');
  $(showButton).show();
})

//show replies
$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).show();

  //hides current show-replies button
  $this.hide();

  //shows sibling show-replies button
  var hideButton = $this.siblings('.hide-replies');
  $(hideButton).show();
})



})
