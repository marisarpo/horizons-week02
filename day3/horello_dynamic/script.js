"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').click(function() {
  $('.add-list-form-wrapper').removeClass('collapse');
});

$('.add-list-cancel').click(function() {
  $('.add-list-form-wrapper').addClass('collapse');
});

$('.add-list-save').click(function() {
  var $this = $(this);
  var listName = $this.siblings('input').val()
  var listHTML = '\
    <div class="list-container">\
      <div class="list">\
        <div class="list-header">\
          <span class="list-title">' + listName +'</span>\
        </div>\
        <div class="list-cards"></div>\
        <div class="list-footer">\
          <button class="add-card">Add a card...</button>\
          <div class="collapse add-card-form-wrapper">\
            <div class="well add-card-form">\
              <input type="text" class="form-control" placeholder="Card title">\
              <button type="button" class="btn btn-default add-card-save">\
                Save\
              </button>\
              <button type="button" class="btn btn-default add-card-cancel">\
                <span class="glyphicon glyphicon-remove"></span>\
              </button>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>';

  var closestListContainer = $this.closest('.list-container')
  closestListContainer.before(listHTML);
  $this.siblings('input').val('')
  $('.add-list-form-wrapper').addClass('collapse');

  $('.list-cards').sortable({
    connectWith: '.list-cards',
    });

});

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function() {
  $(this).closest('.list-footer').children('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.add-card-save', function() {
  var $this = $(this);
  var cardName = $this.siblings('input').val();
  var cardHTML = $('\
    <div class="card">\
      <span class="card-more">\
        <span class="glyphicon glyphicon-align-left"></span>\
      </span>\
      <div class="card-body">' + cardName + '</div>\
    </div>');
  $(this).closest('.list').find('.list-cards').append(cardHTML);
  $(this).closest('.list-footer').children('.add-card-form-wrapper').addClass('collapse');
  $this.siblings('input').val('');
});

var cardBeingEdited = null;

$('.board').on('click', '.card', function() {
  var $this = $(this);
  cardBeingEdited = $this;
  var cardtext = cardBeingEdited.find('.card-body').text()
  $('#card-edit').modal();
  $('#card-edit-body').val(cardtext)
});

$('.card-edit-save').click(function() {
  var cardEdit = $('#card-edit-body').val()
  // cardbeingEdited.find('.card-body').text(cardEdit)
  cardBeingEdited.find('.card-body').text(cardEdit);
  $('#card-edit').modal('hide');
});

$('.list-cards').sortable({
  connectWith: '.list-cards',
  });

$(document).keydown(function(e) {
  var c =  String.fromCharCode(e.keyCode);
  if (c === 'C') {
    console.log('test');
    $('.card:hover').remove();
  }
});

var counter = 0;

$('.header-logo').click(function() {
  console.log(counter)
  counter++;
  if (counter === 1) {
    $('body').css('background-color', 'pink')
  } else if (counter === 2) {
    $('body').css('background-color', 'blue')
  } else if (counter === 3) {
    $('body').css('background-color', 'green')
  } else {
    counter = 0
    $('body').css('background-color', 'rgb(0,121,191)')
  }
});
