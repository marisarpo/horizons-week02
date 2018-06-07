"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

function askForComment() {
    var author = prompt('Enter your name: ');
    var comment = prompt('Enter your comment: ');
    var commentDivHTML = `
<div class="comment">
    <div class="author">"` + author + `" says:</div>
    <div class="message">` + comment + `</div>
    <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default" style="display: none">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
</div>
    `;
    return $(commentDivHTML);
}

$('.show-replies').hide();

$('button.post').on('click', function() {
    var newElem = askForComment();
    $('.comments').append(newElem);
});

$('.comments').on('click', '.reply', function() {
    var $this = $(this);
    var replies = $this.closest('.comment').children('.replies');
    var newElem = askForComment();
    replies.append(newElem);
});

$('.comments').on('click', '.hide-replies', function() {
    var $comment = $(this).closest('.comment');
    $comment.children('.replies').hide();
    $(this).hide();
    $comment.children('.controls').children('.show-replies').show();
});

$('.comments').on('click', '.show-replies', function() {
    var $comment = $(this).closest('.comment');
    $comment.children('.replies').show();
    $(this).hide();
    $comment.children('.controls').children('.hide-replies').show();
});