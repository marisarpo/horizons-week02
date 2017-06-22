"use strict";

var cardBeingEdited = null;

//add list button handler
$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').removeClass('collapse');
})

//add list cancel button handler
$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').addClass('collapse');
})

//add list save button handler
$('.add-list-save').on('click', function() {
  var title = $(this).siblings('input').val()

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

  $(this).closest('.list-container').before(list);
  $('.add-list-form-wrapper').addClass('collapse');

  $('.list-cards').sortable({
    revert: 100,
    connectWith: '.list-cards'
  })
})

//add card button handler
$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

//add card cancel button handler
$('.board').on('click', '.add-card-cancel', function() {
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

//add card save button handler
$('.board').on('click', '.add-card-save', function() {
  var title = $(this).siblings('input').val()

  var card = `<div class="card">
                <span class="card-more">
                  <span class="glyphicon glyphicon-align-left"></span>
                </span>
                <div class="card-body">${title}</div>
              </div>`;

  $(this).closest('.add-card-form-wrapper').parents().siblings('.list-cards').append(card);
  $('.add-card-form-wrapper').addClass('collapse');

  $(this).siblings('input').val('')
})

//adds card handler
$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  var content = cardBeingEdited.children('.card-body').text();
  $('#card-edit').modal();
  $('#card-edit-body').val(content)

  //adds save changes button handler
  $('.card-edit-save').on('click', function() {
    cardBeingEdited.children('.card-body').text($('#card-edit-body').val())
    $('#card-edit').modal('hide');
  })
})

//makes the lists sortable
$('.list-cards').sortable({
  revert: 100,
  connectWith: '.list-cards'
})

//occurs when the mouse goes over a card
$('.card').hover(function() {
  $(this).toggleClass('selected');
});

//occurs when a key is pressed
$(document).keypress(function(event) {
  if (event.which === 99 || event.which === 67)
    $('.selected').remove();
});

//occurs when you press the logo
$('.header-logo-default').on('click', function() {
  //changes the background color and title bar color
  var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  $('body').css('background-color', color);

  //changes the background color of the list
  color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  $('.list').css('background-color', color);

  //changes the card body and add card button color
  color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  $('.card-body, .add-card, .add-list').css('background-color', color);

  //finds the inverse color
  color = color.substring(1);
  color = parseInt(color, 16);
  color = 0xFFFFFF ^ color;
  color = color.toString(16);
  color = ("000000" + color).slice(-6);
  color = '#' + color;

  //changes the card body and add card button color
  $('.card-body, .add-card, .add-list').css('color', color);
})