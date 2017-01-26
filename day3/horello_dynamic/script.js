"use strict";

// GLOBAL VARIABLES
var cardBeingEdited = null;

// YOUR JAVASCRIPT CODE GOES HERE
$("button.add-list").on("click", function(e) {
  $(this).parent().children(".add-list-form-wrapper").removeClass('collapse');
});

$("button.add-list-cancel").on("click", function(e) {

  $(".add-list-form-wrapper").addClass('collapse');
});

$("button.add-list-save").on("click", function(e) {

  var title = $(this).parent().children(".form-control").val();
  var newList = addList(title);
  $(".list-container:last-child").before(newList);

  $('.list-cards').sortable( {
    revert: false,
    items: '.card',
    connectWith: '.list-cards'
  });

});

function addList(title) {
  return $('<div class="list-container"> \
    <div class="list">\
      <div class="list-header">\
        <span class="list-title">' + title + '</span>\
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
  </div>');
}

function addCard(title) {
  return $('<div class="card">\
              <span class="card-more">\
                <span class="glyphicon glyphicon-align-left"></span>\
              </span>\
              <div class="card-body">' + title + '</div>\
            </div>`'
          );
}

$('.board').on('click', '.add-card', function(e) {
  $(this).parent().children('.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function(e) {
  $(this).parent().closest('.list-footer').children('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.add-card-save', function(e) {
  var title = $(this).parent().children(".form-control").val();
  var newCard = addCard(title);

  $(this).closest('.list').children('.list-cards').append(newCard);
});

$('.board').on('click', '.card', function(e) {
  cardBeingEdited = this;
  console.log(this);
  $('#card-edit').modal();
  var curText = $(this).children('.card-body').text();
  $('#card-edit-body').val(curText);
});

$('.card-edit-save').on('click', function(e){
  var newText = $('#card-edit-body').val();
  $(cardBeingEdited).children('.card-body').text(newText);
  cardBeingEdited = null;
  $('#card-edit').modal('hide');
});

$('.card-edit-cancel').on('click', function(e) {
  cardBeingEdited = null;
  $('#card-edit').modal();
});

$('.list-cards').sortable( {
  revert: false,
  items: '.card',
  connectWith: '.list-cards'
});
