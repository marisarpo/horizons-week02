"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(document).ready(function(){

//part 1
  $(".post").on("click", function(event){
    var author = window.prompt("Who is the author?");
    var comment = window.prompt("Enter your comment: ");
    var newElement = $(`<div class="comment">
  <div class="author"> "`+ author +`" says:</div>
  <div class="message">`+ comment +`</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);

$('.comments').append(newElement);
  });

// Part 2

$('.comments').on("click",'.reply', function(e){
  var author = window.prompt("Who is the author?");
  var comment = window.prompt("Enter your comment: ");
  var newElement = $(`<div class="comment">
<div class="author"> "`+ author +`" says:</div>
<div class="message">`+ comment +`</div>
<div class="controls">
  <button class="hide-replies btn btn-default">Hide Replies</button>
  <button class="show-replies btn btn-default">Show Replies</button>
  <button class="reply btn btn-default">Reply</button>
</div>
<div class="replies"></div>
</div>`);
// var $this = $(this);
var commentDiv = $(this).closest('.comment');
var repliesDiv = commentDiv.children('.replies');
repliesDiv.append(newElement);
});

//Part 3

$('.comments').on('click', '.hide-replies', function(e){
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide("100");
  $(this).hide();
  var numComments = repliesDiv.children().length;
  var newStr ="Show Replies("+numComments+")";
  $(this).siblings('.show-replies').text(newStr);
  $(this).siblings('.show-replies').show();
});

$('.comments').on('click', '.show-replies', function(e){
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show("100");
  $(this).hide();
  $(this).siblings('.hide-replies').show();
});

//Bonus 1
$('.show-replies').hide();

//Bonus 2



})
