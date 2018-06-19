"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
function getList(title){
  return `<div class="list-container">
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
}

function getCard(title) {
  return `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${title}</div>
</div>`;
}


//open addList
$('.add-list').on('click', function(event){
  $('.add-list-form-wrapper').removeClass('collapse');
});

//close addList
$('.add-list-cancel').on('click', function(event){
  $('.add-list-form-wrapper').addClass('collapse');
});

//save addList
$('.add-list-save').on('click', function(event){
  var title = $('.add-list-form-wrapper input').val();
  $('.add-list-form-wrapper input').val('');
  console.log(title);
  var newElem = getList(title);

  $(this).closest('.list-container').before(newElem);
  $('.add-list-form-wrapper').addClass('collapse');
  $('.list-cards').sortable({
      connectWith: '.list-cards'})
    });

//open addCard
$('.board').on('click', '.add-card',function(event) {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

//close addCard
$('.board').on('click','.add-card-cancel', function(event) {
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

//save addCard
$('.board').on('click','.add-card-save',function(event) {
  var title = $(this).siblings('input').val();
  $(this).siblings('input').val('')
  console.log($(this));
  console.log(title);
  var newElem = getCard(title);

  $(this).closest('.list-footer').siblings('.list-cards').append(newElem);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

//edit card
var cardBeingEdited = null;

$('.board').on('click', '.card', function(event) {
  cardBeingEdited = $(this);
  $('#card-edit').modal();

  var cardText = $(this).find('.card-body').text();
  console.log(cardText);
  $('#card-edit-body').val(cardText);
});

$('.card-edit-save').on('click', function(event){
  console.log('clicked save');
  var modalText = $('#card-edit-body').val();
  console.log(modalText);

  $(cardBeingEdited).find('.card-body').text(modalText);
  $('.modal').modal('toggle');
});

//drag and drop
$('.list-cards').sortable({
    connectWith: '.list-cards',
  });
