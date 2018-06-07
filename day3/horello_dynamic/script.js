"use strict";

var cardBeingEdited = null;

$('.add-list').on('click', function(event) {
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function(event) {
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function(event) {
  var title = $('.add-list-form-wrapper').find('input').val();
  $('.add-list-form-wrapper').before(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">` + title + `</span>
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
</div>`);
})

$('.board').on('click', '.add-card', function(event) {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function(event) {
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card-save', function(event) {
  var title = $(this).closest('.add-card-form-wrapper').find('input').val();
  $(this).closest('.list').children('.list-cards').append(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">` + title + `</div>
  </div>`);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.card', function(event) {
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var text = $(this).find('.card-body').text();
  $('#card-edit-body').val(text);
})

$('.card-edit-save').on('click', function(event) {
  cardBeingEdited.children('.card-body').text($('#card-edit-body').val());
  $('#card-edit').modal('hide');
})

$('.list-cards').sortable({
  connectWith: '.list-cards'
  });
