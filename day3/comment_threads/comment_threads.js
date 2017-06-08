"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {

  //Set the correct Show/Hide status for initial comments
  $(".comment").each(function(){

    //hide all show reply buttons
    $(this).children(".controls").children(".show-replies").hide()

    //hide hide-reply button if there are no replies  
    if(!$(this).children(".replies").children().length) {
      $(this).children(".controls").children(".hide-replies").hide()
      }
  })

  //Post Comment Event Listener
  $(".post").on("click", function() {

    //build DOM Element
    var reply = getReply();

    //Append to the Comments Div
    $(".comments").append(reply);
  });


  //Reply to a Comment
  $(".comments").on("click", ".comment .controls .reply", function() {
    var reply = getReply();
    var replies = $(this).parent().siblings(".replies").append(reply);
  });

  //Hide Comments
  $(".comments").on("click", ".comment .controls .hide-replies", function() {
    $(this).parent().siblings(".replies").hide();
    $(this).hide();
    $(this).siblings(".show-replies").show();
  });

  //Show Comments
  $(".comments").on("click", ".comment .controls .show-replies", function() {
    $(this).parent().siblings(".replies").show();
    $(this).hide();
    $(this).siblings(".hide-replies").show();
  });

});

function getReply() {
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

    return post;
}

function setHideShow() {

}