"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click',function(){
  console.log("post")
  var name = prompt("Enter your name");
  var comment = prompt("Enter your comment");
  var newDiv = $('<div class="comment">' +
                    '<div class="author">' + '"' + name + '"' + ' says:</div>' +
                    '<div class="message">' + comment + '</div>' +
                    '<div class="controls">' +
                      '<button class="hide-replies btn btn-default">Hide Replies</button>' +
                      '<button class="show-replies btn btn-default">Show Replies</button>' +
                      '<button class="reply btn btn-default">Reply</button>' +
                    '</div>' +
                    '<div class="replies"></div>' +
                    '</div>');
  $('.comments').append(newDiv);
})

$('.comments').on('click','.reply', function(event){
  var name = prompt("Enter your name");
  var comment = prompt("Enter your comment");
  var newDiv = $('<div class="comment">' +
                    '<div class="author">' + '"' + name + '"' + ' says:</div>' +
                    '<div class="message">' + comment + '</div>' +
                    '<div class="controls">' +
                      '<button class="hide-replies btn btn-default">Hide Replies</button>' +
                      '<button class="show-replies btn btn-default">Show Replies</button>' +
                      '<button class="reply btn btn-default">Reply</button>' +
                    '</div>' +
                    '<div class="replies"></div>' +
                    '</div>');
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newDiv);
})

$('.comments').on('click','.hide-replies',function(event) {
  var $this = $(this);
  var showButton = $this.closest('.controls').children('.show-replies');
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var replyCount = commentDiv.find('.replies').length-1;
  var countPara = $('<p>Reply Count: '+ replyCount + '</p>');
  commentDiv.children('.controls').append(countPara);
  repliesDiv.hide();
  $this.hide();
  showButton.show();

})

$('.comments').on('click','.show-replies',function(event) {
  var $this = $(this);
  var hideButton = $this.closest('.controls').children('.hide-replies');
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var countPara = commentDiv.children('.controls').children('p');
  countPara.remove();
  repliesDiv.show();
  $this.hide();
  hideButton.show();
})

$('.show-replies').hide();
