"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function(){
  var author = prompt('Enter an author:');
  var comment = prompt('Enter a comment:');

  var newElement = '<div class=' + '"comment">' + '<div class="author">' + author +
      ' says: </div>' + '<div class="message">' + comment + '</div>' + '<div class="controls">' +
      '<button class="hide-replies btn btn-default">' + 'Hide Replies</button>' +
      '<button class="show-replies btn btn-default">' + 'Show Replies</button>' +
      '<button class="reply btn btn-default">' + 'Reply</button>' +
      '</div>' + '<div class="replies">' + '</div>' + '</div>';


      $('.comments').append(newElement);

});


//reply handler

// $('.reply').on('click', function(){
$('.comments').on('click', '.reply',
  function() {

  // `this` points to the current `.reply` button that was clicked
  var author = prompt('Enter an author:');
  var comment = prompt('Enter a comment:');
  var newReply = '<div class=' + '"comment">' + '<div class="author">' + author +
      ' says: </div>' + '<div class="message">' + comment + '</div>' + '<div class="controls">' +
      '<button class="hide-replies btn btn-default">' + 'Hide Replies</button>' +
      '<button class="show-replies btn btn-default">' + 'Show Replies</button>' +
      '<button class="reply btn btn-default">' + 'Reply</button>' +
      '</div>' + '<div class="replies">' + '</div>' + '</div>';

      var $this = $(this);
      var commentDiv = $this.closest('.comment');
      var repliesDiv = commentDiv.children('.replies');
      repliesDiv.append(newReply);
      // evt.stopPropagation();
      // evt.preventDefault();
      //if we had function(evt) in the beginning
      repliesDiv.show();
      return false;
});


//hide replies
$('.comments').on('click','.hide-replies',
  function() {
    // var $this = $(this);
    var commentDiv = $(this).closest('.comment');
    // console.log(commentDiv);
    var repliesDiv = commentDiv.children('.replies');
    var sibling = $(this).siblings('.reply')
    sibling.hide();
    // $("re")
    // console.log(repliesDiv);
    repliesDiv.hide();
    return false;

  });


  $('.comments').on('click','.show-replies',
    function() {
      // var $this = $(this);
      var commentDiv = $(this).closest('.comment');
      // console.log(commentDiv);
      var repliesDiv = commentDiv.children('.replies');
      var sibling = $(this).siblings('.reply')
      sibling.show();
      // $("re")
      // console.log(repliesDiv);
      repliesDiv.show();
      return false;
    });
