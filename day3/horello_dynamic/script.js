"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;
var toDelete = null;

$('.board').on('click', '.add-list', function() {
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-list-cancel', function() {
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-list-save', function() {
  var title = $('.add-list-form-wrapper').children('.add-card-form').children('input').val();
  var string = `<div class="list-container">
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
</div>`;

  $(this).closest('.list-container').before($(string));
  $('.list-cards').sortable({
    revert: true,
    items: '.card',
    connectWith: '.list-cards'
  });
})

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
  $(this).parent().addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
  var title = $(this).siblings('input').val();
  var string = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${title}</div>
</div>`;
  $(this).closest('.list-footer').siblings('.list-cards').append($(string));
  $('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var textToReplace = $(this).find('.card-body').text();
  $('#card-edit-body').val(textToReplace);
})

$('.modal-dialog').on('click', '.card-edit-save', function() {
  var newText = $(this).parent().siblings('.modal-body').children('textarea').val();
  cardBeingEdited.children('.card-body').text(newText);
  $('#card-edit').modal('toggle');
})

$('.list-cards').sortable({
  revert: true,
  items: '.card',
  connectWith: '.list-cards'
});

$('.board').on('mouseover', '.card', function() {
  toDelete = $(this);
})

$(document).on('keypress', function(e) {
  //alert(String.fromCharCode(e.which));
  if(String.fromCharCode(e.which) === "c" && toDelete){
     toDelete.remove();
  } 
});
