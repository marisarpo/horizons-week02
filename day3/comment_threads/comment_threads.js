"use strict";

// This file contains JavaScript that will run on your page.
// Part 1
$(document).ready(function(){
  $('.post').on('click', function(event){
    var author = window.prompt("Author");
    var comment = window.prompt("Comment");
    var temp = `<div class="comment">
  <div class="author">"` + author + `" says:</div>
  <div class="message">`+ comment + `</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>
`;
    var newElement = $(temp);
    $('.comments').append(newElement);
  });

// Part 2

  $('.comments').on('click', '.comment .reply', function(event){
    var author = prompt("Author");
    var comment = prompt("Comment");
    var temp = `<div class="comment">
  <div class="author">"` + author + `" says:</div>
  <div class="message">`+ comment + `</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>
`;
    var newElement = $(temp);
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children(".replies");
    repliesDiv.append(newElement);
  });

  // Part 3a
  $('.comments').on('click', '.hide-replies', function(event){
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children(".replies");
    repliesDiv.hide(1000);

    //hide the hide replies
    $(this).hide();

    var numComments = repliesDiv.children().length;
    console.log(numComments);
    $(this).siblings(".show-replies").text("Show Replies (" + numComments + ")");
    $(this).siblings(".show-replies").show();




  });

  // Part 3b
  $('.comments').on('click', '.show-replies', function(event){
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.show(1000);

    // hide the show replies
    $(this).hide();
    $(this).siblings(".hide-replies").show();

  })

  // Part 4a
  $('.show-replies').hide();

  // Part 4c



});
