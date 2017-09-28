"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$('.add-list').on('click', function(event) {
  var $this = $(this);
  var collapsedDiv = $this.siblings();
  collapsedDiv.removeClass('collapse');
})

$('.add-list-cancel').on('click', function(event) {
  var $this = $(this);
  var collapsedDiv = $this.parent().parent();
  collapsedDiv.addClass('collapse');
})

$('.board').on('click', '.add-list-save', function(event) {
  var $this = $(this);
  var title = $this.siblings('input').val();
  var newListContainer = $('<div class="list-container" >');
  var newList = $('<div class = "list">');
  var newListHeader = $('<div class = "list-header">');
  newListHeader.append($('<span class="list-title">').text(title));
  newListHeader.append($('<div class = "list-cards">'));
  newList.append(newListHeader);
  var newFooter = $('<div class = "list-footer">');
  newFooter.append($('<button class = "add-card">').text("Add a card..."));
  var newCollapseWrapper = $('<div class = "collapse add-card-form-wrapper">');
  var newAddForm = $('<div class = "well add-card-form">')
  newAddForm.append($('<input type="text" class = "form-control" placeholder="Card title">'))
  newAddForm.append($('<button type="button" class = "btn btn-default add-card-save">').text("Save"))
  var newCancelButton = $('<button type="button" class = "btn btn-default add-card-cancel">');
  newCancelButton.append($('<span class = "glyphicon glyphicon-remove">'));
  newAddForm.append(newCancelButton);
  newCollapseWrapper.append(newAddForm);
  newFooter.append(newCollapseWrapper);
  newList.append(newFooter);
  newListContainer.append(newList);
  $this.closest('.list-container').before(newListContainer);
  $('.add-list-form-wrapper').addClass('collapse');

  $('.list-cards').sortable({
    items: '.card',
    connectWith: '.list-cards',
    revert: false
  })

})

$('.board').on('click', '.add-card', function(event) {
  $(this).siblings('.add-card-form-wrapper').removeClass("collapse");
})

$('.board').on('click', '.add-card-cancel', function(event) {
  $(this).parent().parent().addClass("collapse");
})

$('.board').on('click', '.add-card-save', function(event) {
  var $this = $(this);
  var title = $this.siblings('input').val();
  var elem = $(`<div class="card">
                <span class="card-more">
                  <span class="glyphicon glyphicon-align-left"></span>
                </span>
                <div class="card-body">${title}</div>
              </div>`);
  $this.closest('.list-footer').before(elem);
  $(this).closest('.list').find('.list-cards').append(elem);
  $this.parent().parent().addClass("collapse");

  $('.list-cards').sortable({
    items: '.card',
    connectWith: '.list-cards',
    revert: false
  })
})


var cardBeingEdited = null;

$('.board').on('click', '.card', function(event) {
  var $this = $(this);
  cardBeingEdited = $(this);
  var oldText = cardBeingEdited.find('.card-body').text();
  $('#card-edit').modal();
  $('#card-edit-body').val(oldText);
})

$('.card-edit-save').on('click', function(event) {
  var newText = $('#card-edit-body').val();
  cardBeingEdited.find('.card-body').text(newText);
  $('#card-edit').modal('hide');
  $('#card-edit-body').val('');
  cardBeingEdited = null;
});

$('.list-cards').sortable({
  items: '.card',
  connectWith: '.list-cards',
  revert: false
})


$('body').on('keypress', function(event) {
  var card = $('.card:hover');
  var char = String.fromCharCode(event.which);
  if (char === 'c') card.remove();
})

$('.header-logo').on('click', function(event) {
  var color = '#'+Math.floor(Math.random()*16777215).toString(16);
  $('body').css('background-color', color);
})
