"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(".post").on('click', function() {
    var author = window.prompt("Enter your name");
    var message = window.prompt("Enter your comment");
    $(".comments").append('<div class="comment">');
    $(".comment:last").append('<div class="author">' + "\"" + author + "\" says:" + "</div>");
    $(".comment:last").append('<div class="message">' + message + "</div>");
    $(".comment:last").append('<div class="controls">');
        $(".comment:last .controls").append('<button class="hide-replies btn btn-default">Hide Replies</button>');
        $(".comment:last .controls").append('<button class="show-replies btn btn-default">Show Replies</button>');
        $(".comment:last .controls").append('<button class="reply btn btn-default">Reply</button>');
    $(".comment:last").append('<div class="replies">');
})

$('.comments').on('click', '.reply', function() {
    var author = window.prompt("Enter your name");
    var message = window.prompt("Enter your comment");
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.append('<div class="comment">');
    $(repliesDiv.find(".comment:last-child")).append('<div class="author">' + "\"" + author + "\" says:" + "</div>");
    $(repliesDiv.find(".comment:last-child")).append('<div class="message">' + message + "</div>");
    $(repliesDiv.find(".comment:last-child")).append('<div class="controls">');
        $(repliesDiv.find(".comment:last-child .controls")).append('<button class="hide-replies btn btn-default">Hide Replies</button>');
        $(repliesDiv.find(".comment:last-child .controls")).append('<button class="show-replies btn btn-default">Show Replies</button>');
        $(repliesDiv.find(".comment:last-child .controls")).append('<button class="reply btn btn-default">Reply</button>');
    $(repliesDiv.find(".comment:last-child")).append('<div class="replies">');
})

$('.comments').on('click', '.hide-replies', function() {
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.hide();
})

$('.comments').on('click', '.show-replies', function() {
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.show();
})
