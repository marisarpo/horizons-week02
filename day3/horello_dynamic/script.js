"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$(document).ready(function() {

  $('.add-list').on('click', function() {
    $('.add-list-container').children().eq(1).removeClass('collapse');
    $('.add-list-form-wrapper').children().eq(0).removeClass('collapse');
  });

  $('.add-list-cancel').on('click', function() {
    $('.add-list-container').children().eq(1).addClass('collapse');
  });

  $('.add-list-save').on('click', function() {
    var title = $('.add-list-form-wrapper').children().eq(0).children().eq(0).val();
    var list_html = $(
      '<div class="list-container"> \
        <div class="list"> \
          <div class="list-header"> \
            <span class="list-title">LIST TITLE GOES HERE</span> \
          </div> \
          <div class="list-cards"></div> \
          <div class="list-footer"> \
            <button class="add-card">Add a card...</button> \
            <div class="collapse add-card-form-wrapper"> \
              <div class="well add-card-form"> \
                <input type="text" class="form-control" placeholder="Card title"> \
                <button type="button" class="btn btn-default add-card-save"> \
                Save \
                </button> \
                <button type="button" class="btn btn-default add-card-cancel"> \
                  <span class="glyphicon glyphicon-remove"></span>\
                </button> \
              </div> \
            </div> \
          </div> \
        </div> \
      </div>');
    $('.add-list-form-wrapper').children().eq(0).addClass('collapse');
    list_html.children().eq(0).children().eq(0).text(title);
    $('.add-list-form-wrapper').parent().parent().before(list_html);
  });


  $('.board').on('click', '.add-card', function() {
    var curr = $(this);
    curr.siblings('.add-card-form-wrapper').removeClass('collapse');
  });

  $('.board').on('click', '.add-card-cancel', function() {
    var curr = $(this);
    curr.parent().parent().addClass('collapse');
  })

  $('.board').on('click', '.add-card-save', function() {
    var curr = $(this);
    var title = curr.siblings('input').val();
    var card_html = $(
      '<div class="card">\
        <span class="card-more">\
          <span class="glyphicon glyphicon-align-left"></span>\
        </span>\
        <div class="card-body">CARD TITLE HERE</div>\
        </div>'
    );
    card_html.children().eq(1).text(title);
    curr.closest('.list').children().eq(1).append(card_html);
    curr.parent().parent().addClass('collapse');
  })

  var cardBeingEdited = null;
  $('.board').on('click', '.card', function() {
    cardBeingEdited = $(this);
    $('#card-edit').modal();
    var inputtext = $('#card-edit-body').val();
    $('#card-edit-body').val(cardBeingEdited.find('.card-body').text());

  })

  $('.modal-footer').on('click', '.card-edit-save', function() {
    var curr = $(this);
    cardBeingEdited.find('.card-body').text($('#card-edit-body').val());
    $('#card-edit').modal('hide');
  });

  $('.list-cards').sortable({connectWith: ".list-cards"}).disableSelection();

  $(document).keydown(function(event) {
    if (event.keyCode === 67) {
      $('.card:hover').remove();
    }
  })

  $('.header-logo').click(function() {
    $('clickMe').toggle(
      function() {
        $('body').css('background-color', 'red');
      },
      function() {
        $('body').css('background-color', 'green');
      }
    )

  })






})
