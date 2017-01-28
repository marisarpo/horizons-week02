"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.post').on('click', function() {
  var authorName = prompt("Name pls:");
  var comment = prompt("Share your thoughts pls:");

  var adder = $('<div class="comment">' +
    '<div class="author">' + authorName + ' says:</div>'+
    '<div class="message">'+ comment +'</div>' +
    '<div class="controls">' +
    '<button class="hide-replies btn btn-default">Hide Replies</button>'+
    '<button class="show-replies btn btn-default">Show Replies</button>'+
    '<button class="reply btn btn-default">Reply</button>'+
    '</div>'+
    '<div class="replies"></div>'+
    '</div>'
  );

  $('.comments').append(adder.clone());
})

$('.comments').on('click', '.reply', function() {
  var authorName = prompt("Name pls:");
  var comment = prompt("Share your thoughts pls:");

  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  var adder = $('<div class="comment">' +
    '<div class="author">' + authorName + ' says:</div>'+
    '<div class="message">'+ comment +'</div>' +
    '<div class="controls">' +
    '<button class="hide-replies btn btn-default">Hide Replies</button>'+
    '<button class="show-replies btn btn-default">Show Replies</button>'+
    '<button class="reply btn btn-default">Reply</button>'+
    '</div>'+
    '<div class="replies"></div>'+
    '</div>'
  );

  repliesDiv.append(adder);
})

$('.comments').on('click', '.hide-replies', function() {
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
})

$('.comments').on('click', '.show-replies', function() {
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
})
