"use strict";
$(document).ready(function () {

  $('.add-list').on('click', function () {
    $('.add-list-form-wrapper').removeClass('collapse');
  });
  $('.add-list-cancel').on('click', function () {
    $('.add-list-form-wrapper').addClass('collapse');
  });
  $('.add-list-save').on('click', function () {
    var val = $(this).siblings('.form-control').val();
    $('.add-list-form-wrapper').addClass('collapse');
    $('.add-list-form-wrapper').before(
      $(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">` + val + `</span>
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
    );
  });

  $('.board').on('click', '.add-card', function () {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
    $('.list-cards').sortable({
      connectWith: '.list-cards'
  })
  });
  $('.board').on('click', '.add-card-cancel', function () {
    $('.add-card-form-wrapper').addClass('collapse');
  });
  $('.board').on('click', '.add-card-save', function () {
    var val = $(this).siblings('.card-control').val();
    $('.add-card-form-wrapper').addClass('collapse');
    $(this).parentsUntil('.list-container', '.list').children('.list-cards').append(
      $(`<div class="card">
            <span class="card-more">
                <span class="glyphicon glyphicon-align-left"></span>
            </span>
            <div class="card-body">` + val + `</div>
        </div>`)
    );
  });

  var cardBeingEdited = null;

  $('.card').on('click', function () {
    cardBeingEdited = this;
    var contents = $(cardBeingEdited).children('.card-body').text();
    $('#card-edit-body').attr('placeholder', contents);
    $('#card-edit').modal();
    $('#card-edit-body').val()
  });

  $('.card-edit-save').on('click', function () {
    $(cardBeingEdited).children('.card-body').text($('#card-edit-body').val());
    $('#card-edit-body').val('');
    $('.modal').modal('hide');
  });


  $('.list-cards').sortable({
      connectWith: '.list-cards'
  })
})
// YOUR JAVASCRIPT CODE GOES HERE
