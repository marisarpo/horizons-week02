"use strict";

// This file contains JavaScript that will run on your page.

$(".show-replies").hide();

function makeComment(){
  var author = prompt('Please enter an author');
  var comment = prompt('Please enter a comment');
  var commentObj = $(
    `<div class="comment">
      <div class="author">${author} says:</div>
      <div class="message">${comment}</div>
      <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
    </div>`);
  return commentObj;
}

$(".post").on("click", function(event){
  $(".comments").append(makeComment());
});

$(".comments").on("click", ".reply", function(event){
  $(this).closest(".comment").children(".replies").append(makeComment());
});

$(".comments").on("click", ".hide-replies", function(event){
  $(this).closest(".comment").children(".replies").hide();
  $(this).closest(".comment").find('.show-replies').show();
  $(this).hide();
  $(this).closest(".comment").find('.show-replies').text("Show Replies (" + $(this).closest(".comment").find(".comment").length + ")");

});

$(".comments").on("click", ".show-replies", function(event){
  $(this).closest(".comment").children(".replies").show();
  $(this).closest(".comment").find('.hide-replies').show();
  $(this).closest(".comment").find(".show-replies").hide();
  $(this).hide();
});
