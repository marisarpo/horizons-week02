"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click',function(){
  var name = prompt("Enter your name");
  var comment1 = prompt("Enter your comment");

  $('.comments').append(`<div class="comment">
    <div class="author">"`+name+`" says:</div>
    <div class="message">`+comment1+`</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`

  );
})

$('.comment').on('click', '.reply', function(){
  var name = prompt("Enter your name");
  var comment1 = prompt("Enter your comment");

  $(this).parent().parent().find('.replies').append(`<div class="comment">
    <div class="author">"`+name+`" says:</div>
    <div class="message">`+comment1+`</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`
  );
})


$('.comments').on('click','.hide-replies', function(){
    $(this).parent().parent().find('.replies').hide();
    $(this).parent().find('.hide-replies').hide();
    $(this).parent().find('.show-replies').show();
})
$('.comments').on('click','.show-replies', function(){
    $(this).parent().parent().find('.replies').show();
    $(this).parent().find('.show-replies').hide();
    $(this).parent().find('.hide-replies').show();
})
