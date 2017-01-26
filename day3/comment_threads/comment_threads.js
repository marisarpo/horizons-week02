"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
// $("a").on("click",function(){
//   alert($(this).attr('href'));
//   return false;
// })

$(".post").click(function(){
  var name = prompt("Who you?");
  var comment = prompt("Post your message...");
  $('.comments').append('<div class= "comment"><div class="author">' + name +'says:</div><div class = "message">' +comment+'</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
});

$('.comments').on('click','.reply',function(){
  var name = prompt("tell me your name");
  var comment = prompt('Whaaaaaa');
  console.log($(this));
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append('<div class="replies"><div class="comment"><div class="author">'+ name + 'says:</div><div class="message">'+comment+'</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div></div>');
  $(repliesDiv).show()
});

$('.comments').on('click', '.hide-replies', function(event){
  var com = $(this).closest('.comment'); //gets you first ancestor of this...
  var repl = com.children('.replies');
  $(repl).hide();
})
$('.comments').on('click', '.show-replies', function(event){
  var com = $(this).closest('.comment'); //gets you first ancestor of this...
  var repl = com.children('.replies');
  $(repl).show();
})

$('.show-replies').show();
