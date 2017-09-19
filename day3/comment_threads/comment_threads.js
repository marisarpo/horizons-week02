"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.post').on('click', function(event){
  var name = window.prompt('Enter your name');
  var comment = window.prompt('Enter your comment');
  var newThing = $(`<div class="comment">
  <div class="author">"${name}" says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
  <button class="hide-replies btn btn-default">Hide Replies</button>
  <button class="show-replies btn btn-default">Show Replies</button>
  <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
  </div>`);
  $(".comments").append(newThing)
})

$('.comments').on('click', '.reply', function(event){
  var name = window.prompt('Enter your name');
  var comment = window.prompt('Enter your comment');
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var newThing = $(`<div class="comment">
  <div class="author">"${name}" says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
  <button class="hide-replies btn btn-default">Hide Replies</button>
  <button class="show-replies btn btn-default">Show Replies</button>
  <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
  </div>`);
  repliesDiv.append(newThing)
  newThing.find('.show-replies').hide()
})

$(".show-replies").hide()


$('.comments').on('click', '.hide-replies', function(event){
  var result = $(this).closest('.comment').children('.replies');
  var number = result.find('.comment').length
  result.hide()
  $(this).hide()
  $(this).siblings(".show-replies").show().text('Show Replies ' + number)

})

$('.comments').on('click', '.show-replies', function(event){
  var result = $(this).closest('.comment').children('.replies');
  result.show()
  $(this).hide()
  $(this).siblings(".hide-replies").show()
})
