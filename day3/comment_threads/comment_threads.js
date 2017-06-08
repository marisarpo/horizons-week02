"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.show-replies').hide();

$('.post').on('click',function(){
  var person = prompt("Enter a name");
  var comment = prompt("Enter your comment");

  var x = $('<div class = "comment">');
  var numchild = 0;

  x.append($('<div class = "numchild">' + '<h1>' + numchild +  '</h1>' + '</div>'));
  x.children('.numchild').hide();

  x.append($('<div class = "author" >' + person + '</div>'));
  x.append($('<div class = "message" >' + comment + '</div>'));


  var but1 = $('<button class = "hide-replies btn btn-default"> ' + 'Hide Replies' + '</button>');
  var but2 = $('<button class = "show-replies btn btn-default"> ' + 'Show Replies' + '</button>');
  var but3 = $('<button class = "reply btn btn-default"> ' + 'Reply' + '</button>');

  var control = $('<div class = "controls">');

  control.append(but1);
  control.append(but2);
  control.append(but3);

  x.append(control);
  x.append($('<div class = "replies">'));

  $('.comments').append(x);
});

$('.comments').on('click', '.reply',function(){


  var person = prompt("Enter a name");
  var comment = prompt("Enter your comment");

  var numchild = 0;

  var x = $('<div class = "comment">');

//  x.append($('<div class = "numchild">' + numchild + '</div>'));
  x.children('.numchild').hide();

  x.append($('<div class = "numchild">' + numchild + '</div>'));
  x.append($('<div class = "author" >' + person + '</div>'));
  x.append($('<div class = "message" >' + comment + '</div>'));

  var but1 = $('<button class = "hide-replies btn btn-default"> ' + 'Hide Replies' + '</button>');
  var but2 = $('<button class = "show-replies btn btn-default"> ' + 'Show Replies' + '</button>');
  var but3 = $('<button class = "reply btn btn-default"> ' + 'Reply' + '</button>');

  var control = $('<div class = "controls">');

  control.append(but1);
  control.append(but2);
  control.append(but3);

  x.append(control);
  x.append($('<div class = "replies">'));


  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  commentDiv.children('.numchild').html(   (+commentDiv.children('.numchild').html())+ 1  );
  repliesDiv.append(x);

  //console.log($this);

});

$('.comments').on('click', '.hide-replies', function(){

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  $this.hide();


  commentDiv.children('.controls').children(".show-replies").show();
  commentDiv.children('.numchild').show();

  repliesDiv.hide();


});


$('.comments').on('click', '.show-replies', function(){

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  $this.hide();
  commentDiv.children('.controls').children(".hide-replies").show();
  commentDiv.children('.numchild').hide();

  repliesDiv.show();

});
