"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeinEdited = null;


$('.add-list-save').on('click', function() {
  var Input = $('.add-list-form-wrapper').find('input').val();
  var newList = $('<div class="list-container">' +
                  '<div class="list">' +
                    '<div class="list-header">' +
                      '<span class="list-title">' + Input +'</span>' +
                    '</div>' +
                    '<div class="list-cards"></div>' +
                    '<div class="list-footer">' +
                      '<button class="add-card">Add a card...</button>' +
                       '<div class="collapse add-card-form-wrapper">' +
                        '<div class="well add-card-form">' +
                          '<input type="text" class="form-control" placeholder="Card title">' +
                          '<button type="button" class="btn btn-default add-card-save">' +
                            'Save' +
                          '</button>' +
                          '<button type="button" class="btn btn-default add-card-cancel">' +
                            '<span class="glyphicon glyphicon-remove"></span>' +
                          '</button>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>');
  $(this).parent().parent().parent().parent().before(newList);
  $('.add-list-form-wrapper').toggleClass('collapse');
  $('.list-cards').sortable({
      connectWith: '.list-cards'
  })
})

$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').toggleClass('collapse');
})

$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').toggleClass('collapse');
})

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
  console.log($(this).parent());
  $(this).parent().parent().addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
  var Input = $(this).parent().parent().find('input').val();
  var newCard = $('<div class="card"> \
                  <span class="card-more"> \
                    <span class="glyphicon glyphicon-align-left"></span> \
                  </span> \
                  <div class="card-body">' + Input + '</div> \
                </div>')
  $(this).closest('.list-footer').siblings('.list-cards').append(newCard);
  $(this).closest('.add-card-form-wrapper').toggleClass('collapse')
})

$('.board').on('click', '.card', function() {
  cardBeinEdited = this;
  $('#card-edit').modal();
  $('#card-edit-body').val($(this).children('.card-body').text());

})

$('.card-edit-save').on('click', function() {
  var newCardBody = $('#card-edit-body').val();
  $(cardBeinEdited).find('.card-body').text(newCardBody);
  $('#card-edit').modal('toggle');
})

$('.list-cards').sortable({
    connectWith: '.list-cards'
})

$(document).on('keydown', function(event) {
  if (event.keyCode === 67) {
    $('.card:hover').remove();
  }
})

function changeColor() {
  var color_sets = ["#FF5733", "#FDFF33", "#4BFF33", "#33FFCC", "#334FFF", "#FF33F6"];
  var color_sets_list = ["#794B77", "#4D4B79", "#4B795F", "#75794B", "#79504B"];
  var color_sets_card = ["white", "blue", "red", "green", "brown"];
  $('body').css('background-color', color_sets[Math.floor(Math.random() * color_sets.length)]);
  $('.list').css('background', color_sets_list[Math.floor(Math.random() * color_sets_list.length)]);
  $('.card').css('background', color_sets_card[Math.floor(Math.random() * color_sets_card.length)])
}
$('.header-logo-default').on('click', function() {
  changeColor();

})
