"use strict";

// This file contains JavaScript that will run on your page.
$(document).ready(function () {
  $('.post').on('click', function() {
    var author = prompt("Enter your name");
    var comment = prompt("Enter your comment");
    $(".comments").append(
      '<div class="comment"><div class="author">"'+author+'" says:</div><div class="message">'+comment+'</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>')
    })

    function replyNew() {
      var $this = $(this);
      var author = prompt("Enter your name");
      var comment = prompt("Enter your comment");
      var commentDiv = $this.closest(".comment");
      var repliesDiv = commentDiv.children('.replies');
      var toAdd =
      `<div class="comment">
        <div class="author">"'+author+'" says:</div>
        <div class="message">'+comment+'</div>
        <div class="controls">
          <button class="hide-replies btn btn-default">Hide Replies</button>
          <button class="show-replies btn btn-default">Show Replies</button>
          <button class="reply btn btn-default">Reply</button>
        </div>
        <div class="replies"></div>
      </div>`;
      repliesDiv.append(toAdd);
    }

  $('.comments').on('click', ".reply", function replyNew() {
    var $this = $(this);
    var author = prompt("Enter your name");
    var comment = prompt("Enter your comment");
    var commentDiv = $this.closest(".comment");
    var repliesDiv = commentDiv.children('.replies');
    var toAdd =
    `<div class="comment">
      <div class="author">"`+author+`" says:</div>
      <div class="message">`+comment+`</div>
      <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
    </div>`;
    repliesDiv.append(toAdd);
  });


  var showReplies = $('body').find('.show-replies');
  showReplies.hide();

  $('.comments').on('click', '.hide-replies', function(event) {
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.find('.replies');
    repliesDiv.hide();
    var length = repliesDiv.length - 1;
    commentDiv.find('.hide-replies').hide();
    commentDiv.find('.show-replies').show();
    commentDiv.find('.show-replies').text("Show " + length +" Replies")
  })

  $('.comments').on('click', '.show-replies', function() {
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.show();
    commentDiv.find('.hide-replies').show();
    commentDiv.find('.show-replies').hide();
  })




  })
