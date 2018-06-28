"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click',function(){
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click',function(){
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click',function(){

  var listTitle = $('.add-list-form-wrapper input').val();
  var listElement = $(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${listTitle}</span>
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
</div>`)
  $(this).closest('.list-container').before(listElement);
  listElement.find('.list-cards').sortable({ connectWith: '.list-cards'});
  $('.add-list-form-wrapper input').val('');
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function(){
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
  var newCard = $(this).siblings('input').val();
  var cardElement = $(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${newCard}</div>
</div>`);
  $(this).closest('.list').find('.list-cards').append(cardElement);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

var cardBeingEdited = null;
$('.board').on('click','.card',function(){
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var curCard = $(this).find('.card-body').text();
  $('#card-edit-body').val(curCard);
})

$('.card-edit-save').on('click',function(){
  //var newText = $(this).closest('.modal-content').find('#card-edit-body').val();
  var newText = $('#card-edit-body').val();
  cardBeingEdited.find('.card-body').text(newText);
  $('#card-edit').modal('toggle');
  $('#card-edit-body').val('');
  cardBeingEdited = null;
})

$('.card-edit-cancel').on('click',function(){
  $('#card-edit').modal('toggle');
  $('#card-edit-body').val('');
  cardBeingEdited = null;
})

$('.list-cards').sortable({ connectWith: '.list-cards'});
