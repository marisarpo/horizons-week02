"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function(event) {
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function(event) {
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function(event) {
  var title = $(this).closest('.add-card-form').children('input').val();
  var list = '<div class="list-container">\
  <div class="list">\
    <div class="list-header">\
      <span class="list-title">' + title + '</span>\
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
  var listElement = $(list);
  $(this).closest('.list-container').before(listElement);

  $('.list-cards').sortable({
    revert: false,
    items: '.card',
    connectWith: '.list-cards'
  });
})

$('.board').on('click', '.add-card', function(event) {
  var elem = $(this).siblings('.add-card-form-wrapper');
  elem.removeClass('collapse');
})
$('.board').on('click', '.add-card-cancel', function(event) {
  var elem = $(this).closest('.add-card-form-wrapper');
  elem.addClass('collapse');
})

$('.board').on('click', '.add-card-save', function(event) {
  var title = $(this).siblings('input').val();

  // reset value of the card title to empty:
  $(this).siblings('input').val('');


  var card = '<div class="card">\
  <span class="card-more">\
    <span class="glyphicon glyphicon-align-left"></span>\
  </span>\
  <div class="card-body">'+title+'</div>\
</div>';
  var cardElement = $(card);
  $(this).closest('.list').children('.list-cards').append(cardElement);

  var elem = $(this).closest('.add-card-form-wrapper');
  elem.addClass('collapse');
})

var cardBeingEdited = null;

$('.board').on('click', '.card', function(event) {
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var content = $(this).find('.card-body').text();
  $('#card-edit-body').val(content);

})

$('.modal-footer').on('click', '.card-edit-save', function(event) {
  var changedText = $('#card-edit-body').val();
  $(cardBeingEdited).find('.card-body').text(changedText);
  $('#card-edit').modal('hide');
})


$('.list-cards').sortable({
  items: '.card',
  // connectith groups all related lists with a CSS class
  connectWith: '.list-cards'
});

$(document).on('keydown', function(){
  if(event.which === 67) {
    $('.card:hover').remove();
  }
})
