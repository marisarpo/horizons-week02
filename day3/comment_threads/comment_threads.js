"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(".post").click(function(){
  var name = window.prompt("Enter your name","");
  var comment = window.prompt("Enter your comment","");
  var person = $('<div class="comment"><div class="author">' + name + "''" + ' says:</div>');
  var comments = $('<div class="message">' + comment + '</div>') ;
  var controls = $('<div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
  var output = person.append(comments).append(controls);
  $(".comments").append(output);
});

$('.comments').on("click",".reply", function(){
 var name = window.prompt("Enter your name","");
 var comment = window.prompt("Enter your comment","");
 var person = $('<div class="comment"><div class="author">' + name + "''" + ' says:</div>');
 var comments = $('<div class="message">' + comment + '</div>') ;
 var controls = $('<div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>');
 var output = person.append(comments).append(controls);
 var $this = $(this);
 var commentDiv = $this.closest('.comment');
 var repliesDiv = commentDiv.children('.replies');
 repliesDiv.append(output);
 });

 $(document).ready(function(){
      $(".show-replies").hide();
});

$('.comments').on("click", ".hide-replies", function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
  $this.hide();
  var parent = $this.closest('.controls');
  var showbutton = parent.children('.show-replies');
  showbutton.show();
});

$('.comments').on("click", ".show-replies", function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
  $this.hide();
  var parent = $this.closest('.controls');
  var hidebutton = parent.children('.hide-replies');
  hidebutton.show();
});
