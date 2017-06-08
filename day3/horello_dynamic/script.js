"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(".add-list").on("click", function (){
  $(".add-list-form-wrapper").removeClass('collapse');
});

$(".add-list-cancel").on("click", function (){
  $(".add-list-form-wrapper").addClass('collapse');
});

$(".add-list-save").on("click", function (){
  $(".add-list-form-wrapper").addClass('collapse');
});

$('.add-list-save').on('click', function() {
    var title = $('.add-list-form-wrapper input').val();
    $('.add-list').before('<div class="list-container">');
        $('.list-container:last').append('<div class="list">');
            $('.list:last').append('<div class="list-header">');
                $('.list-header:last').append('<span class="list-title">' + title + '</span>');
            $('.list:last').append('<div class="list-cards">');
            $('.list:last').append('<div class="list-footer">');
                $('.list-footer:last').append('<button class="add-card">Add a card...</button>');
                $('.list-footer:last').append('<div class="collapse add-card-form-wrapper">');
                    $('.add-card-form-wrapper:last').append('<div class="well add-card-form">');
                        $('.add-card-form:last').append('<input type="text" class="form-control" placeholder="Card title">');
                        $('.add-card-form:last').append('<button type="button" class="btn btn-default add-card-save">Save</button>');
                        $('.add-card-form:last').append('<button type="button" class="btn btn-default add-card-cancel"></button>');
                            $('.add-card-cancel:last').append('<span class="glyphicon glyphicon-remove"></span>');


})
