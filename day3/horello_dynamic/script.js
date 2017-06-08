"use strict";

var cardBeingEdited = null;
// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function(){
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function() {
  var title = $('.add-list-form-wrapper').find('input').val();
  var listDivString = '<div class="list-container">' +
  '<div class="list">' +
  '<div class="list-header">'+
  '<span class="list-title">' + title + '</span>'+
  '</div>'+
  '<div class="list-cards"></div>'+
  '<div class="list-footer">'+
  '<button class="add-card">Add a card...</button>'+
  '<div class="collapse add-card-form-wrapper">'+
  '<div class="well add-card-form">'+
  '<input type="text" class="form-control" placeholder="Card title">'+
  '<button type="button" class="btn btn-default add-card-save">'+
  'Save'+
  '</button>'+
  '<button type="button" class="btn btn-default add-card-cancel">'+
  '<span class="glyphicon glyphicon-remove"></span>'+
  '</button></div></div></div></div></div>';
  var listContainers = $('.list-container');
  $(listContainers[listContainers.length-1]).before(listDivString);
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click','.add-card-cancel', function() {
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card-save', function (){
  var title = $(this).siblings('input').val();
  var cardDivString = '<div class="card">' +
  '<span class="card-more">' +
  '<span class="glyphicon glyphicon-align-left"></span>' +
  '</span>' +
  '<div class="card-body">' + title + '</div>' +
  '</div>';
  $(this).closest(".list-footer").siblings('.list-cards').append(cardDivString);
  $(this).closest(".add-card-form-wrapper").addClass('collapse');
})

$('.board').on('click', '.card', function() {
  cardBeingEdited = this;
  $("#card-edit-body").val($(this).find(".card-body").text());
  $("#card-edit").modal();
})

$('.card-edit-save').on('click', function() {
  var newText = $("#card-edit-body").val();
  $(cardBeingEdited).find(".card-body").text(newText);
  $("#card-edit").modal('hide');
})

$('.list-cards').sortable({
  revert: false,
  items: '.card',
  connectWith: ".list-cards"
})

//bonus
$(document).keypress(function(event) {
  if (String.fromCharCode(event.which) === 'c') {
    $('.card:hover').remove();
  }
})

$(".header-logo").on('click', function() {
  function colorPicker() {
    var color = "rgb(";
    for (var i = 0; i < 3; i++) {
      color += "" + Math.floor(Math.random() * 256);
      if (i < 2) {
          color+= ',';
      } else {
        color+= ')';
      }
    }
    return color;
  }
  $("body").css("background-color", colorPicker());
})

$("#red").on('click', function() {
  $("body").css("background-color", "red");
})
$("#yellow").on('click', function() {
  $("body").css("background-color", "yellow");
})
$("#green").on('click', function() {
  $("body").css("background-color", "green");
})
$("#purple").on('click', function() {
  $("body").css("background-color", "purple");
})
