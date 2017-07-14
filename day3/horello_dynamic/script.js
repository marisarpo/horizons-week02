"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function () {
  $('.add-list-form-wrapper').removeClass('collapse')
})

$('.add-list-cancel').on('click', function () {
  $('.add-list-form-wrapper').addClass('collapse')
})

$('.add-list-save').on('click', function () {
  var userTitle = $(this).parent().children().eq(0).val();
  $('.add-list-form-wrapper').parent().parent().before(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${userTitle}</span>
    </div>

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
})

$('.board').on('click', '.add-card', function() {
  $('.add-card-form-wrapper').removeClass('collapse')
})
$('.board').on('click', '.add-card-cancel', function() {
  $('.add-card-form-wrapper').addClass('collapse')
})
$('.board').on('click', '.add-card-save', function() {
  var cardBody = $(this).parent().children().eq(0).val();
  $('.add-card-form-wrapper').parent().before(`<div class="list-cards">
      <div class="card">
        <span class="card-more">
          <span class="glyphicon glyphicon-align-left"></span>
        </span>
        <div class="card-body">${cardBody}</div>
      </div>
    </div>`)
})

var cardBeingEdited = null;
$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this).val();
  $('#card-edit').modal();
  var textToAdd = $(this).find('.card-body').text()
  $('#card-edit-body').val(textToAdd);
})

$('.board').on('click', '.card-edit-save', function() {

})
