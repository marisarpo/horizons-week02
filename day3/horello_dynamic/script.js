"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(".add-list").on('click',function(event) {
  $(".add-list-form-wrapper").removeClass('collapse');
})

$(".add-list-cancel").on('click',function(event) {
  $(".add-list-form-wrapper").addClass('collapse');
})

$(".add-list-save").on('click',function(event) {
  var listName = $(".add-list-form-wrapper input").val();
  var listDiv = '<div class="list-container">' +
                  '<div class="list">'+
                    '<div class="list-header">' +
                      '<span class="list-title">' + listName + '</span>' +
                    '</div>' +
                    '<div class="list-cards"></div>' +
                    '<div class="list-footer">' +
                      '<button class="add-card">Add a card...</button>'+
                      '<div class="collapse add-card-form-wrapper">'+
                        '<div class="well add-card-form">'+
                          '<input type="text" class="form-control" placeholder="Card title">'+
                          '<button type="button" class="btn btn-default add-card-save">'+
                            'Save'+
                          '</button>'+
                          '<button type="button" class="btn btn-default add-card-cancel">'+
                            '<span class="glyphicon glyphicon-remove"></span>'+
                          '</button>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>' +
                '</div>'
  $(this).closest(".list-container").before(listDiv);
  $(".add-list-form-wrapper").addClass('collapse');
})

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
  $(this).closest('.add-card-form-wrapper').removeClass('collapse');
  var cardTitle = $(this).siblings('input').val();
  var newCard = $('<div class="card">'+
                  '<span class="card-more">'+
                    '<span class="glyphicon glyphicon-align-left"></span>'+
                  '</span>'+
                  '<div class="card-body">' + cardTitle + '</div>'+
                '</div>')
  $(this).closest('.list-footer').siblings('.list-cards').append(newCard);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

var cardBeingEdited = null;
$('.board').on('click','.card',function() {
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  $('#card-edit-body').val($(this).find('.card-body').text());
})

$('.card-edit-save').on('click',function() {
  cardBeingEdited.find('.card-body').text($('#card-edit-body').val());
  $('#card-edit').modal('toggle');
})

$('.board').on('click',function() {
  $('.list-cards').sortable({
    connectWith:".list-cards"
  });
})

$(window).on('keydown',function(event) {
  if (String.fromCharCode(event.which) === 'C') {
    $('.card:hover').remove();
  }
})

$('.header-logo').on('click',function() {
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  $('body').css("background-color",getRandomColor());

})
