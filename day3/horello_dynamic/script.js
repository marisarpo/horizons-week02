"use strict";

var idsOfLists= ["sortable1","sortable2","sortable3"];
// makeSortable();

var cardBeingEdited = null;
// YOUR JAVASCRIPT CODE GOES HERE
$('button.add-list').on('click', function(event) {
  event.preventDefault();
  $('div.add-list-form-wrapper').removeClass('collapse');
});

$('button.add-list-cancel').on('click', function(event) {
  event.preventDefault();
  $('div.add-list-form-wrapper').addClass('collapse');
});

$('button.add-list-save').on('click', function(event) {
  event.preventDefault();
  var title=$(this).closest('div.add-card-form').children('input').val();
  var myHTML=
  `<div class="list-container">
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
 $('div.add-list-form-wrapper').addClass('collapse');
 $(this).closest('div.add-card-form').children('input').val('');
 $( function() {
   $( '.list-cards' ).sortable({
     connectWith: '.list-cards'
   }).disableSelection();
 } );
});


/// CARDS

$('.board').on('click', 'button.add-card', function(event) {
  event.preventDefault();
  $(this).siblings('div.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click', 'button.add-card-cancel', function(event) {
  event.preventDefault();
  $(this).closest('div.add-card-form-wrapper').addClass('collapse');
});


$('.board').on('click', 'button.add-card-save', function(event) {
  event.preventDefault();
  var cardTitle=$(this).closest('div.add-card-form').children('input').val();
  var myHTML=

`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${cardTitle}</div>
</div>`;

$(this).closest('.list-footer').siblings('div.list-cards').append(myHTML);
$(this).closest('div.add-card-form-wrapper').addClass('collapse');
$(this).closest('div.add-card-form').children('input').val('');
});

/// EDIT CARD
$('.board').on('click', '.card', function(event) {
  console.log('this',this );
  console.log('$(this)',$(this) );
  cardBeingEdited=$(this);
  $('#card-edit').modal();
  var oldVal=cardBeingEdited.children('.card-body').text();
  $('textarea#card-edit-body').val(oldVal);
});


$('button.card-edit-save').on('click', function(event) {
  event.preventDefault();
  var newVal=$('textarea#card-edit-body').val();
  // console.log(newVal);
  cardBeingEdited.children('.card-body').text(newVal);
  $('#card-edit').modal('toggle');
});

// REORDER

$( function() {
  $( '.list-cards' ).sortable({
    revert: false,
    connectWith: '.list-cards',
  }).disableSelection();
} );

//
// function makeSortable() {
//   var convertToStringAsCSSSelectorAllSortIds=idsOfLists.map((x)=> { return "#"+x }).join(', ');
//   console.log(convertToStringAsCSSSelectorAllSortIds);
//   $( function() {
//     $( "#sortable1, #sortable2, #sortable3" ).sortable({
//       connectWith: ".connectHoward"
//     }).disableSelection();
//   } );
// }
//
// makeSortable();
