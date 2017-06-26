"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {
    $('.show-replies').hide();
    // POST A COMMENT
    $('.post').on('click', function() {
        var author = prompt("Who is the author?");
        if (!author) { return false };
        var message = prompt("What is your comment?");
        if (!message) { return false };
        var newAppend = $(`<div class="comment">
         <div class="author">${author} says:</div>
          <div class="message">${message}</div>
          <div class="controls">
            <button class="hide-replies btn btn-default">Hide Replies</button>
            <button class="show-replies btn btn-default">Show Replies</button>
            <button class="reply btn btn-default">Reply</button>
          </div>
          <div class="replies"></div>
        </div>`);
        $('.comments').append(newAppend);
    })

    // POST A REPLY
    $('.comments').on('click', '.reply', function(){
        var author = prompt("Who is the author?");
        if (!author) { return false };
        var message = prompt("What is your comment?");
        if (!message) { return false };
        var newAppend = $(`<div class="comment">
         <div class="author">${author} says:</div>
          <div class="message">${message}</div>
          <div class="controls">
            <button class="hide-replies btn btn-default">Hide Replies</button>
            <button class="show-replies btn btn-default">Show Replies</button>
            <button class="reply btn btn-default">Reply</button>
          </div>
          <div class="replies"></div>
        </div>`);
        var $this = $(this);
        var commentDiv = $this.closest('.comment');
        var repliesDiv = commentDiv.children('.replies');
        repliesDiv.append(newAppend);
    })

    // HIDE REPLY (IMMEDIATE ONLY)
    // $('.controls').on('click', '.hide-replies', function() {
    //     var $this = $(this);
    //     var repliesDiv = $this.parent().siblings('.replies');
    //     var hideRepliesDiv = $this;
    //     var showRepliesDiv = $this.siblings('.show-replies');
    //     repliesDiv.hide();
    //     var numOfComments = repliesDiv.children('.comment').length;
    //     showRepliesDiv.text(`Show Replies (${numOfComments})`)
    //     showRepliesDiv.show();
    //     hideRepliesDiv.hide()
    // })
    // // SHOW REPLY (IMMEDIATE ONLY)
    // $('.controls').on('click', '.show-replies', function() {
    //     var $this = $(this);
    //     var repliesDiv = $this.parent().siblings('.replies');
    //     var hideRepliesDiv = $this.siblings('.hide-replies');
    //     var showRepliesDiv = $this;
    //     repliesDiv.show();
    //     showRepliesDiv.hide();
    //     hideRepliesDiv.show();
    //     var controlDiv = hideRepliesDiv.parent();
    //     controlDiv.children('num-comments').hide();
    // })

    // HIDE REPLY (ALL)
    $('.controls').on('click', '.hide-replies', function() {
        var $this = $(this);
        var repliesDiv = $this.parent().siblings('.replies');
        var hideRepliesDiv = $this;
        var showRepliesDiv = $this.siblings('.show-replies');
        repliesDiv.hide();
        var numOfComments = repliesDiv.find('.comment').length;
        showRepliesDiv.text(`Show Replies (${numOfComments})`)
        showRepliesDiv.show();
        hideRepliesDiv.hide()
    })
    // SHOW REPLY (ALL)
    $('.controls').on('click', '.show-replies', function() {
        var $this = $(this);
        var repliesDiv = $this.parent().siblings('.replies');
        var hideRepliesDiv = $this.siblings('.hide-replies');
        var showRepliesDiv = $this;
        repliesDiv.show();
        showRepliesDiv.hide();
        hideRepliesDiv.show();
        var controlDiv = hideRepliesDiv.parent();
        controlDiv.children('num-comments').hide();
    })

})
