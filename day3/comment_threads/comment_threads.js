"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function() {
    var username = prompt("Enter your name")
    var comment = prompt("Enter your comment")
    // $('.comments').append($('<div class="comment">'))
    // $('.comments').children().last().append($('<div class="author">"'+username+'" says:</div>'))
    // $('.comments').children().last().append($('<div class="message">'+comment+'</div>'))
    // $('.comments').children().last().append($('<div class="controls">'))
    // $('.comments').children().last().last().append('<button class="hide-replies btn btn-default">Hide Replies</button>')
    // $('.comments').children().last().last().append('<button class="show-replies btn btn-default">Show Replies</button>')
    // $('.comments').children().last().last().append('<button class="reply btn btn-default">Reply</button>')
    // $('.comments').children().last().last().append('</div> <div class="replies"></div></div>')
    $('.comments').append(`
      <div class="comment">
      <div class="author">"${username}" says:</div>
      <div class="message">${comment}</div>
      <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
      </div>
      `)
    })


$('.comments').on('click', '.reply', function() {
    var $this = $(this);
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    var username = prompt("Enter your name")
    var comment = prompt("Enter your comment")
    repliesDiv.append($('<div class="comment">'))
    repliesDiv.children().last().append($('<div class="author">"'+username+'" says:</div>'))
    repliesDiv.children().last().append($('<div class="message">'+comment+'</div>'))
    repliesDiv.children().last().append($('<div class="controls">'))
    repliesDiv.children().last().last().append('<button class="hide-replies btn btn-default">Hide Replies</button>')
    repliesDiv.children().last().last().append('<button class="show-replies btn btn-default">Show Replies</button>')
    repliesDiv.children().last().last().append('<button class="reply btn btn-default">Reply</button>')
    repliesDiv.children().last().last().append('</div> <div class="replies"></div></div>')
})

$('.comments').on('click', '.hide-replies', function() {
    $(this).closest('.comment').children('.replies').hide()
    $(this).hide()

})

$('.comments').on('click', '.show-replies', function() {
    $(this).closest('.comment').children('.replies').show()
    $('.hide-replies').show()
})
