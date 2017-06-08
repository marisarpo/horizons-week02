
"use strict";
$(document).ready(function () {

$('.demo').parallaxify();

var card_being_edited = null;

var currentHover = null;

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function () {
    $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function () {
    $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function () {
    var value = $($(this).parent().children()[0]).val();
    var list_element = '<div class="list-container"> <div class="list"> <div class="list-header"><span class="list-title">' + value + '</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card">Add a card...</button><div class="collapse add-card-form-wrapper"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default add-card-save">Save</button><button type="button" class="btn btn-default add-card-cancel"> <span class="glyphicon glyphicon-remove"></span> </button> </div> </div> </div> </div> </div>'
    var arr = $(this).parent().parent().parent().parent().parent().children();
    $(arr[arr.length - 2]).after(list_element);
})

$('.board').on('click', '.add-card', function () {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function () {
    $(this).parent().parent().addClass('collapse');
})

$('.board').on('click', '.add-card-save', function () {
    var value = $($(this).siblings('input')).val();
    var list_element = '<div class="card"> <span class="card-more"> <span class="glyphicon glyphicon-align-left"></span> </span> <div class="card-body">' + value + '</div> </div>'
    $(this).parent().parent().addClass('collapse');
    $($(this).parent().parent().parent().siblings('.list-cards')).append(list_element);
})

$('.board').on('click', '.card', function () {
    card_being_edited = this;
    $('#card-edit').modal();
    var text = $(this).find('.card-body').text();
    $('#card-edit-body').val(text);
})

$('.card-edit-save').on('click', function () {
    var value = $('#card-edit-body').val();
    $($(card_being_edited).children()[1]).text(value);
    $('#card-edit').modal('toggle');
})

$('.list-cards').sortable({
    connectWith: '.list-cards'
})

$('.card').hover(function(){
   $(this).toggleClass('active'); // if hovered then it has class active
});

$(document).keypress(function(e) {
    if(e.charCode === 99){
       $('.active').remove();
    }
});

$('.header-logo-default').on('click', function () {
    var choice = parseInt((Math.random() * 2)) + 1
    if (choice === 1) {
        $('.board').toggleClass('bg1')
        $('header').toggleClass('he1')
    }
    if (choice === 2) {
        $('.board').toggleClass('bg2')
        $('header').toggleClass('he2')
    }

})

});
