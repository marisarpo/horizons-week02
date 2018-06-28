"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;

var listIds = ['#sortable1','#sortable2','#sortable3'];

$('.add-list').on('click', function (event) {
  event.preventDefault();
  $('.add-list-form-wrapper').removeClass('collapse')
})


$('.add-list-cancel').on('click', function (event) {
  event.preventDefault();
  $('.add-list-form-wrapper').addClass('collapse')
})


$('.add-list-save').on('click', function (event) {
  event.preventDefault();
  var title = $(this).closest('.add-card-form').children('input').val();
  var myHTML = `<div class="list-container">
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
  $(this).closest('.list-container').before(myHTML);
  $(this).closest('.add-card-form').children('input').val('');
  $('.add-list-form-wrapper').addClass('collapse');
  $('.list-cards').sortable({
    revert: false,
    items: '.card',
    connectWith: '.list-cards'
  });

})


$('.board').on('click', '.add-card', function(event) {
  event.preventDefault();
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function(event) {
  event.preventDefault();
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card-save', function (event) {
  event.preventDefault();
  var title = $(this).siblings('input').val();
  var myHTML = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${title}</div>
</div>`;
  $(this).closest('.list-footer').siblings('.list-cards').append(myHTML);
  $(this).siblings('input').val('');
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.card', function (event) {
  event.preventDefault();
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var oldVal = cardBeingEdited.children('.card-body').text();
  $('textarea#card-edit-body').val(oldVal);
})

$('.card-edit-save').on('click', function (event) {
  event.preventDefault();
  var newVal = $('textarea#card-edit-body').val();
  cardBeingEdited.children('.card-body').text(newVal);
  $('#card-edit').modal('toggle');
})

$('.list-cards').sortable({
  revert: true,
  items: '.card',
  connectWith: '.list-cards'
});

//
// $( function() {
//     $( "#sortable1, #sortable2, #sortable3" ).sortable({
//       connectWith: ".connectedSortable"
//     }).disableSelection();
//   } );

// function() {
//   var mapped = listIds.map( (x) => {return '#'+x} );
//   var string = mapped.join(', ');
//   $( function() {
//       $( string ).sortable({
//         connectWith: ".connectedSortable"
//       }).disableSelection();
//     });
// }
