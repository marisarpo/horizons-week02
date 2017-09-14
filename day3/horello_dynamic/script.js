"use strict";
var cardBeingEdited = null;
// YOUR JAVASCRIPT CODE GOES HERE
$('.header-logo-default').on('click', function(){

  var random =function(){
    var red =Math.floor(Math.random()*255);
    var green=Math.floor(Math.random()*255);
    var blue=Math.floor(Math.random()*255);
    var back = [red, green, blue];
    return back;
  }

  $('.list-container').css('background-color', random);
  $('.card').css('background-color', random);
  $('.list').css('background-color', random);
  $('.board').css('background','url(https://unsplash.it/200/300?image=110) repeat');
});
$('body').keydown(function(event){
  if(parseInt(event.which) === 67){
    $('.card:hover').remove();
  }
});
$('.board').on('click', '.card', function(){
  cardBeingEdited = this;
  $('#card-edit').modal();
  var textSaved = $(this).find('.card-body').text();

  //$('#card-edit-body').attr('value', '');
});
$('.modal-footer').on('click', '.card-edit-save', function(){
  $(cardBeingEdited).children('.card-body').text($('#card-edit-body').val());
  $('#card-edit').modal('hide');
  //$('#card-edit-body').attr('value', '');
  cardBeingEdited = null;
});

$('.board').on('click','.add-list', function(){
   $(this).siblings('.add-list-form-wrapper').removeClass('collapse');
  //$('.add-list-form-wrapper').removeClass('collapse');
});

$('.board').on('click','.add-list-cancel', function(){
  $(this).closest('.add-list-form-wrapper').addClass('collapse');
});

$('.board').on('click','.add-list-save',function(){
  var listTitle = $(this).closest('.add-list-form-wrapper').find('input').val();
  var listElement =$(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${listTitle}</span>
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
$(this).closest('.list-container').before(listElement);
$(this).closest('list-container').find('.add-list-form-wrapper').find('input').val('');
//or
//$('.add-list-form-wrapper').find('input').attr('value', '');
$('.list-cards').sortable({
  connectWith: '.list-cards'
});
});


$('.board').on('click','.add-card', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click','.add-card-save', function(){
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
  var newCardName = $(this).siblings('input').val();
  var saveCard = $(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${newCardName}</div>
</div>`);
$(this).closest('.list-footer').siblings('.list-cards').append(saveCard);
$('.add-card-form-wrapper').find('input').val('');
});

$('.board').on('click','.add-card-cancel', function(){
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

$('.list-cards').sortable({
  connectWith: '.list-cards'
});
