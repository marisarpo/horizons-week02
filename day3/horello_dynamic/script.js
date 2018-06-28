"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

var cardBeingEdited = null;

$(document).ready(function() {

  $('.list-cards').sortable({
    connectWith:'.list-cards'
  });

  $('.board').on('click', '.add-list', function(event) {
    $('.add-list-form-wrapper').removeClass('collapse');
  })

  $('.board').on('click', '.add-list-cancel', function(event) {
    $('.add-list-form-wrapper').addClass('collapse');
  })

  $('.board').on('click', '.add-list-save', function(event) {
    var newListName = $(this).closest('.add-card-form').children('.form-control').val();
    console.log(newListName);
    var newElem = $(`<div class="list-container">
      <div class="list">
        <div class="list-header">
          <span class="list-title">${newListName}</span>
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
    `)

    $(this).closest('.list-container').before(newElem);

    //newListName = '';
    $(this).closest('.add-card-form').children('.form-control').val('');
    $('.add-list-form-wrapper').addClass('collapse');

    $('.list-cards').sortable({
      connectWith:'.list-cards'
    });
  })

  $('.board').on('click', '.add-card', function() {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  })

  $('.board').on('click', '.add-card-cancel', function() {
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  })

  $('.board').on('click', '.add-card-save', function() {
    var cardTitle = $(this).closest('.add-card-form').children('.form-control').val();
    // console.log(cardTitle);
    var newCard = $(`<div class="card">
      <span class="card-more">
        <span class="glyphicon glyphicon-align-left"></span>
      </span>
      <div class="card-body">${cardTitle}</div>
    </div>`);
    $(this).closest('.list-container').find('.list-cards').append(newCard);
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  })

  $('.board').on('click', '.card', function() {
    cardBeingEdited = $(this);
    $('#card-edit').modal();
    $('#card-edit-body').val($(this).find('.card-body').text());
    // $(this) = cardBeingEdited;
  })

  $('.card-edit-save').on('click', function() {
    // console.log('hit save changes');
    cardBeingEdited.children('.card-body').text($('#card-edit-body').val());
    $(this).closest('.modal').modal('toggle');
  })


  // $('.board').on('click', '.add-card', function(){
  //   console.log('CLICKED, FOOL');
  // })

})
