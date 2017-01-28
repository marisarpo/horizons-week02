"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

var cardBeingEdited = null;

$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function() {
  var input = $('.add-list-form-wrapper input').val();
  $('.add-list-form-wrapper input').val(null);

  var newList = $(
    '<div class="list-container">' +
  '<div class="list">' +
'    <div class="list-header">'+
'<span class="list-title">'+input+'</span>'    +
'</div>' +
    '<div class="list-cards"></div>' +
    '<div class="list-footer">'+
      '<button class="add-card">Add a card...</button>'+
      '<div class="collapse add-card-form-wrapper">'+
        '<div class="well add-card-form">'+
          '<input type="text" class="form-control" placeholder="Card title">'+
          '<button type="button" class="btn btn-default add-card-save">'+
            'Save'+
          '</button>'+
        '  <button type="button" class="btn btn-default add-card-cancel">'+
            '<span class="glyphicon glyphicon-remove"></span>'+
          '</button></div></div></div></div></div>'
  )
  $('.add-list-form-wrapper').closest('.list-container').before(newList);
})

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
  $(this).parents('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {

  var workingList = $(this).closest('.list');
  var listCards = workingList.children('.list-cards');

    var input = $(this).siblings('input').val();
    $(this).siblings('input').val(null);
    var newCard = $(
      '<div class="card">' +
      '<span class="card-more">' +
      '<span class="glyphicon glyphicon-align-left"></span>' +
      '</span>' +
      '<div class="card-body">'+input+'</div>'+
      '</div>');
$('.add-card-cancel').on('click', function() {
  $(this).parents('.add-card-form-wrapper').addClass('collapse');
})


// Make sure the text box in the dialog contains the text of
// the current card being edited. Update the value of #card-edit-body
// using .val(), set it to the text of the card that was clicked on. You can
// get the extract the text contents of the card by finding the .card-body div
// inside the current .card. You will need $(this).find() and .text().


listCards.append(newCard);
})

$('.board').on('click', '.card', function() {

  cardBeingEdited = $(this);
  $('#card-edit').modal();
  $('#card-edit-body').val(cardBeingEdited.find('.card-body').text());

  $('.card-edit-save').on('click', function() {
    var item = $(cardBeingEdited).children('.card-body');
    var val = $('#card-edit-body').val();
    item.text(val);
    $('#card-edit').modal('toggle');
  })

})

$('.list-cards').sortable({
  revert: false,
  items: '.card',
  connectWith: '.list-cards'


  });
