"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {

  $(".show-replies").hide()


  $(".post").on("click", function() {
    var name = prompt("Enter Name");
    var author = '"' + name + '"' + " says:"
    var comment = prompt("Enter comment");
    $(".comments").append(createComment(author, comment))
  });


  $(".comments").on("click", ".reply", function() {
    var name = prompt("Enter Name");
    var author = '"' + name + '"' + " says:"
    var comment = prompt("Enter comment");
    $(this).parent().parent().children().eq(3).append(createComment(author, comment));
  })


  $(".comments").on("click", ".hide-replies", function() {
    $(this).parent().parent().children().eq(3).hide();
    $(this).parent().parent().children().eq(2).children().eq(0).hide();
    $(this).parent().parent().children().eq(2).children().eq(1).show();

  })


  $(".comments").on("click", ".show-replies", function() {
    $(this).parent().parent().children().eq(3).show();
    $(this).parent().parent().children().eq(2).children().eq(0).show();
    $(this).parent().parent().children().eq(2).children().eq(1).hide();
    console.log($(this).parent().parent().children().eq(2).children())

  })


  var createComment = function(author, comment) {

    var template = $(' \
    <div class="comment"> \
      <div class="author">"AUTHOR NAME HERE" says:</div> \
      <div class="message">COMMENT HERE</div> \
      <div class="controls"> \
        <button class="hide-replies btn btn-default">Hide Replies</button> \
        <button class="show-replies btn btn-default">Show Replies</button> \
        <button class="reply btn btn-default">Reply</button> \
      </div> \
      <div class="replies"></div> \
    </div>'
    );
    template.children().eq(0).text(author)
    template.children().eq(1).text(comment)
    return template
  }


})
