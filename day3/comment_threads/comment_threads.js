"use strict";
$(document).ready(function () {
  $('.post').on('click', function () {
    var author = prompt("Enter your name");
    var comment = prompt("Enter your comment");
    $('.comments').append(
      $(`<div class="comment">
          <div class="author">"` + author + `" says:</div>
          <div class="message">` + comment + `</div>
          <div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button>
            <button class="reply btn btn-default">Reply</button>
          </div>
          <div class="replies"></div>`)
    );
    $('.show-replies').hide();
    return false;
  });

  $('.comments').on('click', '.reply', function () {
    var author = prompt("Enter your name");
    var comment = prompt("Enter your reply");
    $($(this).parent().parent().find('.replies')[0]).append(
      $(`<div class="comment">
          <div class="author">"` + author + `" says:</div>
          <div class="message">` + comment + `</div>
          <div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button>
            <button class="reply btn btn-default">Reply</button>
          </div>
          <div class="replies"></div>`)
    );
    $('.show-replies').hide();
    return false;
  });

  $('.comments').on('click', '.hide-replies', function () {
    $($(this).parent().parent().find('.replies')[0]).hide();
    $(this).hide();
    $($(this).parent().find('.show-replies')[0]).show();
    return false;
  });

  $('.comments').on('click', '.show-replies', function () {
    $($(this).parent().parent().find('.replies')[0]).show();
    $(this).hide();
    $($(this).parent().find('.hide-replies')[0]).show();
    return false;
  });

  $('.show-replies').hide();
})

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
