"use strict";

// This file contains JavaScript that will run on your page.


// Post a comment handler!
$('.post').on('click', function(){
  storeCommentInfo(".comments");

});

// Reply to a comment!
$(".comments").on('click', '.reply', function() {
   storeCommentInfo($(this).parent().parent().children(".replies"))
 });

// Hide comments
$(".comments").on('click', '.hide-replies', function() {
  $(this).parent().parent().children(".replies").hide();
});

// Show comments
$(".comments").on('click', '.show-replies', function() {
  $(this).parent().parent().children(".replies").show();
});



function storeCommentInfo(selector){
  var nameInfo = prompt("What is your name?");
  var commentInfo = prompt("Please write your comment")
  var newCommentStr = "<div class=\"comment\"> <div class=\"author\">" + nameInfo +
  "\" says:</div> <div class=\"message\">" + commentInfo
  + "</div> <div class=\"controls\"> <button class=\"hide-replies btn btn-default\">"
  + "Hide Replies</button><button class=\"show-replies btn btn-default\">Show Replies</"
  + "button><button class=\"reply btn btn-default\">Reply</button></div><div class=\"replies\"></div</div>";

  $(selector).append(newCommentStr);
}
