"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(document).ready(function() {

    $('.post').on('click', function(e) {
        var author = prompt("Please enter an author");
        var comment = prompt("Please enter a comment");
        var newContent = $(`<div class="comment">
          <div class="author">` + author +` says:</div>
          <div class="message">` + comment + `</div>
          <div class="controls">
            <button class="hide-replies btn btn-default">Hide Replies</button>
            <button class="show-replies btn btn-default">Show Replies</button>
            <button class="reply btn btn-default">Reply</button>
          </div>
          <div class="replies"></div>
        </div>`);
        $('.comments').append(newContent);
    });

    $('.comments').on('click', '.reply', function(e) {
        var author = prompt("Please enter an author");
        var comment = prompt("Please enter a comment");
        var newContent = $(`<div class="comment">
          <div class="author">` + author +` says:</div>
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
          repliesDiv.append(newContent);
    });
});
