"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {
	$('.show-replies').hide();
});

$("button.post").on('click', function() {
	var author = prompt("Author?");
	var comment = prompt("Comment?");

	var newDiv = `<div class="comment">
          <div class="author">${author} says:</div>
          <div class="message">${comment}</div>
          <div class="controls">
            <button class="hide-replies btn btn-default">Hide Replies</button>
            <button class="show-replies btn btn-default">Show Replies</button>
            <button class="reply btn btn-default">Reply</button>
          </div>
          <div class="replies"></div>
        </div>`;
    $('.comments').append(newDiv);
});

$('.comments').on('click', '.reply', function(){
	var author = prompt("Author?");
	var comment = prompt("Comment?");

	var newDiv = `<div class="comment">
          <div class="author">${author} says:</div>
          <div class="message">${comment}</div>
          <div class="controls">
            <button class="hide-replies btn btn-default">Hide Replies</button>
            <button class="show-replies btn btn-default">Show Replies</button>
            <button class="reply btn btn-default">Reply</button>
          </div>
          <div class="replies"></div>
        </div>`;

    $(this).closest('.comment').children('.replies').append(newDiv);
});

function getParagraph(count) {
	return "<p class=\"deleter\">" + String(count) + " Replies</p>";
}

function getCount(jelm) {
  var len = jelm.children('.replies').children().length;
  if (len === 0 || len === undefined) {
    return 0;
  }

  var total = jelm.children('.replies').children().length;

  jelm.children('.replies').children().each(function() {
    total += getCount($(this));
  });

  return total;
}

$('.comments').on('click', '.hide-replies', function() {
	$(this).closest('.comment').children('.replies').hide();
	$(this).closest('.comment').find('.hide-replies').hide();
	$(this).closest('.comment').find('.show-replies').show();
	$(this).closest('.comment').find('.controls').append(getParagraph(getCount($(this).parent().parent())));
});

$('.comments').on('click', '.show-replies', function() {
	$(this).closest('.comment').children('.replies').show();
	$(this).closest('.comment').find('.show-replies').hide();
	$(this).closest('.comment').find('.hide-replies').show();
	$(this).closest('.comment').find('.deleter').remove();
});