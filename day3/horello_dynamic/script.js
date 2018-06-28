"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$(document).ready(function() {

  var cardBeingEdited = null;
  var content;

  $(document).keydown(function(event) {
    if (event.key == "c") {
      $(".card:hover").remove();
    }
  });

  $('.header-logo').on("click", function(event) {
    $("body").css("background", "rgb(0,255,255)");
  })

  $('.list-cards').sortable({
    // Configuration parameters here
    revert: false,
    items: '.card',
    connectWith: ".list-cards"
    });

  $(".board").on("click", ".card", function() {
    cardBeingEdited = $(this);
    var body = cardBeingEdited.children(".card-body").text();
    $("#card-edit-body").val(body);
    $("#card-edit").modal();
  });

  $(".modal").on("click", ".card-edit-save", function() {
    content = $("#card-edit-body").val();
    cardBeingEdited.children(".card-body").text(content);
    $(this).closest(".modal").modal("toggle");
  });

  $(".board").on("click", ".add-list", function() {
    $('.add-list-form-wrapper').removeClass('collapse');
  });

  $(".board").on("click", ".add-list-cancel", function() {
    $('.add-list-form-wrapper').addClass('collapse');
  });

  $(".board").on("click", ".add-list-save", function() {
    var title = $(".add-list-form-wrapper .add-card-form input").val();
    var list_container = $(this).closest(".list-container");
    $(list_container).before(`<div class="list-container">
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
  </div>`)
    $(".add-list-form-wrapper .add-card-form input").val('');
    $('.add-list-form-wrapper').addClass('collapse');
    $('.list-cards').sortable({
      // Configuration parameters here
      revert: false,
      items: '.card',
      connectWith: ".list-cards"
      });
  });

  $(".board").on("click", ".add-card", function() {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  });

  $(".board").on("click", ".add-card-cancel", function() {
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  });

  $(".board").on("click", ".add-card-save", function() {
    var title = $(this).siblings("input").val();
    var list_cards = $(this).closest(".list").children(".list-cards");
    $(list_cards).append(`<div class="card">
    <span class="card-more">
      <span class="glyphicon glyphicon-align-left"></span>
    </span>
    <div class="card-body">${title}</div>
  </div>`);
  });

});
