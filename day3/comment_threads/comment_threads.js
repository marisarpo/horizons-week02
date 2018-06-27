"use strict";

// hide all 'HIDE REPLIES' buttons first
$('.show-replies').hide();


//  POST NEW COMMENT

$(' .post').on("click", function(event){
  var author = prompt("Enter author.");
  var comment = prompt("Enter comment.");

  var html = `
    <div class='comment'>
      <div class="author">${author} says:</div>
      <div class="message">${comment}</div>
      <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
    </div>`;

    var new_element = $(html);
    $('.comments').append(new_element);
});


// REPLY TO EXISTING COMMENT

$('.comments').on("click", '.reply', function(event){
  var author = prompt("Enter author.");
  var comment = prompt("Enter comment.");

  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  var html = `
    <div class='comment'>
      <div class="author">${author} says:</div>
      <div class="message">${comment}</div>
      <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
    </div>`;

    var new_element = $(html);

  repliesDiv.append(html);

});


// HIDE REPLIES

$('.comments').on("click", '.hide-replies', function(event){
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  repliesDiv.hide();

  // replace hide replies button with 'SHOW REPLIES' button
  commentDiv.find('.hide-replies').hide();    // hide
  commentDiv.find('.show-replies').show();    // show

  var num_replies = commentDiv.find('.replies > .comment').length;

  // reply vs replies
  if(num_replies == 1) var plurality = 'reply';
  else var plurality = 'replies';

  // display num of comments hidden;
  commentDiv.append(`<div class='reply-count'>${num_replies} ${plurality} hidden</div>`);

});

// SHOW REPLIES

$('.comments').on("click", '.show-replies', function(event){
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  repliesDiv.show();

  // replace show replies button with 'HIDE REPLIES' button
  commentDiv.find('.hide-replies').show();    // hide
  commentDiv.find('.show-replies').hide();    // show

  commentDiv.find('.reply-count').hide();
});
