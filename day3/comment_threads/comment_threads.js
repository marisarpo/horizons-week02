"use strict";

$('.post').on('click', function(){
  var author = window.prompt('Enter your name');
  var comment = window.prompt('Enter your comment');
  $('.comments').append('<div class = "comment"><div class="author">"' + author + '" says:</div><div class="message">'+ comment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
});

$(document).on('click', '.reply', function(){
  var author = window.prompt('Enter your name');
  var comment = window.prompt('Enter your comment');
  var divToAppend=$(this).closest('.comment').children('.replies');
  divToAppend.append('<div class = "comment"><div class="author">"' + author + '" says:</div><div class="message">'+ comment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
});

$(document).on('click', '.hide-replies', function(){
  $(this).closest('.comment').children('.replies').hide();
  $(this).closest('.comment').children('.controls').children('.hide-replies').hide();
  $(this).closest('.comment').children('.controls').children('.show-replies').show();

})

$(document).on('click', '.show-replies', function(){
  $(this).closest('.comment').children('.replies').show();
  $(this).closest('.comment').children('.controls').children('.show-replies').hide();
  $(this).closest('.comment').children('.controls').children('.hide-replies').show();
})
