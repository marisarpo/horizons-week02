"use strict";

var cardBeingEdited = null;

$('.add-list').on('click',function() {
  $(this).next().toggleClass('collapse');
})
$('.add-list-cancel').on('click',function() {
  $(this).parent().parent().addClass('collapse');
})
$('.add-list-save').on('click',function() {
  var listName = $(this).prev().val();
  var obj = $(`<div class="list-container">
                  <div class="list">
                    <div class="list-header">
                      <span class="list-title">` + listName + `</span>
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
  $('.add-list-container').parent().before(obj);
  $(this).parent().parent().addClass('collapse');
  $( ".list-cards" ).sortable({
    connectWith: ".list-cards"
  }).disableSelection();
})

$('.board').on('click', '.add-card', function() {
  $(this).next().toggleClass('collapse');
})
$('.board').on('click', '.add-card-cancel',function() {
  $(this).parent().parent().addClass('collapse');
})
$('.board').on('click','.add-card-save',function() {
  var cardName = $(this).prev().val();
  var obj = $(`<div class="card">
                <span class="card-more">
                  <span class="glyphicon glyphicon-align-left"></span>
                </span>
                <div class="card-body">` + cardName + `</div>
              </div>`);
  $(this).closest('.list').find('.list-cards').append(obj);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var editText = $(this).find('.card-body').text();
  $('#card-edit-body').val(editText);
});

$('.card-edit-save').on('click', function() {
  var newText = $('#card-edit-body').val();
  cardBeingEdited.find('.card-body').text(newText);
  $('#card-edit').modal('hide');
  cardBeingEdited = null;
});

$( ".list-cards" ).sortable({
  connectWith: ".list-cards"
}).disableSelection();

$(document).on('keydown',function(event){
  if (event.key==='c') $(':hover.card').remove();
});

$('#card-edit-body').on('keydown',function(event) {
  if (event.key === "Enter") {
    var newText = $('#card-edit-body').val();
    cardBeingEdited.find('.card-body').text(newText);
    $('#card-edit').modal('hide');
    cardBeingEdited = null;
  }
});

$('.board').on('keydown','.input-card-save',function(event) {
  if (event.key === "Enter") {
    var cardName = $(this).val();
    var obj = $(`<div class="card">
                  <span class="card-more">
                    <span class="glyphicon glyphicon-align-left"></span>
                  </span>
                  <div class="card-body">` + cardName + `</div>
                </div>`);
    $(this).closest('.list').find('.list-cards').append(obj);
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  }
});

$('#add-list-board').on('keydown','input',function(event) {
  if (event.key === "Enter") {
    var listName = $(this).val();
    var obj = $(`<div class="list-container">
                    <div class="list">
                      <div class="list-header">
                        <span class="list-title">` + listName + `</span>
                      </div>
                      <div class="list-cards"></div>
                      <div class="list-footer">
                        <button class="add-card">Add a card...</button>
                        <div class="collapse add-card-form-wrapper">
                          <div class="well add-card-form">
                            <input type="text" class="form-control input-card-save" placeholder="Card title">
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
    $('.add-list-container').parent().before(obj);
    $(this).parent().parent().addClass('collapse');
    $( ".list-cards" ).sortable({
      connectWith: ".list-cards"
    }).disableSelection();
  }
});

$('.header-logo').on('click', function() {
  $('header').toggleClass('header2');
  $('body').toggleClass('body2');
  $('.list').toggleClass('list2');
  $('.card').toggleClass('card2');
  $('.add-card').toggleClass('add-card2');

})
