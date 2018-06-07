"use strict";

var cardBeingEdited = null;
$('.board').on('click', '.add-list',function(){
  $(this).closest('.add-list-container').children('.add-list-form-wrapper').removeClass('collapse');
});


$('.board').on('click', '.add-list-cancel', function(){
  $(this).closest('.add-list-container').children('.add-list-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.add-list-save', function() {
  var list = $(this).closest('.add-list-container').children('.add-list-form-wrapper').children('.add-card-form').children('input').val();
  var place = '<div class="list-container"> <div class="list"><div class="list-header"><span class="list-title">' + list + '</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card">Add a card...</button><div class="collapse add-card-form-wrapper"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default add-card-save">Save</button><button type="button" class="btn  btn-default add-card-cancel"><span class="glyphicon glyphicon-remove"></span></button></div></div></div></div></div>';
  $('.add-list-form-wrapper').before(place);
  $(this).closest('.add-list-container').children('.add-list-form-wrapper').addClass('collapse');

});

$('.board').on('click', '.add-card', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function(){
  console.log(this);
  $(this).closest('.add-card-form').closest('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.add-card-save', function(){
  var card = $(this).siblings('input').val();
  var place = $(this).parents().children('.list-cards');
  place.append('<div class="card"><span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span><div class="card-body">'+ card + '</div></div>');
});


$('.list-cards').on('click', '.card', function(){
  cardBeingEdited=$(this);
  var cardEditSpot = cardBeingEdited.parents().children('body').children('#card-edit');
  cardEditSpot.modal();
  var current = cardBeingEdited.children('.card-body').text();
  cardBeingEdited.closest('.board').siblings('.modal').children('.modal-dialog').children('.modal-content').children('.modal-body').children('#card-edit-body').val(current);
});

$('.modal').on('click', '.card-edit-save', function(){
  console.log('test');
  var newText= cardBeingEdited.closest('.board').siblings('.modal').children('.modal-dialog').children('.modal-content').children('.modal-body').children('#card-edit-body').val();
  cardBeingEdited.children('.card-body').text(newText);
  $(this).siblings('.card-edit-cancel').click();
});

$( '.list-cards').sortable({
  connectWith: ".list-cards"
}).disableSelection();
