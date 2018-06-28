"use strict";

$(document).ready(function() {

  var cardBeingEdited = null;

  $(".add-list").on("click", function() {
    $(".add-list-form-wrapper").removeClass("collapse");
  });

  $(".add-list-cancel").on("click", function() {
    $(".add-list-form-wrapper").addClass("collapse");
  });

  $(".add-list-save").on("click", function() {
    var x = $(this).siblings(".form-control").val();
    var string = `<div class="list-container">
                    <div class="list">
                      <div class="list-header">
                        <span class="list-title">${x}</span>
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

    $(this).closest(".list-container").before(string);
    $(".form-control").val("");
    $(".add-list-form-wrapper").addClass("collapse");
    $('.list-cards').sortable({
      connectWith: ".list-cards"
    });

  });

  $('.board').on('click', '.add-card', function() {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  });

  $('.board').on('click', '.add-card-cancel', function() {
    $(this).siblings('input').val('');
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  });

  $('.board').on('click', '.add-card-save', function() {
    var x = $(this).siblings('.form-control').val();
    $(this).siblings('input').val('');
    var string = `<div class="card">
                    <span class="card-more">
                      <span class="glyphicon glyphicon-align-left"></span>
                    </span>
                    <div class="card-body">${x}</div>
                  </div>`;

    $(this).closest('.list').find('.list-cards').append(string);
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  });

  $('.board').on('click', '.card', function() {
    cardBeingEdited = $(this);
    var oldText = $(this).find(".card-body").text();
    $("#card-edit").modal();
    $("#card-edit-body").val(oldText);
  });

  $('.card-edit-save').on("click", function() {
    var newText = $("#card-edit-body").val();
    cardBeingEdited.find('.card-body').text(newText);
    $("#card-edit").modal("toggle");
    $("#card-edit-body").val("");
    cardBeingEdited = null;
  });

  $('.list-cards').sortable({
    connectWith: ".list-cards"
  });

});
