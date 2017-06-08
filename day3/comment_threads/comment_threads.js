"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function(){

  $('.post').on('click', function() {
    var author = prompt("Enter your name")
    var message = prompt("Enter your comment")
    if (author && message) {
      author = $('<div class="author">').text('"' + author + '" says: ')
      message = $('<div class="message">').text(message)
      var controls = $('<div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div>')
      var replies = $('<div class="replies">')
      var comment0 = $('<div class="comment">')
      var comment = comment0.append(author,message,controls,replies)
      $('.comments').append(comment)
    }
  })

  $('.comment').on('click', '.reply', function() {
    var $this = $(this)
    var commentDiv = $this.closest('.comment')
    var repliesDiv = commentDiv.children('.replies')
    var author = prompt("Enter your name")
    var message = prompt("Enter your comment")
    if (author && message) {
      author = $('<div class="author">').text('"' + author + '" says: ')
      message = $('<div class="message">').text(message)
      var controls = $('<div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div>')
      var replies = $('<div class="replies">')
      var comment0 = $('<div class="comment">')
      var comment = comment0.append(author,message,controls,replies)
      repliesDiv.append(comment)
    }
  })

  $('.show-replies').hide();

  $('.comment').on('click', '.hide-replies', function() {
    var $this = $(this)
    var commentDiv = $this.closest('.comment')
    var hideRepliesDiv = commentDiv.children('.replies')
    var showRepliesDiv = commentDiv.find('.show-replies')
    hideRepliesDiv.hide()
    $this.hide()
    showRepliesDiv.show()
    var count = commentDiv.children('.replies').children('.comment').length
    console.log(count)
    $(showRepliesDiv).html("Show Replies " + count)
  })

  $('.comment').on('click', '.show-replies', function() {
    var $this = $(this)
    var commentDiv = $this.closest('.comment')
    var showRepliesDiv = commentDiv.children('.replies')
    var HideRepliesDiv = commentDiv.find('.hide-replies')
    showRepliesDiv.show()
    $this.hide()
    HideRepliesDiv.show()
  })

})
