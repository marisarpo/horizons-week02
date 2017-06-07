"use strict";
$(document).ready(function(){
$('.show-replies').hide();

$('.post').on('click',function(){
var name = prompt('Enter your name: ');
var response = prompt('Enter your comment: ');
var newElement = $('<div class="comment"><div class="author">'+ '"' + name +'"' +' says:</div><div class="message">'+ response +'</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>')
$(".comments").append(newElement);
})

$('.comments').on('click','.reply',function(){
var name = prompt('Enter your name: ');
var response = prompt('Enter your comment: ');
var newElement = $('<div class="comment"><div class="author">'+ '"' + name +'"' +' says:</div><div class="message">'+ response +'</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>')
console.log($(this))
$(this).parent().parent().children('.replies').append(newElement);
})

$('.comments').on('click','.hide-replies',function(){
$(this).parent().parent().children('.replies').hide();
$(this).hide();
$(this).parent().children('.show-replies').show();
var commentCounter = $(this).closest('.comment').find('.comment').length;
$(this).closest('.comment').append($('<span>'+commentCounter+' comments hidden'+'</span>'))
})

$('.comments').on('click','.show-replies',function(){
$(this).parent().parent().children('.replies').show();
$(this).hide();
$(this).parent().children('.hide-replies').show();
$(this).closest('.comment').children('span').hide();
})

})
