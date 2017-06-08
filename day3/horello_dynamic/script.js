"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
// $(document).ready(callback)
var cardBeingEdited = null;

$('.add-list-container').on('click', 'button', function() {
  $(this).siblings('.collapse').removeClass('collapse');
})

// $('.add-list').on('click', function() {
//
//   $(this).closest('.add-list-container').children('.collapse').removeClass('collapse');
//
// })

$('.add-list-cancel').on('click', function() {

  $(this).parent().parent().addClass('collapse');

})

$('.add-list-save').on('click', function() {
  var wrapLevel = $(this).parent().children('input');

  var input = wrapLevel.val();

  var before = $(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${input}</span>
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
</div>`);

  // var formWrapper = $(this).parent().parent().parent().parent();
  //
  // var formWrapper = $(this).parent().parent().parent().parent();

  var formWrapper = $('.list-container').eq(-1);

  // console.log(formWrapper);

  formWrapper.before(before);

  $(this).parent().parent().addClass('collapse');

  // console.log(input);
})

$('.board').on('click', '.add-card', function() {
  var wrapperPosition = $(this).siblings('.add-card-form-wrapper');

  wrapperPosition.removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
  var wrapperPosition = $(this).parent().parent();

  wrapperPosition.addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
  var input = $(this).siblings('.form-control').val();

  var appendEle = $(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${input}</div>
</div>`);

  var listPosition = $(this).parent().parent().parent().siblings('.list-cards');

  listPosition.append(appendEle);

  var addCardPos = $(this).parent().parent().addClass('collapse');
  // listPosition.addClass('collapse');
})

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  // console.log(cardBeingEdited);
  var modal = $('#card-edit').modal();
  var cardBody = $(this).children('.card-body');
  var cardEditBody = $('#card-edit-body');
  // cardEditBody.val() = cardBody.val();
  // console.log(cardEditBody.val());
  // console.log(cardBody.text());
  // console.log(cardBody.text());
  cardEditBody.val(cardBody.text());
  // console.log(cardEditBody.val());

  // console.log(modal);
})
$('.card-edit-save').on('click', function() {
  var cardEditBody = $('#card-edit-body').val();

  cardBeingEdited.children('.card-body').text(cardEditBody);
  // console.log(cardEditBody);
  // console.log(cardBeingEdited);
  // console.log(cardBeingEdited.children('.card-body').text());

  $('#card-edit').modal('hide');
  // console.log($('#card-edit'));
})

$('.list-cards').sortable({
  connectWith: ".list-cards" /// question
}).disableSelection();
