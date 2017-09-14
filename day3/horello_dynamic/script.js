"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;
var colorCounter = 0;

function createList(listName) {
    return `<div class="list-container">
    <div class="list">
      <div class="list-header">
        <span class="list-title"> ${listName} </span>
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
}

function createCard(cardTitle) {
  return `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body"> ${cardTitle} </div>
</div>`;
}


function init() {
  $('.add-list').on('click', function(event) {
    var listContainer = $(this).closest('.add-list-container');
    var formWrapper = $(listContainer).children('.add-list-form-wrapper'); //to be un-collapsed
    $(formWrapper).removeClass('collapse');
  });

  $('.add-list-cancel').on('click', function(event) {
    var listContainer = $(this).closest('.add-list-container');
    var formWrapper = $(listContainer).children('.add-list-form-wrapper'); //to be collapsed
    $(formWrapper).addClass('collapse');
  });

  $('.add-list-save').on('click', function(event) {
    var listContainer = $(this).closest('.add-list-container');
    var formWrapper = $(listContainer).children('.add-list-form-wrapper');
    var listTitle = $($(formWrapper).find('input')).val();
    var topOfAddList = $(listContainer).closest('.list-container');
    $(topOfAddList).before(createList(listTitle));
    $('.list-cards').sortable({
      connectWith: '.list-cards'
    });
  });

  $('.board').on('click', '.add-card', function(event) {
    var addCardWrapper = $(this).siblings('.add-card-form-wrapper');
    $(addCardWrapper).removeClass('collapse');
  });

  $('.board').on('click', '.add-card-cancel', function(event) {
    var addCardWrapper = $(this).closest('.add-card-form-wrapper');
    $(addCardWrapper).addClass('collapse');
  });

  $('.board').on('click', '.add-card-save', function(event) {
    var addCardForm = $(this).closest('.add-card-form');
    var cardTitle = $($(addCardForm).children('input')).val();
    var currList = $($(addCardForm).closest('.list')).children('.list-cards');
    $(currList).append(createCard(cardTitle));
    var addCardWrapper = $(this).closest('.add-card-form-wrapper');
    $(addCardWrapper).addClass('collapse');
  });

  $('.board').on('click', '.card', function(event) {
    cardBeingEdited = this;
    $('#card-edit').modal();
    var cardBody = $(this).children('.card-body');
    var cardContents = $(cardBody).text();
    $('#card-edit-body').val(cardContents);
  });

  $('.modal-footer').on('click', '.card-edit-save', function(event) {
    var newCardContents = $('#card-edit-body').val();
    var cardBody = $(cardBeingEdited).children('.card-body');
    $(cardBody).text(newCardContents);
    $('#card-edit').modal("hide");
  });

  $('.list-cards').sortable({
    connectWith: '.list-cards'
  });

  $(document).on('keydown', function(event) {
    var key = event.key;
    if(key === 'c') {
      $(':hover.card').remove();
    }
  });

  $('.header-logo').on('click', function() {
    colorCounter = (colorCounter + 1)%3;
    switch (colorCounter) {
      case 0:
        $('body').addClass('defaultBody');
        $('header').addClass('defaultHeader');
        $('body').removeClass('purple');
        $('header').removeClass('white');
        break;

      case 1:
        $('header').addClass('darkgreen');
        $('body').addClass('black');
        $('body').removeClass('defaultBody');
        $('header').removeClass('defaultHeader');
        break;

      case 2:
        $('body').addClass('purple');
        $('header').addClass('white');
        $('body').removeClass('black');
        $('header').removeClass('darkgreen');
        break;
    }
  });
}

$(document).ready(init);
