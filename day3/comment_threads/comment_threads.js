"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function(){

  //comment button
  $('.post.btn.btn-default').on('click', function(){
    var name = '"'+prompt("Name: ")+'"';
    var comment = prompt("Please enter your comment: ");

    var commentContent = $(`<div class="comment"><div class="author">${name} says:</div>
    <div class="message">${comment}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div></div>`);

    $('.comments').append(commentContent);
  });

  //new reply button
  $('.comments').on('click', '.reply', function(){
    var name = '"'+prompt("Name: ")+'"';
    var comment = prompt("Please enter your comment: ");
    var commentContent = $(`<div class="comment"><div class="author">${name} says:</div>
    <div class="message">${comment}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div></div>`)

    var $this = $(this); //element you clicked
    // $ gives you all the function, this only gives you
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.append(commentContent);
  });

  //hide and show replies
  $('.comments').on('click', '.hide-replies', function(){
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.hide();
  });

  $('.comments').on('click', '.show-replies', function(){
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.show();
  });

})
//prompt
