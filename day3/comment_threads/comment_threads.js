$(document).ready(function() {


"use strict";

// This file contains JavaScript that will run on your page.
$('.show-replies').hide()


$('.post').on('click', function() {
    var author = prompt('author: ')
    var comment = prompt('comment: ')
    var classComment = $('.comments').append($('<div class="comment"><div class="author">' + author + ' says:</div><div class="message">' + comment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>'))
    var arr = ($($(this).parent().children()[0]).children())
    $($($($(arr[arr.length - 1])).children()[2]).children()[1]).hide()

    var count = '<span class="count">' + ' Count: ' + 0 +'</span>'
    $($($(arr[arr.length - 1])).children()[2]).append(count)
})

$('.comments').on('click', '.reply', function() {
    var author = prompt('author: ')
    var comment = prompt('comment: ')
    $($(this).parent().parent().children()[3]).append($('<div class="comment"><div class="author">' + author + ' says:</div><div class="message">' + comment + '</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>'))
    $($($($($(this).parent().parent().children()[3]).children()[0]).children()[2]).children()[1]).hide()

    var newCount = $($($(this).parent().parent()).children()[3]).children().length
    $($(this).parent().children()[3]).text('Count: ' + newCount)

})

$('.comments').on('click', '.hide-replies', function() {
    $($(this).parent().parent().children()[3]).hide()
    $(this).hide()
    $($(this).parent().children()[1]).show()

})

$('.comments').on('click', '.show-replies', function() {
    $($(this).parent().parent().children()[3]).show()
    $(this).hide()
    $($(this).parent().children()[0]).show()
})



})
