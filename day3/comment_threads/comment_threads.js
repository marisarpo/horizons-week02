"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function(){
	$('.show-replies').hide();
})

$('.post').on('click', function(){
	var name = prompt("Enter an author");
	var comment = prompt("Enter a comment");
	$('.comments').append('<div class="comment">'+
  '<div class="author">'+ name+' '+' says:</div>'+
  '<div class="message">'+comment+' '+'</div>'+
  '<div class="controls">'+
    '<button class="hide-replies btn btn-default">Hide Replies</button>'+
    '<button class="show-replies btn btn-default">Show Replies</button>'+
    '<button class="reply btn btn-default">Reply</button>'+
  '</div>'+
  '<div class="replies"></div>'+
'</div>');
})

$('.comments').on('click', ".reply", function(){

	var name = prompt("Enter an author");
	var comment = prompt("Enter a comment")
	var $this = $(this);
  	var commentDiv = $this.closest('.comment');
  	var repliesDiv = commentDiv.children('.replies');
	repliesDiv.append('<div class="comment">'+
  '<div class="author">'+ name+' '+' says:</div>'+
  '<div class="message">'+comment+' '+'</div>'+
  '<div class="controls">'+
    '<button class="hide-replies btn btn-default">Hide Replies</button>'+
    '<button class="show-replies btn btn-default">Show Replies</button>'+
    '<button class="reply btn btn-default">Reply</button>'+
  '</div>'+
  '<div class="replies"></div>'+
'</div>');
})

$('.comments').on('click', ".hide-replies", function(){
	var $this = $(this);
  	var commentDiv = $this.closest('.comment');
  	var repliesDiv = commentDiv.children('.replies');
  	repliesDiv.hide();

  	$this.siblings('.show-replies').text("Show Replies" + " " + "("  + (commentDiv.find(".replies").length - 1) + ")")
  	$this.siblings('.show-replies').show();
  	$this.hide()

})

$('.comments').on('click', ".show-replies", function(){
	var $this = $(this);
  	var commentDiv = $this.closest('.comment');
  	var repliesDiv = commentDiv.children('.replies');
	repliesDiv.show();
	$this.siblings('.hide-replies').show();
  	$this.hide()
})
