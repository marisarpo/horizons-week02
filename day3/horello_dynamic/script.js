"use strict";
var cardBeingEdited = null;
$(document).ready(function() {
  $('.add-list-container').on('click','.add-list', function() {
    $('.add-list-form-wrapper').toggleClass('collapse');
  });
  $('.add-list-container').on('click','.add-list-cancel', function() {
    $('.add-list-form-wrapper').toggleClass('collapse');
  });
  $('.add-list-container').on('click','.add-list-save', function() {
    var title = $('#list-input').val();
    $('.add-list-form-wrapper').before(`<div class="list-container">
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
  });
  $('.add-card').on('click', function() {
    $(this).siblings('.add-card-form-wrapper').toggleClass('collapse');
  });
  $('.add-card-cancel').on('click',function() {
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  });
  $('.add-card-save').on('click', function() {
    var title = $(this).closest('.add-card-form').find("input[type='text']").val();
    var content = `<div class="card">
        <span class="card-more">
          <span class="glyphicon glyphicon-align-left"></span>
        </span>
        <div class="card-body">`+title +`</div>
      </div>`
      $(this).closest('.list-footer').before(content);
    var title = $(this).closest('.add-card-form').find("input[type='text']").val('');
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
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
})
// YOUR JAVASCRIPT CODE GOES HERE
