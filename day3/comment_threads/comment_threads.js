"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function(){
    $('.post').on('click',function(){
        var author = prompt("Enter your name:");
        var message= prompt("Enter your comment:");
        var comment = '<div class="comment"><div class="author"> "'+ author + '" says:</div><div class="message">' + message + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div> <div class="replies"></div></div>'
        $('.comments').append($(comment))
    });
    
    $('.comments').on('click', '.reply', function(){
        var author = prompt("Enter your name:");
        var message= prompt("Enter your comment:");
        var reply = '<div class="comment"><div class="author"> "'+ author + '" says:</div><div class="message">' + message + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div> <div class="replies"></div></div>'
      
      var index = $(this).parent().parent().children().length - 1 
     $($(this).parent().parent().children().eq(index)).append($(reply))
        
    })
    
})



$('.comments').on('click','.hide-replies',function(){
    $(this).closest('.comment').find('.replies').hide();
})

$('.comments').on('click','.show-replies',function(){
    $(this).closest('.comment').find('.replies').show();
})

$('.show-replies').hide();

