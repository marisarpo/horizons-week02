"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$('.add-list').on('click', function(){
  $('.add-list-form-wrapper').removeClass('collapse');
});

$('.add-list-cancel').on('click', function(){
  $('.add-list-form-wrapper').addClass('collapse');
});

$('.add-list-save').on('click', function(){
  var userInput = $('#add-card-input').val();
  var newList = '<div class="list-container"><div class="list"><div class="list-header"><span class="list-title">' + userInput
  + '</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card">Add a card...</button><div class="collapse add-card-form-wrapper"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default add-card-save">Save</button><button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove"></span></button></div> </div></div></div></div>';
  $('.add-list-form-wrapper').addClass('collapse');
  var listContainer = $('.add-list-form-wrapper').closest($('.list-container'));
  listContainer.before(newList);
});

var generalize = function(d) {
    var listFooter = d.closest($('.list-footer'));
    var cardFormWrapper = listFooter.children('.add-card-form-wrapper');
    return cardFormWrapper;
}

$('.board').on('click', '.add-card', function(){
  var $this = $(this);
  var cardFormWrapper = generalize($this);
  cardFormWrapper.removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function(){
  var $this = $(this);
  var element = generalize($this);
  element.addClass('collapse');
});

$('.board').on('click', '.add-card-save', function(){
  var $this = $(this);
  var element = generalize($this);
  var cardInput = element.find('input').val();
  element.addClass('collapse');
  var newCard = '<div class="card"><span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span><div class="card-body">' + cardInput + '</div></div>';
  var listFooter = element.closest('.list-footer');
  listFooter.before(newCard);
});

var cardBeingEdited = null;

$('.board').on('click', '.card', function(){
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var currentName = cardBeingEdited.find('.card-body').text();
  $('textarea').attr('placeholder', currentName);
});

$('.board').sortable({
  // Configuration parameters here
  connectWith: ".list-cards",
  items: ".card",
  revert: false
});
