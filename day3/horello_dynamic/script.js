"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function(event){
  var $this = $(this);
  var wrapperDiv = $this.parent().children('.add-list-form-wrapper');
  wrapperDiv.removeClass('collapse');
});

$('.add-list-cancel').on('click', function(event){
  var $this = $(this);
  var wrapperDiv = $this.parent();
  wrapperDiv.addClass('collapse');
});

$('.add-list-save').on('click', function(event) {
  var $this = $(this);
  // var addacardtext = equalTo.last().val();

  var addacardtext = $this.parent().children('input').val();
  $this.parents(".list-container").before(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${addacardtext}</span>
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
$this.siblings('input').val("");
$( '.list-cards' ).sortable({
      connectWith: '.list-cards'
    }).disableSelection();
});

$('.board').on('click', '.add-card', function(){
  var $this = $(this);
  var wrapperDiv = $this.parent().children('.add-card-form-wrapper');
  wrapperDiv.removeClass('collapse');
  });

  $('.board').on('click', '.add-card-save',function(event) {
    var $this = $(this);
    // var addacardtext = equalTo.last().val();
    var addacardtext = $this.parent().children('input').val();
      $this.parents().eq(3).children('.list-cards').append(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${addacardtext}</div>
</div>`)
$this.siblings('input').val("");
});

var cardBeingEdited = null;

$('.board').on('click', '.card', function(){
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var textfromcard = cardBeingEdited.find('.card-body').text();
  $('#card-edit').find('#card-edit-body').val(textfromcard);
});

$('.card-edit-save').on('click', function(event){
  var newtext = $('#card-edit').find('#card-edit-body').val()
  cardBeingEdited.find('.card-body').text(newtext);
  $('#card-edit').modal('toggle');
});


$( '.list-cards' ).sortable({
      connectWith: '.list-cards'
    }).disableSelection();
