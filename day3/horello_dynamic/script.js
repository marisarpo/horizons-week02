"use strict";



var cardBeingEdited = null;
var x = null;


$('.board').on('click', '.add-list', function(){
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-list-cancel', function(){
  $('.add-list-form-wrapper').addClass('collapse');
})



$('.board').on('click', '.add-list-save', function(){

  var newContainer = `<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${$('.add-list-form-wrapper input').val()}</span>
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

  newContainer = $(newContainer);
  var x = $(this).closest('.list-container');
  x.before(newContainer);
})


$('.board').on('click', '.add-card', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function(){
  $(this).parent().parent('.add-card-form-wrapper').addClass('collapse');
})


$('.board').on('click', '.add-card-save', function(){
  var content = $(this).siblings('input').val()
  var newCard = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${content}</div>
</div>`

  newCard = $(newCard);

  var y = $(this).closest('.list-container');
  y.find('.list-cards').append(newCard);
})


$('.board').on('click', '.card', function(){
  cardBeingEdited = $(this);
  $('#card-edit').modal();
})

$('.card-edit-save').on('click', function(){
  var x = $('#card-edit-body').val();
  cardBeingEdited.find('.card-body').text(x);
  cardBeingEdited = null;
  $('#card-edit').modal('hide');
})


$( ".list-cards" ).sortable({
  connectWith: ".list-cards"
}).disableSelection();

$(document).on('keydown', function(event){
  if (event.keyCode === 67 ){
    $('.card:hover').remove();
  }
})


function changeColor() {
  var color_sets = ["#FF5733", "#FDFF33", "#4BFF33", "#33FFCC", "#334FFF", "#FF33F6"];
  var color_sets_list = ["#794B77", "#4D4B79", "#4B795F", "#75794B", "#79504B"];
  var color_sets_card = ["white", "blue", "red", "green", "brown"];
  $('body').css('background-color', color_sets[Math.floor(Math.random() * color_sets.length)]);
  $('.list').css('background', color_sets_list[Math.floor(Math.random() * color_sets_list.length)]);
  $('.card').css('background', color_sets_card[Math.floor(Math.random() * color_sets_card.length)])
}
$('.header-logo-default').on('click', function() {
  changeColor();
})
