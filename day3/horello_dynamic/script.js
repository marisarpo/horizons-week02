"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function(){

$('.add-list').on('click', function(){
  $('.add-list-form-wrapper').removeClass('collapse')
})

$('.add-list-cancel').on('click', function(){
  $('.add-list-form-wrapper').addClass('collapse')
})

$('.add-list-save').on('click', function(){
  var ta = $('.add-list-form-wrapper input').val();

  var template = $(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">`+ ta +`</span>
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
</div>`)

  $('.add-list-form-wrapper').closest('.list-container').before(template)
})


$('.add-card').on('click', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse')
})
$('.add-card-cancel').on('click', function(){
  $(this).closest('.add-card-form-wrapper').addClass('collapse')
})
//Part 2 number 3

$('.add-card-save').on('click', function(){
  var ta = $('.add-card-form-wrapper input').val();

  var template = $(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">`+ ta +`</div>
</div>`)

  $(this).closest('.list-footer').before(template)
  $(this).closest('.add-card-form-wrapper').addClass('collapse')

})
var cardBeingEdited = null;

$('.board').on('click','.card', function(){
  cardBeingEdited = $(this)
  $('#card-edit').modal()
  var ta = $('#card-edit-body').val(cardBeingEdited.find('.card-body').text());



})
$('.card-edit-save').on('click', function(){
  var ta = $('#card-edit-body').val()
  console.log(ta);
  $(cardBeingEdited.find('.card-body').text(ta))

})
$('.list-cards').sortable({
  connectWith: '.list-cards'
  });
})























//
