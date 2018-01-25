"use strict";
var cardBeingEdited = null;
$(document).ready(function() {
  $('.board').on('click','.add-list', function() {
    $('.add-list-form-wrapper').toggleClass('collapse');
  });
  $('.board').on('click','.add-list-cancel', function() {
    $('.add-list-form-wrapper').toggleClass('collapse');
  });
  $('.board').on('click','.add-list-save', function() {
    var title = $('#list-input').val();
    $(this).parent().parent().parent().parent().before(`<div class="list-container">
        <div class="list">
          <div class="list-header">
            <span class="list-title">`+ title + `</span>
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
      </div>`);
      $('.add-list-form-wrapper').toggleClass('collapse');
      $('#list-input').val('');
  });
  $('.board').on('click','.add-card', function() {
    $(this).siblings('.add-card-form-wrapper').toggleClass('collapse');
  });
  $('.board').on('click','.add-card-cancel',function() {
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  });
  $('.board').on('click','.add-card-save', function() {
    var title = $(this).parent().find("input[type='text']").val();
    var content = `<div class="card">
        <span class="card-more">
          <span class="glyphicon glyphicon-align-left"></span>
        </span>
        <div class="card-body">`+ title +`</div>
      </div>`
      $(this).closest('.list-footer').parent().find('.list-cards').append(content);
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
    var title = $(this).parent().find("input[type='text']").val('');
    // var title = $(this).closest('.add-card-form').find("input[type='text']").val('');
  })
  $('.board').on('click','.card',function(){
    cardBeingEdited = $(this);
    var title = $(this).find('div.card-body').text();
    $(document).find('#card-edit').modal();
    $(document).find('#card-edit-body').text(title);
  })
  $('.card-edit-save').on('click',function () {

    var newText = $(document).find('#card-edit-body').val();
    cardBeingEdited.find('div.card-body').text(newText);
    $(document).find('#card-edit').modal('hide');
  })
  $('.board').sortable({
  // Configuration parameters here
  });
  $('.list-cards').sortable({

  })
})
// YOUR JAVASCRIPT CODE GOES HERE
