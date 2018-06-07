"use strict";

$('.add-list').on('click', function(event){
  $('.add-list-form-wrapper').removeClass('collapse');
});

$('.add-list-cancel').on('click', function(event){
  $('.add-list-form-wrapper').addClass('collapse');
});

$('.add-list-save').on('click', function(event){
  var $this = $(this);
  var title = $('.add-list-form-wrapper input').val();
  $this.closest('.list-container').before('<div class="list-container"><div class="list"><div class="list-header"><span class="list-title">' + title +
  '</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card">Add a card...</button>' +
  '<div class="collapse add-card-form-wrapper"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title">' +
  '<button type="button" class="btn btn-default add-card-save">Save</button><button type="button" class="btn btn-default add-card-cancel">' +
  '<span class="glyphicon glyphicon-remove"></span></button></div></div></div></div></div>')
  $('.add-list-form-wrapper').addClass('collapse');
  $('.list-cards').sortable({
    connectWith: '.list-cards'
  });
});

$('.board').on('click', '.add-card', function(event){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function(event){
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.add-card-save', function(event){
  var $this = $(this);
  var title = $(this).siblings('.add-card-form-wrapper input').val();
  $this.parent().parent().parent().siblings('.list-cards').append('<div class="card"><span class="card-more"><span class="glyphicon glyphicon-align-left"></span>' +
  '</span><div class="card-body">' + title + '</div></div>')
});

var cardBeingEdited = null;

$('.board').on('click', '.card', function(event){
  var $this = cardBeingEdited = $(this);
  $('#card-edit').modal();
  $('#card-edit-body').val($this.find('.card-body').text());
});

$('.card-edit-save').on('click', function(event){
  cardBeingEdited.find('.card-body').text($('#card-edit-body').val());
  $('#card-edit').modal('hide');
});

$('.list-cards').sortable({
  connectWith: '.list-cards'
});

var cardToRemove;

$('.board').on('mouseover', '.card', function(event) {
  cardToRemove = $(this);
});

$('body').keydown(function(event){
  if(event.key === 'c'){
    cardToRemove.remove();
  }
})
