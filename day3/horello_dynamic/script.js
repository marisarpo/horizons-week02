"use strict";

var cardBeingEdited = null;
var cardBeingHoveredOver = null;

$(function() {
  $(".board").on("click", ".add-list", function() {
    $(this).next(".add-list-form-wrapper").removeClass("collapse");
  });

  $(".board").on("click", ".add-list-cancel", function() {
    $(this).closest(".add-list-form-wrapper").addClass("collapse");
  });

  $(".board").on("click", ".add-list-save", function() {
    var listName = $(this).prev("input").val();
    $(this).closest(".list-container").before('\
      <div class="list-container">\
        <div class="list">\
          <div class="list-header"\
            <span class="list-title">' + listName + '</span>\
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
      </div>\
      '
    );

    $(".list-cards").sortable({
      connectWith: ".list-cards"
    });
  });

//Add card events
  $(".board").on("click", ".add-card", function() {
    $(this).next(".add-card-form-wrapper").removeClass("collapse");
  });

  $(".board").on("click", ".add-card-cancel", function() {
    $(this).closest(".add-card-form-wrapper").addClass("collapse");
  });

  $(".board").on("click", ".add-card-save", function() {
    var cardName = $(this).prev("input").val();
    $(this).closest(".list").children(".list-cards").append('\
      <div class="card">\
        <span class="card-more">\
          <span class="glyphicon glyphicon-align-left"></span>\
        </span>\
        <div class="card-body">' + cardName + '</div>\
      </div>\
      '
    );
    $(this).closest(".add-card-form-wrapper").addClass("collapse");
  });

// Edit cards
  $(".board").on("click", ".card", function() {
    cardBeingEdited = this;
    $("#card-edit").modal();
    var textBody = $(this).children(".card-body").text();
    $("#card-edit-body").val(textBody);
  });

  $(".card-edit-save").on("click", function() {
    var text = $("#card-edit-body").val();
    console.log(text);
    $(cardBeingEdited).children(".card-body").text(text);
    $("#card-edit").modal("hide");
  });

  // Make sortable
  $(".list-cards").sortable({
    connectWith: ".list-cards"
  });

  // Delete cards
  $(".board").on("mouseover", ".card", function(e) {
    cardBeingHoveredOver = $(this);
  });
  $(".board").on("mouseout", ".card", function(e) {
    cardBeingHoveredOver = null;
  });
  $(window).on("keydown", function(e) {
    if (e.keyCode === 67) {
      cardBeingHoveredOver.remove();
    }
  });

});
