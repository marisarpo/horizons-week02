"use strict";

var cardBeingEdited = null;

$('.add-list').on('click', function() {
    var $wrapper = $(this).closest('.add-list-container').children('.add-list-form-wrapper');
    $wrapper.removeClass('collapse');
});

$('.add-list-cancel').on('click', function() {
    var $wrapper = $(this).closest('.add-list-container').children('.add-list-form-wrapper');
    $wrapper.addClass('collapse');
});

$('.add-list-save').on('click', function() {
    var $wrapper = $(this).closest('.add-list-container').children('.add-list-form-wrapper');
    var $form = $wrapper.children('.add-card-form');
    var title = $form.children('input').val();
    var html = `
<div class="list-container">
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
    `;
    $(this).closest('.list-container').before($(html));
    $wrapper.addClass('collapse');
    $form.children('input').val('');

    // Make it sortable
    $('.list-cards').sortable({
        connectWith: ".list-cards"
    });
});

$('.board').on('click', '.add-card', function() {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function() {
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.add-card-save', function() {
    var $wrapper = $(this).closest('.add-card-form-wrapper');
    var $input = $wrapper.children('.add-card-form').children('input');
    var title = $input.val();
    $wrapper.closest('.list').children('.list-cards').append($(`
<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${title}</div>
</div>`
    ));
    $wrapper.addClass('collapse');
    $input.val('');
});

$('.board').on('click', '.card', function() {
    cardBeingEdited = $(this);
    $('#card-edit').modal();
    $('#card-edit-body').val(cardBeingEdited.children('.card-body').text());
});

$('.card-edit-save').on('click', function() {
    var content = $(this).closest('.modal-content').children('.modal-body').children('textarea').val();
    cardBeingEdited.children('.card-body').text(content);
    $('#card-edit').modal('toggle');
});

$('.list-cards').sortable({
    connectWith: ".list-cards"
});