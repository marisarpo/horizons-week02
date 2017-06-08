"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function(){
  //POST ON CLICK

  $(".post").on("click", function(){
    var au = prompt("Please enter your name", "name");
    var cm = prompt("Enter comment", "comment");
    var c = $('<div class="comment">');
    c.append($('<div class="author">' + au +" says:</div>"));
    c.append($('<div class="message">' + cm +"</div>"));
    var ct = $('<div class="controls">');
    ct.append($('<button class="hide-replies btn btn-default">Hide Replies</button>'));
    ct.append($('<button class="show-replies btn btn-default">Show Replies</button>'));
    ct.append($('<button class="reply btn btn-default">Reply</button>'));
    c.append(ct);
    c.append($('<div class="replies"></div>'));
    $(".comments").append(c);
  });

  //$(".reply").on("click", function(){
  $(".comments").on("click", ".reply", function() {
    var au = prompt("Please enter your name", "name");
    var cm = prompt("Enter comment", "comment");
    var c = $('<div class="comment">');
    c.append($('<div class="author">' + au +" says:</div>"));
    c.append($('<div class="message">' + cm +"</div>"));
    var ct = $('<div class="controls">');
    ct.append($('<button class="hide-replies btn btn-default">Hide Replies</button>'));
    ct.append($('<button class="show-replies btn btn-default">Show Replies</button>'));
    ct.append($('<button class="reply btn btn-default">Reply</button>'));
    c.append(ct);
    c.append($('<div class="replies"></div>'));
    var parComment = $(this).closest('.comment');
    var rep = parComment.children('.replies');
    rep.append(c);
  });

  $(".comments").on("click", ".hide-replies", function(){
    var comm = $(this).closest('.comment');
    var reps = comm.children('.replies');
    reps.hide();
  });

  $(".comments").on("click", ".show-replies", function(){
    var comm = $(this).closest('.comment');
    var reps = comm.children('.replies');
    reps.show();
  });



});
