"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {

    // SHOW LIST FORM WRAPPER
    $('.list-container').on('click', '.add-list', function() {
        var $this = $(this);
        var formWrapper = $this.siblings('.add-list-form-wrapper');
        formWrapper.removeClass('collapse');
    })

    // HIDE LIST FORM WRAPPER
    $('.list-container').on('click', '.add-list-cancel', function() {
        var $this = $(this);
        var formWrapper = $this.parent().parent();
        formWrapper.addClass('collapse');
    })

    // SAVE LIST
    $('.list-container').on('click', '.add-list-save', function() {
        var $this = $(this);
        var titleValue = $this.siblings('.form-control').val();
        var addListWrapper = $this.closest('.list-container');
        var toAdd = $(`
            <div class="list-container">
              <div class="list">
                <div class="list-header">
                  <span class="list-title">${titleValue}</span>
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
        addListWrapper.before(toAdd);
        var formWrapper = $this.parent().parent();
        formWrapper.addClass('collapse');
    })

    // SHOW CARD FORM WRAPPER
    $('.board').on('click', '.add-card', function() {
        var $this = $(this);
        var formWrapper = $this.siblings('.add-card-form-wrapper');
        formWrapper.removeClass('collapse');
    })

    // HIDE CARD FORM WRAPPER
    $('.board').on('click', '.add-card-cancel', function() {
        var $this = $(this);
        var formWrapper = $this.parent().parent();
        formWrapper.addClass('collapse');
    })

    // SAVE CARD
    $('.board').on('click', '.add-card-save', function() {
        var $this = $(this);
        var titleValue = $this.siblings('.form-control').val();
        var addListWrapper = $this.closest('.list-footer');
        var toAdd = $(`
            <div class="card">
              <span class="card-more">
                <span class="glyphicon glyphicon-align-left"></span>
              </span>
              <div class="card-body">${titleValue}</div>
            </div>
            `)
        addListWrapper.before(toAdd);
        var formWrapper = $this.parent().parent();
        formWrapper.addClass('collapse');
    })
    var cardBeingEdited = null;
    $('.board').on('click', '.card', function() {
        cardBeingEdited = $(this);
        var currentText = cardBeingEdited.text()
        var openModal = $('#card-edit').modal(); // opens the modal
        var modalBody = openModal.find('#card-edit-body')
        modalBody.val(currentText.trim());
    })

    $('.modal').on('click', '.card-edit-save', function() {
        var modalBody = $(this).parent(). siblings('.modal-body').children('#card-edit-body')
        var newValue = modalBody.val();
        cardBeingEdited.children('.card-body').text(newValue);
        $(this).attr("data-dismiss","modal");
    })

    // SORTABLE DRAG & DROP
    $('.list-cards').sortable( {
        connectWith: ".list-cards"
    }).disableSelection();

    $('.board').sortable( {
    }).disableSelection();

    // DELETING CARDS
    $('body').keydown(function(event) {
        var eventString = String.fromCharCode(event.which);
        if ( eventString === 'C' ) {
           $('.card:hover').remove();
          }
    })
})
