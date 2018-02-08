"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click',function(){
  var newAuth = prompt("Author")
  var newComm = prompt("Comment")
  var post1 = $(`<div class="comment">
    <div class="author">`+newAuth+` says:</div>
    <div class="message">`+newComm+`</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
</div>`)
  $('.comments').append(post1)
})

$('.comments').on('click','.reply', function(){
  var newAuth = prompt("Author")
  var newComm = prompt("Reply")
  var reply1 = $(`<div class="comment">
    <div class="author">`+newAuth+` says:</div>
    <div class="message">`+newComm+`</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
</div>`)
  $(this).parent().append(reply1)
})

$('.comments').on('click','.hide-replies', function(){

  $(this).parent().siblings('.replies').hide()
})

$('.comments').on('click','.show-replies', function(){
  $(this).parent().siblings('.replies').children().show()
})
