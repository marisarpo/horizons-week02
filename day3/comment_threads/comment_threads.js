"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {

  //Post Comment Event Listener
  $(".post").on("click", function() {
    var author = prompt("Enter your name");
    var comment = prompt("Enter your comment");

    //build DOM Element
    var post = $(`
      <div class="comment">
        <div class="author">"` + author + `" says:</div>
        <div class="message">` + comment + `</div>
        <div class="controls">
          <button class="hide-replies btn btn-default">Hide Replies</button>
          <button class="show-replies btn btn-default">Show Replies</button>
          <button class="reply btn btn-default">Reply</button>
        </div>
        <div class="replies"></div>
      </div>`);

    //Append to the Comments Div
    $(".comments").append(post);
  });


  //
});