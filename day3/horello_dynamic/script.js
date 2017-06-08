"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function() {

  $('.add-list').on('click', function() {
    var $this = $(this);
    var parent= $this.parent();
    var child= parent.children('.add-list-form-wrapper');
    $(child).removeClass('collapse');
  })


  $('.add-list-cancel').on('click', function() {
    var $this = $(this);
    var parent= $this.parent();
    var parentParent = parent.parent();
    $(parentParent).addClass('collapse');
  })

$('.add-list-save').on('click', function() {
  var input = $('.add-list-form-wrapper input').val();
  $('.list-container').eq(-1).before(
    `<div class="list-container">
    <div class="list">
    <div class="list-header">
    <span class="list-title">`+input+`</span>
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
    $(this).parent().parent().addClass('collapse');
    $('.list-cards').sortable({
      connectWith: '.list-cards'
    });
  })

$('.board').on('click', '.add-card', function() {
  var $this = $(this);
  var sib = $this.siblings('.add-card-form-wrapper');
  $(sib).removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
  var $this = $(this);
  var parent = $this.parent().parent();
  $(parent).addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
  var input = $(this).siblings('.form-control').val();
  var container = $(this).parent().parent().parent().parent().children('.list-cards');
  $(container).append(`
    <div class="card">
    <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
    </span>
    <div class="card-body">`+input+`</div>
    </div>`)
    $(this).parent().parent().addClass('collapse');
  });

var cardBeingEdited = null;

$('.board').on('click', '.card', function(){
  cardBeingEdited = $(this);
  $('body').find('#card-edit').modal();
  var currentText = $(this).find('.card-body').text();
  console.log(currentText);
  $('body').find('#card-edit-body').val(currentText);
});

$('.modal').on('click', '.card-edit-save', function() {
  var newText = $('#card-edit-body').val()
  cardBeingEdited.children('.card-body').text(newText);
  $(this).attr('data-dismiss', 'modal');
});

// GO BACK TO CLOSE modal

$('.list-cards').sortable({
  connectWith: '.list-cards'
});

})
