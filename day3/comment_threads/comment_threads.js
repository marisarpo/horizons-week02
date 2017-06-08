"use strict";

// This file contains JavaScript that will run on your page.
$( document ).ready(function() {



    $(".post").on("click", "p", function() {
      var authorName = prompt("please enter your name");
      var ourComment = prompt("type comment");

      var newComment = $('<div class="comment"> \
      <div class="author">' + authorName +   'says:</div> \
      <div class="message"> ' + ourComment + '</div> \
      <div class="controls"> \
      <button class="hide-replies btn btn-default">Hide Replies</button> \
      <button class="show-replies btn btn-default">Show Replies</button> \
      <button class="reply btn btn-default">Reply</button> \
      </div> \
      <div class="replies"></div> \
      </div> \
      ')

      $('.comments').append(newComment)

    });

    $(".comments").on("click", ".reply", function() {
      var authorName = prompt("please enter your name");
      var ourComment = prompt("type comment");

      var newComment = $('<div class="comment"> \
      <div class="author">  'authorName' says:</div> \
      <div class="message"> ' + ourComment + '</div> \
      <div class="controls"> \
      <button class="hide-replies btn btn-default">Hide Replies</button> \
      <button class="show-replies btn btn-default">Show Replies</button> \
      <button class="reply btn btn-default">Reply</button> \
      </div> \
      <div class="replies"></div> \
      </div> \
      ')


      var commentDiv = $(this).closest('.comment');
      var repliesDiv = commentDiv.children('.replies');

      repliesDiv.append(newComment);


    })

    $(".comments").on("click", ".hide-replies", function() {
      var $this = $(this);
      var commentDiv = $this.closest('.comment');
      var repliesDiv = commentDiv.children(".replies");
      $(repliesDiv).hide();
    })

    $(".comments").on("click", ".show-replies", function() {
      var $this = $(this);
      var commentDiv = $this.closest('.comment');
      var repliesDiv = commentDiv.children(".replies");
      $(repliesDiv).show();
    })




});
