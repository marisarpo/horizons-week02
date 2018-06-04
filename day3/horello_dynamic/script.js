"use strict";
var cardBeingEdited = null;
// YOUR JAVASCRIPT CODE GOES HERE

  console.log('loaded');
  $('.add-list').click(function(event) {
    $(this).siblings('.add-list-form-wrapper').removeClass('collapse');
  })

  $('.add-list-cancel').click(function(event) {
    $(this).closest('.add-list-form-wrapper').addClass('collapse');
  })

  $('.add-list-save').click(function(event) {
    var newList = $(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${$(this).siblings('input').val()}</span>
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
    </div></div></div>`);
    $(this).closest('.list-container').before(newList);
    $(this).closest('.add-list-form-wrapper').addClass('collapse');
    newList.find(".list-cards").sortable({
      connectWith: '.list-cards'
    });

  })

  $('.board').on('click', '.add-card', function(event) {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  })

  $('.board').on('click', '.add-card-cancel', function(event) {
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  })

  $('.board').on('click', '.add-card-save', function(event) {
    var newCard = $(`<div class="card">
      <span class="card-more">
        <span class="glyphicon glyphicon-align-left"></span>
        </span>
        <div class="card-body">${$(this).siblings('input').val()}</div>
        </div>`);
    $(this).closest('.list').children('.list-cards').append(newCard);
    $(this).siblings('input').val('');
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
    /*
    newList.find(".card").sortable({
      connectWith: '.list-cards'
    }).disableSelection();
    */
  })

  $('.board').on('click','.card', function(event){
    cardBeingEdited = this;
    var modal = $(cardBeingEdited).parents().find('#card-edit');
    var cardBody = $(cardBeingEdited).find('.card-body');
    modal.find('#card-edit-body').val(cardBody.text());
    modal.modal();

  })

  $('.card-edit-save').on('click', function(event){
    var modal = $(this).parents().find('#card-edit');
    var cardBody = $(cardBeingEdited).find('.card-body');
    cardBody.text(modal.find('#card-edit-body').val());
    modal.modal('hide');
  })


  $('.list-cards').sortable({
    connectWith: '.list-cards'
  })
