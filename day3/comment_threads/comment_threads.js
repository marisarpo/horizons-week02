"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$( document ).ready(function(){
  $('.show-replies').hide();
})

$('.post').on('click', function(){
  var name= prompt('Enter your name');
  var comment=prompt('Enter your comment');
  $('.comments').append(`<div class="comment">
  <div class="author">${name} says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`)
})

$('.comments').on('click','.reply', function(){
  var name= prompt('Enter your name');
  var comment=prompt('Enter your comment');
  $(this).closest('.comment').children('.replies').append('<div class="comment">'+
  '<div class="author">'+ name+' '+' says:</div>'+
  '<div class="message">'+comment+' '+'</div>'+
  '<div class="controls">'+
    '<button class="hide-replies btn btn-default">Hide Replies</button>'+
    '<button class="show-replies btn btn-default">Show Replies</button>'+
    '<button class="reply btn btn-default">Reply</button>'+
  '</div>'+
  '<div class="replies"></div>'+
'</div>')
})

$('.comments').on('click', '.hide-replies', function(){
    $(this).closest('.comment').children('.replies').hide();
    var n=$(this).closest('.comment').find('.replies').length;
    $(this).siblings('.show-replies').text('Show Replies '+'('+(n-1)+')').show();
    $(this).hide();
})
$('.comments').on('click', '.show-replies', function(){
    $(this).closest('.comment').children('.replies').show();
    $(this).siblings('.hide-replies').show();
    $(this).hide();


})


//toggle() by itself does hide and show


//keep all that in html file and hide that
//make a new id called temlate and hide it
//then use pattern matching--replace author name with [author]

//mystring.replace
