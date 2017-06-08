"use strict";
$(document).ready(function(){
  $('.comments').on('click','.hide-replies', function(){
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    $(repliesDiv).hide();
  })
  
  $('.comments').on('click','.show-replies', function(){
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    $(repliesDiv).show();
  })

  $('.post').on('click', function(){
    var author = window.prompt("author");
    var comment = window.prompt("comment");
    var str = '<div class="comment"><div class="author">"'+ author +'" says:</div><div class="message">'+ comment +'</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>'
    console.log(str);
    $('.comments').append(str);
  })
  $('.comments').on('click', '.reply', function(){
    var authorCom = window.prompt("author");
    var commentCom = window.prompt("comment");
    var $this = $(this);
    var commentDiv = $this.closest('.comment');
    var repliesDiv = commentDiv.children('.replies');
    var strCom = '<div class="comment"><div class="author">"'+ authorCom +'" says:</div><div class="message">'+ commentCom +'</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>';
    repliesDiv.append(strCom);
  })
})

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
