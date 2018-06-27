"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(".post").on('click', function(event){
  var name = prompt("Enter your name");
  var comment = prompt("Enter your comment");
  $(".comments>:last-child")
  .after(
    `<div class="comment">
        <div class="author">${name} says:</div>
        <div class="message">${comment}</div>
        <div class="controls">
          <button class="hide-replies btn btn-default">Hide Replies</button>
          <button class="show-replies btn btn-default">Show Replies</button>
          <button class="reply btn btn-default">Reply</button>
        </div>
      </div>`);
  console.log(name);
  console.log(comment);


})
