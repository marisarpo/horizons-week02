"use strict";

// YOUR JAVASCRIPT CODE GOES HERE



// Part 1: add list
$(document).ready(function() {

var cardBeingEdited = null;

$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').removeClass('collapse');
});

$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').addClass('collapse');
});

$('.add-list-save').on('click', function() {
  var title = $('.add-list-form-wrapper input').val()
  $(this).closest($('.list-container')).before($(`<div class="list-container">
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
</div>`));
});

// Part 2 - add card
$('.board').on('click', '.add-card', function() {
  console.log('.add-card');
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function() {
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.add-card-save', function() {
  var title = $(this).closest('.add-card-form-wrapper').find('input').val();
  $(this).closest('.add-card-form-wrapper').find('input').val('');
  $(this).closest($('.list-container')).find('.list-cards').append($(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">` + title + `</div>
</div>`));
  $(this).closest($('.add-card-form-wrapper')).addClass('collapse');
});

$('.board').on('click', '.card', function () {
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  $('#card-edit-body').val($(this).find('.card-body').text());
});

$('.card-edit-save').on('click', function () {
  cardBeingEdited.find('.card-body').text($('#card-edit-body').val());
  $('#card-edit-body').val('');
  $('#card-edit').modal('hide');
});

});
