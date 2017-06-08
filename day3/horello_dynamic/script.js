"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function() {
$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').removeClass('collapse')
})

$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').addClass('collapse')
})

$('.add-list-save').on('click', function() {
  var title = $('.add-list-form-wrapper .form-control').val();
  $('.add-list-form-wrapper').closest('.list-container').before(`
    <div class="list-container">
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
    </div>`)
})

$('.board').on('click', '.add-card', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse')
})

$('.board').on('click', '.add-card-cancel', function(){
  $(this).parent().parent('.add-card-form-wrapper').addClass('collapse')
})

$('.board').on('click', '.add-card-save', function(){
  //console.log($(this))
  var x = ($(this).siblings('.form-control').val())
  $(this).parent().parent().parent().siblings('.list-cards').append(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${x}</div>
</div>`)
  })

// parent().siblings('.list-cards').append
var cardBeingEdited = null;
$('.board').on('click', '.card', function() {
cardBeingEdited = $(this);
var initial = cardBeingEdited.find('.card-body').text(); //reading the text of the card
  $('#card-edit-body').val(initial); //
  $('#card-edit').modal();
})

$('.card-edit-save').on('click', function() {
  cardBeingEdited.find('.card-body').text($('#card-edit-body').val());
  $('#card-edit').modal('toggle');
  console.log('hi');
//
})

$('.list-cards').sortable({connectWith:'.list-cards'})

})
