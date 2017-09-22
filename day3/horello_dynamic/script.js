"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;
var cardBeingHovered = null;

$( '.add-list' ).on('click', function() {
  $( '.add-list-form-wrapper' ).removeClass('collapse');
})

$( '.add-list-cancel' ).on('click', function() {
  $( '.add-list-form-wrapper' ).addClass('collapse');
})

$( '.add-list-save' ).on('click', function() {
  var val = $(this).siblings( '.form-control' ).val();

  $( '.add-list-form-wrapper' ).closest('.list-container').before(function() {
    var str = `<div class="list-container">
      <div class="list">
        <div class="list-header">
          <span class="list-title">` + val + `</span>
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
    </div>`
    return str;
  })
  $(this).siblings( '.form-control' ).val('');
  $('.list-cards').sortable( {connectWith: ".list-cards"} )
})

$( '.board' ).on('click', '.add-card', function() {
  $(this).siblings( '.add-card-form-wrapper' ).removeClass( 'collapse' )
})

$( '.board' ).on('click', '.add-card-cancel', function() {
  $(this).parents( '.add-card-form-wrapper' ).addClass( 'collapse' )
})

$( '.board' ).on('click', '.add-card-save', function() {
  var val = $(this).siblings('input').val();
  $(this).closest('.list').find('.list-cards').append(
    `<div class="card">
    <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
    </span>
    <div class="card-body">` + val + `</div>
    </div>`
  )

  $(this).siblings('input').val('');
  $('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var cardBody = cardBeingEdited.find('.card-body').text();
  $('#card-edit-body').val(cardBody);

})

$('.modal').on('click', '.card-edit-save', function() {
  var newBod = $('#card-edit-body').val();
  cardBeingEdited.find('.card-body').text(newBod);
  $('#card-edit').modal('toggle');
})

$('.list-cards').sortable( {connectWith: ".list-cards"} )


$('.board').on('mouseover', '.card', function() {
  cardBeingHovered = $(this);
})
$('.board').on('mouseout', '.card', function() {
  cardBeingHovered = null;
})

$(window).keydown(function(event) {
  var input = String.fromCharCode(event.which);

  if (input === 'C' && cardBeingHovered !== null) {
    console.log(input, cardBeingHovered)
    cardBeingHovered.remove();
  }
})
