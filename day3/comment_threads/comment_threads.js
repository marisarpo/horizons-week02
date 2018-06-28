"use strict";

var comment = 
      `<div class = "comment">
        <div class = "author"> ${name} says: </div>
        <div class = "message">${comment} </div>
        <div class = "controls"> 
          <button class = "hide-replies btn btn-default">Hide Replies</button>
          <button class = "show-replies btn btn-default">Show Replies</button>
          <button class = "reply btn btn-default">Reply</button>
        </div>
        <div class = "replies"></div>
      </div>`

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(".post").on("click", function (event)
{
  var name = prompt("Author name:");
  var comment = prompt("Comment");
  $(".comments").append(
      `<div class = "comment">
        <div class = "author"> ${name} says: </div>
        <div class = "message">${comment} </div>
        <div class = "controls"> 
          <button class = "hide-replies btn btn-default">Hide Replies</button>
          <button class = "show-replies btn btn-default">Show Replies</button>
          <button class = "reply btn btn-default">Reply</button>
        </div>
        <div class = "replies"></div>
      </div>`
  )
});

$(".comments").on("click", ".reply.btn",  function (event)
{
  var name = prompt("Author name:");
  var comment = prompt("Comment");
  var commentDiv = $(this).closest(".comment");
  var repliesDiv = commentDiv.children(".replies");
  repliesDiv.append(
      `<div class = "comment">
        <div class = "author"> ${name} says: </div>
        <div class = "message">${comment} </div>
        <div class = "controls"> 
          <button class = "hide-replies btn btn-default">Hide Replies</button>
          <button class = "show-replies btn btn-default">Show Replies</button>
          <button class = "reply btn btn-default">Reply</button>
        </div>
        <div class = "replies"></div>
      </div>`
  );
});

$(".comments").on("click", "button.hide-replies", function(event)
{
  $(this).closest(".comment").children(".replies").hide();
});


$(".comments").on("click", "button.show-replies", function(event)
{
  $(this).closest(".comment").children(".replies").show();
});
