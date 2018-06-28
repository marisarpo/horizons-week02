"use strict";

$(document).ready(function() {

  $(".show-replies").hide();

  $(".post").on("click", function() {
    var author = prompt("Author: ");
    var comment = prompt("Comment: ");
    if (!author || !comment) {
      return null;
    }

    var string = `<div class="comment">
      <div class="author">${author} says:</div>
      <div class="message">${comment}</div>
      <div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div>
      <div class="replies"></div>
    </div>`

    $(".comments").append(string);
  });

  $(".comments").on("click", ".reply", function() {
    var author = prompt("Author: ");
    var comment = prompt("Comment: ");
    if (!author || !comment) {
      return null;
    }

    var string = `<div class="comment">
      <div class="author">${author} says:</div>
      <div class="message">${comment}</div>
      <div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div>
      <div class="replies"></div>
    </div>`

    var replies = $(this).closest('.comment').children('.replies');

    replies.append(string);
  });

  $(".comments").on("click", ".hide-replies", function() {
    $(this).closest(".comment").children(".replies").hide();
    $(this).hide();
    $(this).closest(".controls").children(".show-replies").show();
  });

  $(".comments").on("click", ".show-replies", function() {
    $(this).closest(".comment").children(".replies").show();
    $(this).hide();
    $(this).closest(".controls").children(".hide-replies").show();
  });

});
