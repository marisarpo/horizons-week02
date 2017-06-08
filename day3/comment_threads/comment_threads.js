"use strict";

// This file contains JavaScript that will run on your page.
$(window).ready(function(){
  $('button.post').on('click',function(){
    var name = prompt("Enter your name:");
    var comment = prompt("Enter your comment:");
    var div = $('<div>');
    div.addClass('comment');

    var auth = $("<div>" + "\"" + name + "\" says:</div>");
    auth.addClass('author');
    div.append(auth);

    var comm = $("<div>" + comment + "</div>");
    comm.addClass('message');
    div.append(comm);

    div.append("<div class=\"controls\"><button class=\"toggle-replies btn btn-default\">Hide Replies</button><button class=\"reply btn btn-default\">Reply</button></div>");
    div.append("<div class=\"replies\"></div>");
    $('.comments').append(div);
  })

  $('.comments').on('click', '.reply', function(){
    var name = prompt("Enter your name:");
    var comment = prompt("Enter your comment:");
    var div = $('<div>');
    div.addClass('comment');

    var auth = $("<div>" + "\"" + name + "\" says:</div>");
    auth.addClass('author');
    div.append(auth);

    var comm = $("<div>" + comment + "</div>");
    comm.addClass('message');
    div.append(comm);

    div.append("<div class=\"controls\"><button class=\"toggle-replies btn btn-default\">Hide Replies</button> <button class=\"reply btn btn-default\">Reply</button></div>");
    div.append("<div class=\"replies\"></div>");
    $(this).closest('.comment').children('.replies').append(div);
  })

  $('.comments').on('click', '.toggle-replies', function(){
    var curDiv = $(this).closest('.comment');
    curDiv.children('.replies').toggle();
    if($(this).text() !== 'Hide Replies'){
      $(this).text('Hide Replies');
    }else{
      $(this).text("Show Replies (" + $(this).closest('.comment').children('.replies').children().length + ")");
    }
  })
})
