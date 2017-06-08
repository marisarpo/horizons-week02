"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(document).ready(function(){
  $('.show-replies').each(function(item){
    $(this).hide();
  })
  $('.post').on('click',function(){
    var name = prompt("What is your name");
    var comment = prompt("Enter your comment");
    $(".comments").append("<div class='comment'> <div class='author'>"+"\""+ name +"\""+ ' says:'+"</div><div class='message'>"+comment+"</div><div class='controls'><button class='hide-replies btn btn-default'>Hide Replies</button><button class='show-replies btn btn-default'>Show Replies</button><button class='reply btn btn-default'>Reply</button></div><div class='replies'></div></div>")
  })
  // $('.reply').on('click',function(){
  //   var $this = $(this);
  //   var commentDiv = $this.closest('.comment');
  //   var repliesDiv = commentDiv.children('.replies');
  //   var name = prompt("What is your name");
  //   var comment = prompt("Enter your comment");
  //   repliesDiv.append("<div class='comment'> <div class='author'>"+"\""+ name +"\""+ ' says:'+"</div><div class='message'>"+comment+"</div><div class='controls'><button class='hide-replies btn btn-default'>Hide Replies</button><button class='show-replies btn btn-default'>Show Replies</button><button class='reply btn btn-default'>Reply</button></div><div class='replies'></div></div>");
  // })
  $('.comments').on('click','.reply',function(){
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    var name = prompt("What is your name");
    var comment = prompt("Enter your comment");
    repliesDiv.append("<div class='comment'> <div class='author'>"+"\""+ name +"\""+ ' says:'+"</div><div class='message'>"+comment+"</div><div class='controls'><button class='hide-replies btn btn-default'>Hide Replies</button><button class='show-replies btn btn-default'>Show Replies</button><button class='reply btn btn-default'>Reply</button></div><div class='replies'></div></div>");
  })
  $('.comments').on('click','.hide-replies',function(){
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    var repliesCount = commentDiv.find('.replies').length-1;
    console.log(repliesCount);
    var hideButton = commentDiv.find('.hide-replies');
    var showButton = commentDiv.find('.show-replies');
    $('.show-replies').text("Show Replies (" + repliesCount+ ")")
    repliesDiv.hide();
    hideButton.hide();
    showButton.show();
  })
  $('.comments').on('click','.show-replies',function(){
    var commentDiv = $(this).closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    var hideButton = commentDiv.find('.hide-replies');
    var showButton = commentDiv.find('.show-replies');
    repliesDiv.show();
    hideButton.show();
    showButton.hide();
  })
})
