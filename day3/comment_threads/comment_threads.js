"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(function() {

  $(".show-replies").hide();

  $(".post").on("click", function() {
    var author = prompt("Enter your name.");
    var comment = prompt("Enter your comment.");
    $(".comments").append( '\
      <div class="comment">\
        <div class="author">' + author + ' says:</div>\
        <div class="message">' + comment + '</div>\
        <div class="controls">\
          <button class="hide-replies btn btn-default">Hide Replies</button>\
          <button class="show-replies btn btn-default">Show Replies</button>\
          <button class="reply btn btn-default">Reply</button>\
        </div>\
        <div class="replies"></div>\
      </div>\
      '
    );
    $(".comments").children(".show-replies").hide();
  });

  $(".comments").on("click", ".reply", function() {
    var author = prompt("Enter your name.");
    var comment = prompt("Enter your comment.");
    $(this).parent().next().append('\
      <div class="comment">\
        <div class="author">' + author + ' says:</div>\
        <div class="message">' + comment + '</div>\
        <div class="controls">\
          <button class="hide-replies btn btn-default">Hide Replies</button>\
          <button class="show-replies btn btn-default">Show Replies</button>\
          <button class="reply btn btn-default">Reply</button>\
        </div>\
        <div class="replies"></div>\
      </div>\
      ');
      $(this).parent().next().children(".show-replies").hide();
  });

  $(".comments").on("click", ".hide-replies", function(e) {
    $(this).parent().next().hide();
    $(this).next().show();
    $(this).hide();

    var numComments = $(this).parent().next().find(".comment").length;
    $(this).parent().append("<h5 class='num-replies'>" + numComments + " replies hidden</h5>")
  });

  $(".comments").on("click", ".show-replies", function(e) {
    $(this).parent().next().show();
    $(this).prev().show();
    $(this).hide();

    $(this).siblings().remove(".num-replies");
  });
})
