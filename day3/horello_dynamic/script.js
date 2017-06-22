"use strict";

var cardBeingEdited = null;

$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').removeClass('collapse');
});

$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').addClass('collapse');
});

$('.add-list-save').on('click', function() {
  var title = $(this).siblings('input').val();
  var list = `<div class="list-container">
                <div class="list">
                  <div class="list-header">
                    <span class="list-title">${title}</span>
                  </div>
                <div class="list-cards"></div>
                <div class="list-footer">
                  <button class="add-card">Add a card...</button>
                  <div class="collapse add-card-form-wrapper">
                    <div class="well add-card-form">
                      <input type="text" class="form-control" placeholder="Card title">
                      <button type="button" class="btn btn-default add-card-save">
                        Save
                      </button>
                      <button type="button" class="btn btn-default add-card-cancel">
                        <span class="glyphicon glyphicon-remove"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  var newList = $(list);
  $(this).closest('.list-container').before(newList);
  $('.add-list-form-wrapper').addClass('collapse');
  $('.list-cards').sortable({
    revert: 100,
    connectWith: '.list-cards'
  });
});

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function() {
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.add-card-save', function() {
  var cardTitleString = $(this).siblings('input').val();
  var card = `<div class="card">
                <span class="card-more">
                  <span class="glyphicon glyphicon-align-left"></span>
                </span>
                <div class="card-body">${cardTitleString}</div>
              </div>`;
  var newCard = $(card);
  $(this).closest('.add-card-form-wrapper').parents().siblings('.list-cards').append(newCard);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
  $(this).siblings('input').val('');
});

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  var contents = cardBeingEdited.children('.card-body').text();
  $('#card-edit').modal();
  $('#card-edit-body').val(contents);
  $('.card-edit-save').on('click', function() {
    cardBeingEdited.children('.card-body').text($('#card-edit-body').val());
    $('#card-edit').modal('hide');
  });
});

$('.list-cards').sortable({
  revert: 100,
  connectWith: '.list-cards'
});

$('.card').hover(function() {
  $(this).toggleClass('selected');
});

$(document).keydown(function(e) {
  if (e.which === 67 || e.which === 99)
    $('.selected').remove();
});

$('.header-logo-default').on('click', function() {
  var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  $('body').css('background-color', color);

  color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  $('.list').css('background-color', color);

  color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  $('.card-body, .add-card, .add-list').css('background-color', color);

  color = color.substring(1);
  color = parseInt(color, 16);
  color = 0xFFFFFF ^ color;
  color = color.toString(16);
  color = ("000000" + color).slice(-6);
  color = "#" + color;
  $('.card-body, .add-card, .add-list').css('color', color);
});
