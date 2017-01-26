"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.board').on('click', '.add-list', function() {
  var $this = $(this);
  var container = $this.closest('.add-list-container');
  (container.children('.add-list-form-wrapper')).removeClass('collapse');
})

$('.board').on('click', '.add-list-cancel', function() {
  var $this = $(this);
  var container = $this.closest('.add-list-container');
  (container.children('.add-list-form-wrapper')).addClass('collapse');
})



$('.board').on('click', '.add-list-save', function() {
  var $this = $(this);
  var container = $this.closest('.add-card-form');
  var input = container.children('input[type="text"]');
  var title = input.val();
  var containerCard = $this.closest('.list-container');
  containerCard.before(
    '<div class="list-container"><div class="list"><div class="list-header"><span class="list-title">'
    + title + '</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card">Add a card...</button><div class="collapse add-card-form-wrapper"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default add-card-save">Save</button><button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove"></span></button></div></div></div></div></div>'
  );
  var close = $this.closest('.add-list-container');
  close.children('.add-list-form-wrapper').addClass('collapse');
  $('.list-cards').sortable({
    connectWith: ".list-cards"
  }).disableSelection();
})


$('.board').on('click', '.add-card', function() {
  var $this = $(this);
  var container = $this.siblings('.add-card-form-wrapper');
  container.removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
  var $this = $(this);
  var container = $this.closest('.add-card-form-wrapper');
  container.addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
  var $this = $(this);
  var input = $this.siblings('input').val();
  var cards = $this.closest('.list-footer').siblings('.list-cards');
  cards.append('<div class="card"><span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span><div class="card-body">'+input+'</div></div>');
  var container = $this.closest('.add-card-form-wrapper');
  container.addClass('collapse');
})

var cardBeingEdited = null;
$('.board').on('click', '.card', function() {
  cardBeingEdited = this;
  $('#card-edit').modal();
  var text = $(this).children('.card-body').text();
  $('#card-edit-body').val(text);
})

$('.card-edit-save').on('click', function() {
  var text = $('#card-edit-body').val();
  $(cardBeingEdited).children('.card-body').text(text);
  $('#card-edit').modal('toggle');
})

$('.list-cards').sortable({
  connectWith: ".list-cards"
}).disableSelection();


$('html').keydown(function(e) {
  if (e.key === 'c'){
    $(':hover').children('.card-body').remove();
  }
})

$('.header-logo').on('click', function() {
  var num = Math.random() * 100;
  if (num > 90) {
    $('body').css("background", "yellow");
  } else if (num > 80) {
    $('body').css("background", "green");
  } else if (num > 70) {
    $('body').css("background", "red");
  } else if (num > 40) {
    $('body').css("background", "grey");
  } else {
    $('body').css("background", "url(http://vignette3.wikia.nocookie.net/uncyclopedia/images/b/bf/Poopoo.jpg/revision/latest?cb=20060916103426)");
  }
})
