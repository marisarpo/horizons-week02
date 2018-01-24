"use strict";

$(document).ready(function() {
  $('.post').on('click', function(){
    var author = prompt('Enter Author Name')
    var comment = prompt('Enter comment')
    var newContent = $(`<div class="comment">
        <div class="author">` + author +` says:</div>
        <div class="message">`+ comment + `</div>
        <div class="controls">
          <button class="hide-replies btn btn-default">Hide Replies</button>
          <button class="show-replies btn btn-default">Show Replies</button>
          <button class="reply btn btn-default">Reply</button>
        </div>
        <div class="replies"></div>
      </div>`);
    $('.comments').append(newContent);
  });
  $('.comments').on('click','.reply', function() {
    var author = prompt('Enter Author Name')
    var comment = prompt('Enter comment')
    var newContent = $(`<div class="comment">
        <div class="author">` + author +` says:</div>
        <div class="message">`+ comment + `</div>
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
    repliesDiv.append(newContent);
  });
  $('.comments').on('click','.hide-replies',function(e) {
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    $(repliesDiv).hide();
  })
  $('.comments').on('click','.show-replies',function(e) {
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    $(repliesDiv).show();
  })
})
// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
