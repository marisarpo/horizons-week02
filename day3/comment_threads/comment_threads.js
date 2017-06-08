"use strict";

// This file contains JavaScript that will run on your page.

// helper function
$(document).ready(function(){
  function returnComment(username, comment){
    return $('<div class="comment">'+
    '<div class="author">"' + username + '" says:</div>'+
    '<div class="message">' + comment + '</div>'+
    '<div class="controls">'+
    '<button class="hide-replies btn btn-default">Hide Replies</button>'+
    '<button class="show-replies btn btn-default" style="display:none">Show Replies</button>'+
    '<button class="reply btn btn-default">Reply</button>'+
    '</div>'+
    '<div class="replies"></div>'+
    '</div>');
  };

  $(".show-replies").hide(); //hide all show buttons when page first loaded

  $(".post").on('click', function(){
    var username = prompt("Enter your name");
    var comment = prompt("Enter your comment");

    $('.comments').append(returnComment(username, comment));

  });

  $(".comments").on('click', '.reply', function(){
    var username = prompt("Enter your name");
    var comment = prompt("Enter your comment");
    $(this).closest(".comment").children(".replies").append(returnComment(username, comment));
  });

  $(".comments").on('click', ".hide-replies", function(){
    $(this).closest(".controls").children(".show-replies").show();
    $(this).hide();
    $(this).closest(".comment").children(".replies").hide();
    var numberOfComments = $(this).closest(".comment").children(".replies").children().length;
    $(this).closest(".controls").children(".show-replies").append(" " + numberOfComments);

  });

  $(".comments").on('click', ".show-replies", function(){
    $(this).text("Show Replies");
    $(this).closest(".controls").children(".hide-replies").show();
    $(this).hide();
    $(this).closest(".comment").children(".replies").show();
  });

});
