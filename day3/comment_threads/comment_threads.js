"use strict";

$('.comments').children('.comment').children('.replies').hide()


$('#Newcomment').on('click',function(){
  var newauthor = prompt('Enter your name');
  var newcomment= prompt('Enter your comment');
  var Newcomment=$('<div class="comment"><div class="author">"'+newauthor+'" says:</div><div class="message">'+newcomment+'</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
  $('div .comments').append(Newcomment)

})

$('.comments').on('click', '.reply',function() {
    var newauthor = prompt('Enter your name');
    var newcomment= prompt('Enter your comment');
    var Newcomment=$('<div class="comment"><div class="author">"'+newauthor+'" says:</div><div class="message">'+newcomment+'</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.append(Newcomment);
  });

$('.comments').on('click', '.hide-replies',function() {
  var commentDiv = $(this).closest('.comment');//not collapsing all comment
  var repliesDiv = commentDiv.children('.replies');
    repliesDiv.hide();
    $('.controls .hide-replies').hide();
    $('.controls .show-replies').show();
  })

$('.comments').on('click', '.show-replies',function() {
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
      repliesDiv.show();
      $('.controls .show-replies').hide();
      $('.controls .hide-replies').show();
    })


// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
