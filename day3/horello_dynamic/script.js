"use strict";

var cardBeingEdited = null;

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function() {
  $(".add-list").on('click', function() {
    $(".add-list-form-wrapper").removeClass('collapse');
  })

  $(".add-list-cancel").on('click', function() {
    $(".add-list-form-wrapper").addClass('collapse');
  })

  $(".add-list-save").on('click', function() {
    var title = $('.add-list-form-wrapper input').val();
    var newListElement =
    `<div class="list-container">
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
    </div>`;
    $('.add-list-form-wrapper').before(newListElement);
    $(".add-list-form-wrapper").addClass('collapse');
    $('.list-cards').sortable({
      connectWith: '.list-cards'
    });
  })

  $('.board').on('click', '.add-card', function() {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  })

  $('.board').on('click', '.add-card-cancel', function() {
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  })

  $('.board').on('click', '.add-card-save', function() {
    var parent = $(this).closest('.add-card-form-wrapper');
    var title = parent.find('input').val();
    var newCardElement =
    `<div class="card">
      <span class="card-more">
        <span class="glyphicon glyphicon-align-left"></span>
      </span>
      <div class="card-body">`+ title +`</div>
    </div>`
    parent.closest('.list-footer').siblings('.list-cards').append(newCardElement);
    parent.addClass('collapse');
  })

  $('.board').on('click', '.card', function() {
    cardBeingEdited = $(this);
    $('#card-edit').modal();
    var text = $(this).find('.card-body').text();
    $('#card-edit-body').val(text);
  })

  $('.card-edit-save').on('click', function() {
    var text = $('#card-edit-body').val();
    cardBeingEdited.find('.card-body').text(text);
    $('.modal').modal('toggle');
  })

  $('.list-cards').sortable({
    connectWith: '.list-cards'
  });

  $(document).keydown(function(event) {
    console.log("hi");
    if (String.fromCharCode(event.which).toLowerCase() === "c") {
      var $this = $('.card:hover');
      $this.remove();
    }
  })

var cycle = 3;

  $('.header-logo-default').on('click', function() {
    console.log('thought an easter egg meant change the background to an easter egg...');
    if (cycle % 3 === 0) {
      $('.board').css("background-color", "#87CEFA");
      $('.list').css("background-color", "#FFA07A");
      $('body').css("background-color", "#87CEFA");
      $('header').css("background", "rgba(256, 256, 256, 0.15)");
    } else if (cycle % 3 === 1) {
      $('.board').css("background-image", "url(ee2.jpg)");
      $('.list').css("background-color", "#FFA07A");
      $('body').css("background-color", "#87CEFA");
      $('header').css("background", "rgba(256, 256, 256, 0.15)");
    } else {
      $('.board').css("background-image", "");
      $('.board').css("background-color", "");
      $('.list').css("background-color", "");
      $('body').css("background-color", "");
      $('header').css("background", "");
    }
    cycle++;
  })

var selected = $(".selector").val();

  $(".selector").mouseleave(function() {
    selected = $(".selector").val();
    if (selected === "Theme 2") {
      $('.board').css("background-color", "#87CEFA");
      $('.list').css("background-color", "#FFA07A");
      $('body').css("background-color", "#87CEFA");
      $('header').css("background", "rgba(256, 256, 256, 0.15)");
    } else if (selected === "Theme 3") {
      $('.board').css("background-image", "url(ee2.jpg)");
      $('.list').css("background-color", "#FFA07A");
      $('body').css("background-color", "#87CEFA");
      $('header').css("background", "rgba(256, 256, 256, 0.15)");
    } else {
      $('.board').css("background-image", "");
      $('.board').css("background-color", "");
      $('.list').css("background-color", "");
      $('body').css("background-color", "");
      $('header').css("background", "");
    }
  })
})
