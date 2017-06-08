"use strict";

var cardBeingEdited = null;

//when click "add a list" remvoves form wrapper and exposes new list
$('.add-list').on('click', function(){
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function(){
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function(){
  var listTitle = $('.add-list-form-wrapper').find('input').val();
  var listElement = `<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">`+ listTitle +`</span>
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

  //get to list container
    var $this = $(this);
    var listContainer = $this.closest('.list-container')
  $(listContainer).before(listElement);
})
//removes  form wrapper for the new card
$('.board').on('click', '.add-card', function(){
  var $this = $(this);
  var next = $this.siblings('.add-card-form-wrapper');
  next.removeClass('collapse');
})

//add card cancel
$('.board').on('click', '.add-card-cancel', function(){
  var $this = $(this);
  var next = $this.parent().parent();
  next.addClass('collapse');
})

//save card to board
$('.board').on('click', '.add-card-save', function(){
  var $this = $(this);
  var next = $this.parent().parent();
  var inputTitle = next.find('input').val();
  var card = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">`+ inputTitle +`</div>
</div>`

  var tripleParent = $this.parent().parent().parent();
  var listCards = tripleParent.siblings('.list-cards');

  listCards.append(card);

  var formWrapper = $this.parent().parent();
  formWrapper.addClass('collapse');
})

//EDIT CARD
$('.board').on('click', '.card', function(){
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  //find value within card-edit body
  var cardBody = $(this).find('.card-body').text();
  $('#card-edit-body').val(cardBody);

})

//save button edits card content
$('.card-edit-save').on('click', function(){
  var cardContent = $('#card-edit-body').val()
  cardBeingEdited.find('.card-body').text(cardContent);

  $('#card-edit').modal('toggle');
  // var cardBody = $(this).find('.card-body').text();
  // $('#card-edit-body').val(cardBody);

})
//Reorder cards using drag and drop
$('.list-cards').sortable({
  connectWith: ".list-cards"
});
