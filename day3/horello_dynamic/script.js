"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').removeClass('collapse')
})





$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').addClass('collapse')
})





$('.add-list-save').on('click', function() {
  var jay = $(this).siblings('input').val()
  $(this).siblings('input').val('')
  var listHTML = `
  <div class="list-container">
  <div class="list">
  <div class="list-header">
  <span class="list-title">${jay}</span>
  </div>
  <div class="list-cards"></div>
  <div class="list-footer">
  <button class="add-card">Add a card...</button>
  <div class="collapse add-card-form-wrapper">
  <div class="well add-card-form">
  <input type="text" class="form-control" placeholder="Card title">
  <button type="button" class="btn btn-default add-card-save">Save
  </button>
  <button type="button" class="btn btn-default add-card-cancel"><span
  class="glyphicon glyphicon-remove"></span>
  </button>
  </div>
  </div>
  </div>
  </div>
  </div>`;
  $(this).closest('.list-container').before($(listHTML))
  $('.add-list-form-wrapper').addClass('collapse');

})

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass("collapse")
})

$('.board').on('click', '.add-card-save', function() {
  var cardname= $(this).siblings('.form-control').val()
  console.log(cardname);
  $(this).siblings('.add-card-form-wrapper').val('')
  var card1 = `
  <div class="card">
  <span class="card-more">
  <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${cardname}</div>
  </div>`
  $(this).closest('.list').find('.list-cards').append($(card1))
  $(this).closest('.add-card-form-wrapper').addClass("collapse")
})

$('.board').on('click', '.add-card-cancel', function() {
  $(this).siblings('input').val('');
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});


var cardBeingEdited = null;

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this)
  var body = cardBeingEdited.find('.card-body').text();
  $('#card-edit').modal();
  $('#card-edit-body').val(body);
})

$('.card-edit-save').click(function () {
  var jayy = $('#card-edit-body').val();
  cardBeingEdited.find('.card-body').text(jayy);
  $('#card-edit').modal('hide');
  $('#card-edit-body').val('');
  cardBeingEdited = null;
})

$('.card-edit-cancel').click(function() {
  $('#card-edit-body').val('');
  cardBeingEdited = null;
});

$('.list-cards').sortable({
  revert: false,
  items: '.card',
  connectWith: '.list-cards'
});
