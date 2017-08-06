"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function(){

  $('.add-list-form-wrapper').removeClass('collapse');

})

$('.add-list-cancel').on('click', function(){
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function(){
  var input = $('.add-list-form-wrapper input').val();

  var newList = `<div class="list-container">
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
  </div>
  `
  var parentContainer = $(this).closest('.list-container');
  parentContainer.before(newList);
})

$('.board').on('click', '.add-card', function(){
  var addCardFormWrapper = $(this).siblings('.add-card-form-wrapper');
  addCardFormWrapper.removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function(){
  var addCardFormWrapper = $(this).closest('.add-card-form-wrapper');
  addCardFormWrapper.addClass('collapse');
})

$('.board').on('click', '.add-card-save', function(){
  var input = $(this).siblings('input').val();
  console.log(input);

  var newCard = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${input}</div>
</div>`

var addCardFormWrapper = $(this).closest('.add-card-form-wrapper');
addCardFormWrapper.addClass('collapse');
$(this).closest('.list-footer').siblings('.list-cards').append(newCard);
})

var cardBeingEdited = null;

$('.board').on('click', '.card', function(){
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  $('#card-edit-body').val($(this).children('.card-body').text());
})

$('.modal').on('click', '.card-edit-save', function(){
  var input = $('#card-edit-body').val();
  cardBeingEdited.children('.card-body').text(input);
  $(this).attr('data-dismiss', 'modal');
})

$('.card').on('mouseover', function() {
  console.log('hovering');
})

$('.card').bind('keypress', function(e) {
  console.log(e);
    if(e.keyCode==13){
        // Enter pressed... do anything here...
        console.log('hello');
    }
    console.log('any key');
});
