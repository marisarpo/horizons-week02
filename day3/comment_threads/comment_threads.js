"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(".post").click(function(){
    var name = prompt("Enter your name");
    var comment = prompt("Enter your comment");

   $(".comments").append(makeComment(name, comment)); 
   return false;
});

// obsolete part 2a
// $(".reply").click(function(){
//     var name = prompt("Enter your name");
//     var comment = prompt("Enter your comment");

//     var commentDiv =$(this).closest(".comment");
//     var repliesDiv = commentDiv.children(".replies");
//     repliesDiv.append(makeComment(name, comment));
// });

$('.comments').on('click', '.reply', function() {
    var name = prompt("Enter your name");
    var comment = prompt("Enter your comment");

    var commentDiv =$(this).closest(".comment");
    var repliesDiv = commentDiv.children(".replies");
    repliesDiv.append(makeComment(name, comment));
  });


function makeComment(name, comment){
    return `<div class="comment">
    <div class="author">"${name}" says:</div>
    <div class="message">${comment}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`;
}


$('.comments').on('click', '.show-replies', function() {
    var commentDiv =$(this).closest(".comment");
    var repliesDiv = commentDiv.children(".replies");
    repliesDiv.show();
    
    //toggle show / hide
    var controlsDiv = $(this).closest(".controls");
    var hideDiv = controlsDiv.children(".hide-replies");
    hideDiv.show();
    $(this).hide();
    
});


$('.comments').on('click', '.hide-replies', function() {
    var commentDiv =$(this).closest(".comment");
    var repliesDiv = commentDiv.children(".replies");
    repliesDiv.hide();

    // toggle show / hide
    var controlsDiv = $(this).closest(".controls");
    var showDiv = controlsDiv.children(".show-replies");
    showDiv.show();
    $(this).hide();
});


$('.show-replies').hide();