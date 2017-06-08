"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
var name;
var blurb;
var rname;
var rblurb;
var newcommen1 = "<div class=\"comment\"> <div class=\"author\">\""
var newcommen2 = "\" says:</div> <div class=\"message\">"
var newcommen3 = "</div> <div class=\"controls\"> <button class=\"hide-replies btn btn-default\">Hide Replies</button><button class=\"show-replies btn btn-default\">Show Replies</button> <button class=\"reply btn btn-default\">Reply</button></div><div class=\"replies\"></div></div>"

$(".post").click( function(){
  name = prompt("What is your name?");
  blurb = prompt("Comment");
  $("div .comments").append(newcommen1 + name + newcommen2 + blurb + newcommen3);
})

// $(".reply").click( function(){
//   rname = prompt("What is your name?");
//   rblurb = prompt("Comment");
//   $(this).append(newcommen1 + rname + newcommen2 + rblurb + newcommen3);
// })



$(".comments").on('click', '.reply', function(){
  rname = prompt("What is your name?");
  rblurb = prompt("Comment");
  $(this).parent().parent().children(".replies").append(newcommen1 + rname + newcommen2 + rblurb + newcommen3);
})

$(".comments").on('click', '.hide-replies', function(){

  $(this).parent().parent().children(".replies").hide();
  $(this).parent().parent().children("hide-replies").collapse();

})

$(".comments").on('click', '.show-replies', function(){
  $(this).parent().parent().children(".replies").show();
})
