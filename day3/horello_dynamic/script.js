"use strict";
var cardBeingEdited = null;

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function(){
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function(){
  $('.add-list-form-wrapper').addClass('collapse');
  $('.add-list-form-wrapper .form-control').val("");
})

$('.add-list-save').on('click', function(){
  var title = $('.add-list-form-wrapper .form-control').val();
  $('.add-list-form-wrapper .form-control').val("");
  var newElem = '<div class="list-container">'
  + '<div class="list">'
  + '<div class="list-header">'
  + '<span class="list-title">' + title +'</span>'
  + '</div>'
  + '<div class="list-cards"></div>'
  + '<div class="list-footer">'
  +   '<button class="add-card">Add a card...</button>'
  +   '<div class="collapse add-card-form-wrapper">'
  +     '<div class="well add-card-form">'
  +      '<input type="text" class="form-control" placeholder="Card title">'
  +      '<button type="button" class="btn btn-default add-card-save">'
  +        'Save'
  +      '</button>'
  +      '<button type="button" class="btn btn-default add-card-cancel">'
  +        '<span class="glyphicon glyphicon-remove"></span>'
  +      '</button>'
  +    '</div>'
  +  '</div>'
  +'</div>'
  +'</div>'
  +'</div>'

  $(this).closest('.list-container').before(newElem);
  $('.list-cards').sortable({
    connectWith : '.list-cards'
  });
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card', function() {
  $(this).closest('.list-footer').children('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
  var title = $(this).closest('.list-footer').find('.add-card-form-wrapper .form-control').val();
  $(this).closest('.list-footer').find('.add-card-form-wrapper .form-control').val("");
  var newElem = '<div class="card">'
  + '<span class="card-more">'
  +   '<span class="glyphicon glyphicon-align-left"></span>'
  + '</span>'
  +'<div class="card-body">' + title + '</div>'
  +'</div>';

  $(this).closest('.list').find('.list-cards').append(newElem);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  $('#card-edit-body').val(cardBeingEdited.children().eq(1).text());
  $('#card-edit').modal();
})

$('#card-edit').on('click', '.card-edit-save', function() {
  var input = $('#card-edit-body').val();
  cardBeingEdited.children().eq(1).text(input);
  $('#card-edit').modal('hide');
})

$('.list-cards').sortable({
  connectWith : '.list-cards',
  placeholder: "ui-state-highlight"
});

$(document).keydown(function(event){
  var code = String.fromCharCode(event.keyCode);
  if(code === "C"){
    $('.card:hover').remove();
  }
})

$('header').on('click', function(){
  $('header').css({background: "#ffe"});
})
