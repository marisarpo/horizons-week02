"use strict";
$(document).ready(function() {

  // YOUR JAVASCRIPT CODE GOES HERE
  $('.add-list').on('click', function() {
    $('.add-list-form-wrapper').removeClass('collapse');
  });

  $('.add-list-cancel').on('click', function() {
    $('.add-list-form-wrapper').addClass('collapse');
  });

  $('.add-list-save').on('click', function() {
    var title = $('.add-list-form-wrapper input').val();
    var content = `<div class="list-container">
      <div class="list">
        <div class="list-header">
          <span class="list-title">${title}</span>
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
    </div>`;
    $(this).closest('.list-container').before(content);
    $('.add-list-form-wrapper input').val('');
    $('.add-list-form-wrapper').addClass('collapse');
    $('.list-cards').sortable({
      connectWith: ".list-cards"
    });
  });

  $('.board').on('click', '.add-card', function() {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  });

  $('.board').on('click', '.add-card-cancel', function() {
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  });


  $('.board').on('click', '.add-card-save', function() {
    var title = $(this).siblings('input').val();
    var content = `<div class="card">
      <span class="card-more">
        <span class="glyphicon glyphicon-align-left"></span>
      </span>
      <div class="card-body">${title}</div>
    </div>`;
    $(this).parents().eq(3).children('.list-cards').append(content);
    //$(this).closest('.list').find('.list-cards')
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  });

  var cardBeingEdited = null;
  $('.board').on('click', '.card', function() {
    cardBeingEdited = $(this);
    //console.log($(this).parents());
    $('#card-edit').modal();
    var content = $(this).find('.card-body').text();
    $('#card-edit-body').val(content);
  });

  $('.card-edit-save').on('click', function() {
    var content = $('#card-edit-body').val();
    cardBeingEdited.find('.card-body').text(content);
    $('#card-edit').modal('toggle');
  });

  $('.list-cards').sortable({
    connectWith: ".list-cards"
  });

  $(document).on('keydown', function(event) {
    if(event.key === 'c') {
      var card = $('.card:hover');
      card.remove();
    }
  });

  var themeChangeCount = 0;
  $('.header-logo').on('click', function() {
    themeChangeCount++;
    if(themeChangeCount === 0) {
      $('body').css("background-color", "white");
    } else if(themeChangeCount === 1) {
      $('body').css("background-color", "pink");
      $('body').css("background-image", "url(https://img1.ak.crunchyroll.com/i/spire3/0412be60dd743fc8106a432a55910f651513941375_large.jpg)")
    } else if(themeChangeCount === 2) {
      $('body').css("background-color", "rgb(0,121,191)");
      $('body').css("background-image", '');
      themeChangeCount = -1;
    }
  });

  $('#classic').on('click', function() {
    $('body').css("background-color", "rgb(0,121,191)");
    $('body').css("background-image", '');
  });

  $('#cats').on('click', function() {
    $('body').css("background-color", "pink");
    $('body').css("background-image", "url(https://img1.ak.crunchyroll.com/i/spire3/0412be60dd743fc8106a432a55910f651513941375_large.jpg)")
  });

  $('#white').on('click', function() {
    $('body').css("background-color", "white");
    $('body').css("background-image", '');
  });

});
