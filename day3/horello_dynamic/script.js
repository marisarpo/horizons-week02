"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function() {

  //removes collapse when add-list is clicked
  $('.add-list').on('click', function() {
    $('.add-list-form-wrapper').removeClass('collapse');
  })

  //adds collapse when X is clicked in add-list
  $('.add-list-cancel').on('click', function() {
    $('.add-list-form-wrapper').addClass('collapse');
  })

  //saves a new list when "save" is clicked in add-list
  $('.add-list-save').on('click', function() {
    var title = $(this).siblings('input').val();
    //another way to do this: $('.add-list-form-wrapper input').val();

    var toAdd = $(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">` + title + `</span>
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

    $('.add-list-form-wrapper').closest('.list-container').before(toAdd);
  })

  //add card
  $('.board').on('click', '.add-card', function() {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  })

  //add card cancel
  $('.board').on('click', '.add-card-cancel', function() {
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  })

  //add card save
  $('.board').on('click', '.add-card-save', function() {
    var title = $(this).siblings('input').val();

    var newCard = $(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">` + title + `</div>
</div>`);

    $(this).closest('.list').find('.list-cards').append(newCard); //add card to list
    $(this).closest('.add-card-form-wrapper').addClass('collapse'); //collapse
  })


  //editing cards
  var cardBeingEdited = null;
  $('.board').on('click', '.card', function() {
    var $this = cardBeingEdited = $(this);
    var text = $this.find('.card-body').text();
    $('#card-edit').modal();
    $('#card-edit-body').val(text);
  })

  //saving edited CARDS
  $('.card-edit-save').on('click', function() {
    var newText = $('#card-edit-body').val();
    $(cardBeingEdited).find('.card-body').text(newText);
    $('#card-edit').modal('hide');
    cardBeingEdited = null;
  })


  $('.list-cards').sortable({
    revert: false,
    items: '.card',
    connectWith: '.list-cards'
  });







})
