"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function(event) {

  var name = window.prompt('Enter your name brah')
  var comment = window.prompt('Enter your comment')
  var newDiv= $(`<div class="comment">
  <div class="author">"${name}"</div>
  <div class="message">${comment}</div>
  <div class="controls">
  <button class="hide-replies btn btn-default">Hide Replies</button>
  <button class="show-replies btn btn-default">Show Replies</button>
  <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
  </div>`)
  $(`.comments`).append(newDiv)
})

// $('.reply').on('click', function(event) {
// var name2 = window.prompt('Enter your name brah')
// var comment2 = window.prompt('Enter your comment')
// var newDiv1= $(`<div class="comment">
//   <div class="author">"${name2}"</div>
//   <div class="message">${comment2}</div>
//   <div class="controls">
//     <button class="hide-replies btn btn-default">Hide Replies</button>
//     <button class="show-replies btn btn-default">Show Replies</button>
//     <button class="reply btn btn-default">Reply</button>
//   </div>
//   <div class="replies"></div>
// </div>`)
// var $this = $(this);
// var commentDiv = $(this).closest('.comment');
// var repliesDiv = commentDiv.children('.replies');
// repliesDiv.append(newDiv1);
// $(this).closest('.comment').children('.replies').append(newDiv1)
// })

$('.comments').on('click', '.reply', function(event) {

  var name2 = window.prompt('Enter your name brah')
  var comment2 = window.prompt('Enter your comment')
  var newDiv1= $(`<div class="comment">
  <div class="author">"${name2}"</div>
  <div class="message">${comment2}</div>
  <div class="controls">
  <button class="hide-replies btn btn-default">Hide Replies</button>
  <button class="show-replies btn btn-default">Show Replies</button>
  <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
  </div>`)
  var $this = $(this);
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newDiv1);
  // $(this).closest('.comment').children('.replies').append(newDiv1)
})


$('.show-replies').hide();

$('.comments').on('click', ".hide-replies", function() {

  var result = $(this).closest('.comment').children('.replies');
  var newnew = result.find('.comment').length
  result.hide()
  $(this).hide();
  $(this).siblings(".show-replies").text("show-replies " + newnew).show()

})



$('.comments').on('click', '.show-replies', function() {

  var result = $(this).closest('.comment').children('.replies');
  result.show();
  $('.show-replies').hide()
  $('.hide-replies').show()


})
