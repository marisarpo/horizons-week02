"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$( ".post" ).click(function() { //.(".post". on("click",function(){ } ))
  var author = prompt("Enter author");
  var comment= prompt("Enter comment");
});

//post btn btn-default

//html inside of a javascript screen

$(".post").on("click", function() { // why not post buttn? cuz I only need to call 1 class
 console.log("clicker")
 var author = prompt("Enter an author");
 var comment = prompt("Enter a comment");

var html = '<div class="comment">' +
 '<div class="author">"' + author + '" says:</div>' + // "''": to put double quotation inside a string
 '<div class="message">' + comment + '</div>' + // why message and author different in syntax? cuz no quotation around
 '<div class="controls">' +
   '<button class="hide-replies btn btn-default">Hide Replies</button>' +
   '<button class="show-replies btn btn-default">Show Replies</button>' +
   '<button class="reply btn btn-default">Reply</button>' +
 '</div>' +
 '<div class="replies"></div>' +
'</div>'
$(".comments").append(html)
})


// reply buttons
$('.comments').on('click', '.reply',
  function() {
    var $this = $(this); // this refer to the class "comment"
    var commentDiv = $this.closest('.comment'); // parent of comment is comments -> find "comment"
    var repliesDiv = commentDiv.children('.replies'); //replies are children of Comment -> find children

    var author = prompt("Enter your name:");
    var comment = prompt("Enter your comment:");

    var html = '<div class="comment">' + // why add the "+ " here?
      '<div class="author">"' + author + '" says:</div>' +
      '<div class="message">' + comment + '</div>' +
      '<div class="controls">' +
        '<button class="hide-replies btn btn-default">Hide Replies</button>' +
        '<button class="show-replies btn btn-default">Show Replies</button>' +
        '<button class="reply btn btn-default">Reply</button>' +
      '</div>' +
      '<div class="replies"></div>' +
    '</div>'

    repliesDiv.append(html);  });

/* part 2
$('.comments').on('click', '.reply', function() { // class comments, not reply Because
  // if you add a new reply by appending it will not bind to the class "reply" but "comments"
  // `this` points to the current `.reply` button that was clicked
  var $this = $(this); // this refer to the class "comment"
  var commentDiv = $this.closest('.comment'); // parent of comment is comments -> find "comment"
  var repliesDiv = commentDiv.children('.replies'); //replies are children of Comment -> find children

  var author = prompt("Enter your name:");
  var comment = prompt("Enter your comment:");

  var html = '<div class="comment">' +
    '<div class="author">"' + author + '" says:</div>' +
    '<div class="message">' + comment + '</div>' +
    '<div class="controls">' +
      '<button class="hide-replies btn btn-default">Hide Replies</button>' +
      '<button class="show-replies btn btn-default">Show Replies</button>' +
      '<button class="reply btn btn-default">Reply</button>' +
    '</div>' +
    '<div class="replies"></div>' +
  '</div>'

  repliesDiv.append(html); // why no $ here? Because I already call $ at this ->commentDiv -> repliesDiv. JQuery does chaining
}); */

//part 3
$('.comments').on('click', '.hide-replies',
  function() {
    var $this = $(this); // this refer to the class "comment"
    var commentDiv = $this.closest('.comment'); // parent of comment is comments -> find "comment"
    var repliesDiv = commentDiv.children('.replies'); //replies are children of Comment -> find children

    repliesDiv.hide(); //just the variable.hide

// thats we need

  });

  $('.comments').on('click', '.show-replies',
    function() {
      var $this = $(this); // this refer to the class "comment"
      var commentDiv = $this.closest('.comment'); // parent of comment is comments -> find "comment"
      var repliesDiv = commentDiv.children('.replies'); //replies are children of Comment -> find children


    repliesDiv.show();

    });
