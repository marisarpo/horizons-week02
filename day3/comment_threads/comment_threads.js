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

//$(".comments .comment .controls .reply").on("click", function() {alert("clicked comments")})
// for a reply
$(".comments").on("click", ".comment .controls .reply", function() {
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
  $(this).parent().siblings(".replies").append(post);
  });

  // hide replies
  $(".comments").on("click", ".comment .controls .hide-replies", function(){
    $(this).parent().siblings(".replies").hide();
    $(this).hide();
    $(this).siblings(".show-replies").show();
  })

  // show replies
  $(".comments").on("click", ".comment .controls .show-replies", function(){
    $(this).parent().siblings(".replies").show();
    $(this).siblings(".hide-replies").show();
    $(this).hide();
  })

  $(".comment").each(function(){
  //  console.log($(this).children(".replies"));
    if ($(this).children(".replies").children("comment").length < 1){
      $(this).children(".controls").children(".show-replies").hide();
    }
  });

});
