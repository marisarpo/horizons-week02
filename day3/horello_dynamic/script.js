"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document)
  .ready(function() {
    $('.add-list')
      .on('click', function() {
        $('.add-list-form-wrapper')
          .removeClass('collapse');
      });

    $('.add-list-cancel')
      .on('click', function() {
        $('.add-list-form-wrapper')
          .addClass('collapse');
      });

    $('.add-list-save')
      .on('click', function() {
        $('.add-list-form-wrapper')
          .addClass('collapse');
        var listTitle = $(this)
          .siblings('input')
          .val()

        var listElement = '<div class="list-container">\
          <div class="list">\
            <div class="list-header">\
              <span class="list-title">' + listTitle + '</span>\
            </div>\
            <div class="list-cards"></div>\
            <div class="list-footer">\
              <button class="add-card">Add a card...</button>\
              <div class="collapse add-card-form-wrapper">\
                <div class="well add-card-form">\
                  <input type="text" class="form-control" placeholder="Card title">\
                  <button type="button" class="btn btn-default add-card-save">\
                    Save\
                  </button>\
                  <button type="button" class="btn btn-default add-card-cancel">\
                    <span class="glyphicon glyphicon-remove"></span>\
                  </button>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>'
        var $this = $(this);
        var addListFormWrapper = $this.closest('.list-container');
        $(addListFormWrapper)
          .before(listElement);

        $('.list-cards')
          .sortable({
            connectWith: '.list-cards'
          });
      });

    $('.board')
      .on('click', '.add-card', function() {
        $(this)
          .siblings('.add-card-form-wrapper')
          .removeClass('collapse');
      });

    $('.board')
      .on('click', '.add-card-cancel', function() {
        $(this)
          .closest('.add-card-form-wrapper')
          .addClass('collapse');
      });

    $('.board')
      .on('click', '.add-card-save', function() {
        $(this)
          .closest('.add-card-form-wrapper')
          .addClass('collapse');
        var cardTitle = $(this)
          .siblings('input')
          .val()
        var cardElement = '<div class="card">\
          <span class="card-more">\
            <span class="glyphicon glyphicon-align-left"></span>\
          </span>\
          <div class="card-body">' + cardTitle + '</div>\
        </div>';

        var $this = $(this);
        var listCardsDiv = $this.closest('.list-footer')
          .siblings('.list-cards');
        $(listCardsDiv)
          .append(cardElement);
      });

    var cardBeingEdited = null;

    $('.board')
      .on('click', '.card', function() {
        cardBeingEdited = this;
        $('#card-edit')
          .modal();

        var $this = $(this);
        var textInsideCard = $this.children('.card-body')
          .text();
        $('#card-edit-body')
          .val(textInsideCard);
      });


    $('.card-edit-save')
      .on('click', function() {
        var modalText = $('#card-edit-body')
          .val();
        $(cardBeingEdited)
          .children('.card-body')
          .text(modalText);
        $('#card-edit')
          .modal('toggle');
      });

    $('.list-cards')
      .sortable({
        connectWith: '.list-cards'
      });
  });
