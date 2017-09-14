"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click',function() {
  var author = prompt('Author');
  var msg = prompt('Comment');
  var obj = $(`<div class="comment">
                <div class="author">"` + author + `" says:</div>
                <div class="message">` + msg + `</div>
                <div class="controls">
                  <button class="hide-replies btn btn-default">Hide Replies</button>
                  <button class="show-replies btn btn-default">Show Replies</button>
                  <button class="reply btn btn-default">Reply</button>
                </div>
                <div class="replies"></div>
              </div>`);
  $('.comments').append(obj);
})

$('.comments').on('click','.reply',function() {
  var author = prompt('Author');
  var msg = prompt('Comment');
  var obj = $(`<div class="comment">
                <div class="author">"` + author + `" says:</div>
                <div class="message">` + msg + `</div>
                <div class="controls">
                  <button class="hide-replies btn btn-default">Hide Replies</button>
                  <button class="show-replies btn btn-default">Show Replies</button>
                  <button class="reply btn btn-default">Reply</button>
                </div>
                <div class="replies"></div>
              </div>`);
  $(this).parent().next().append(obj);
})

$('.comments').on('click','.hide-replies',function() {
  $(this).parent().next().hide();
})
$('.comments').on('click','.show-replies',function() {
  $(this).parent().next().show();
})
