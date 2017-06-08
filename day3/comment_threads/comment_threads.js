"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(document).ready(function() {



  $('button.post').on('click', function() {
    var author = prompt("Enter your name");
    var comment = prompt("Comment here");
    var newComment = $('<div class="comment"> <div class="author">' + author +  ' says:</div> <div class="message">' + comment + '</div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div> </div>');



    $('div.comments').append(newComment);

  })

  $('.comments').on('click','.reply', function() {
    var author = prompt("Enter your name");
    var comment = prompt("Comment here");
    var newComment = $('<div class="comment"> <div class="author">' + author +  ' says:</div> <div class="message">' + comment + '</div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div> </div>');

    $(this).closest('.comment').children(' .replies').append(newComment);


  })


  $('.show-replies').hide()

  $('.comments').on('click', '.hide-replies', function(){


    $(this).closest('.comment').children(' .replies').hide();
    $(this).closest('.comment').children(' .controls').children('.hide-replies').hide()
    $(this).closest('.comment').children(' .controls').children('.show-replies').show()

    var comments = $(this).closest('.comment').children(' .replies').children().length
    var newLine = 'Show replies ' + '(' + comments + ')'

    $(this).closest('.comment').children(' .controls').children('.show-replies').text(newLine);


  })


  $('.comments').on('click', '.show-replies', function(){


    $(this).closest('.comment').children(' .replies').show();
    $(this).closest('.comment').children(' .controls').children('.show-replies').hide()
    $(this).closest('.comment').children(' .controls').children('.hide-replies').show()

  })



})
