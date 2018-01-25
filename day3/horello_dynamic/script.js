"use strict";

var cardBeingEdited = null;

$(document).ready(function (){
    $('.add-list').on('click', function() {
        $('.add-list-form-wrapper').toggleClass('collapse');
        $('#add-list').val('');
    });

    $('.add-list-cancel').on('click', function() {
        $('.add-list-form-wrapper').addClass('collapse');
        $('#add-list').val('');
    });

    $('.add-list-save').on('click', function() {
        var listTitle = $('#add-list').val();
        var newContent = $(`
        <div class="list-container">
          <div class="list">
            <div class="list-header">
              <span class="list-title">` + listTitle + `</span>
            </div>
            <div class="list-cards"></div>
            <div class="list-footer">
              <button class="list-button add-card">Add a card...</button>
              <div class="collapse add-card-form-wrapper">
                <div class="well add-card-form">
                  <input type="text" class="form-control" placeholder="Card title" id="add-card">
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
        $(this).parent().parent().parent().parent().before(newContent);
        $('.add-list-form-wrapper').toggleClass('collapse');
        $('#add-list').val('');
    });

    $('.board').on('click', '.add-card', function() {
        $(this).siblings('.add-card-form-wrapper').toggleClass('collapse');
        $('#add-card').val('');
    });

    $('.board').on('click', '.add-card-cancel', function() {
        $('.add-card-form-wrapper').addClass('collapse');
        $('#add-card').val('');
    });

    $('.board').on('click', '.add-card-save', function() {
        var cardTitle = $(this).siblings().eq(0).val();
        var newContent = $(`<div class="card">
          <span class="card-more">
            <span class="glyphicon glyphicon-align-left"></span>
          </span>
          <div class="card-body">` + cardTitle + `</div>
        </div>`);
        $(this).parent().parent().parent().before(newContent);
        $(this).siblings().eq(0).val('');
        $('.add-card-form-wrapper').addClass('collapse');
    });

    $('.board').on('click', '.card', function() {
        cardBeingEdited = $(this);
        $(document).find("#card-edit").modal("show");
        $(document).find("#card-edit-body").val($(this).text().trim());
    });

    $(".card-edit-save").on('click', function() {
        var newVal = $(document).find("#card-edit-body").val();
        cardBeingEdited.find("div.card-body").text(newVal);
    });

    $(".card-edit-cancel").on('click', function() {
        $(document).find("#card-edit").modal("hide");
    });

    $('.list-cards').sortable({

    });

    $('.board').sortable({
    });









});
