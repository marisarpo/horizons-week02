"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document)
  .ready(function() {
    // prompting the user for a name and a comment after the "Add comment" button is clicked
    $('.show-replies')
      .hide();

    $('button.post')
      .on('click', function() {
        var author = prompt("Enter your name");
        var comment = prompt("Comment here");
        var newElement = $('<div class="comment">\
            <div class="author">' + author + ' says:</div>\
            <div class="message">' + comment + '</div>\
            <div class="controls">\
              <button class="hide-replies btn btn-default">Hide Replies</button>\
              <button class="show-replies btn btn-default">Show Replies</button>\
              <button class="reply btn btn-default">Reply</button>\
            </div>\
            <div class="replies"></div>\
          </div>')
        $('.comments')
          .append(newElement);
      });
    $('.comments')
      .on('click', '.reply', function() {
        var $this = $(this);
        var commentDiv = $this.closest('.comment');
        var repliesDiv = commentDiv.children('.replies');
        var author = prompt("Enter your name");
        var comment = prompt("Enter your comment");
        var newElement = $('<div class="comment">\
          <div class="author">' + author + ' says:</div>\
          <div class="message">' + comment + '</div>\
          <div class="controls">\
            <button class="hide-replies btn btn-default">Hide Replies</button>\
            <button class="show-replies btn btn-default">Show Replies</button>\
            <button class="reply btn btn-default">Reply</button>\
          </div>\
          <div class="replies"></div>\
        </div>')
        // $($(this)
        //     .parent())
        //   .append(newElement);

        repliesDiv.append(newElement);
      });


    // Part 3: Show/hide replies

    $('.comments')
      .on('click', '.hide-replies', function() {
        var $this = $(this); // .hide-replies
        var commentDiv = $this.closest('.comment');
        var hideRepliesDiv = commentDiv.children('.replies');
        var showButton = commentDiv.children('.controls')
          .children('.show-replies');
        var numberOfComments = commentDiv.find('.comment')
          .length;
        var newLine = "Show Replies" + " (" + numberOfComments + ")";
        $(showButton)
          .text(newLine);
        $(this)
          .hide();
        $(showButton)
          .show();
        $(hideRepliesDiv)
          .hide();
      });
    $('.comments')
      .on('click', '.show-replies', function() {
        var $this = $(this); // .hide-replies
        var commentDiv = $this.closest('.comment');
        var showRepliesDiv = commentDiv.children('.replies');
        var hideButton = commentDiv.children('.controls')
          .children('.hide-replies');
        $(this)
          .hide();
        $(hideButton)
          .show();
        $(showRepliesDiv)
          .show();
      });
  });
