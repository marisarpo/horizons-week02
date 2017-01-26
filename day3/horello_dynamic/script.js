"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var collapsedList = true;

$('.add-list').click(function() {
  if(collapsedList) {
    $('.add-list-form-wrapper').show('fast');
    collapsedList = false;
  } else {
    $('.add-list-form-wrapper').hide('fast')
    collapsedList = true;
  }
})

$('.add-list-cancel').click(function() {
  $('.add-list-form-wrapper').hide('fast');
  collapsedList = true;
})

$('.add-list-save').click(function () {
  var title = $('.add-list-form-wrapper').find('input').val();
  var newList = $('<div class="list-container"> <div class="list"> <div class="list-header"> <span class="list-title">' + title + '</span> </div> <div class="list-cards"></div> <div class="list-footer"> <button class="add-card">Add a card...</button> <div class="collapse add-card-form-wrapper"> <div class="well add-card-form"> <input type="text" class="form-control" placeholder="Card title"> <button type="button" class="btn btn-default add-card-save"> Save </button> <button type="button" class="btn btn-default add-card-cancel"> <span class="glyphicon glyphicon-remove"></span> </button> </div> </div> </div> </div> </div>');
  $('.add-list-form-wrapper').closest('.list-container').before(newList);
  $('.add-list-form-wrapper').hide();
  collapsedList = true;
  $(this).siblings('input').val('');
  $('.list-cards').sortable({
    connectWith: '.list-cards'
  })
})

// $('.add-card').click(function() {
//   $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
// })
//
// $('.add-card-cancel').click(function() {
//   $(this).parent().parent().addClass('collapse');
// })

// $('.add-card-save').click(function () {
//   var title = $(this).parent().parent().find("input").val();
//   var newCard = $('<div class="card"> <span class="card-more"> <span class="glyphicon glyphicon-align-left"></span> </span> <div class="card-body">' + title + '</div> </div>');
//   $(this).parent().parent().parent().siblings('.list-cards').append(newCard);
//   $(this).siblings('input').val('');
//   $(this).parent().parent().addClass('collapse');
// })

var collapsedCard = true;

$('.board').on('click', '.add-card', function() {
  if(collapsedCard) {
    $(this).siblings('.add-card-form-wrapper').show('fast');
    collapsedCard = false;
  } else {
    $(this).siblings('.add-card-form-wrapper').hide('fast');
    collapsedCard = true;
  }
})

$('.board').on('click', '.add-card-save', function() {
  var title = $(this).parent().parent().find("input").val();
  var newCard = $('<div class="card"> <span class="card-more"> <span class="glyphicon glyphicon-align-left"></span> </span> <div class="card-body">' + title + '</div> </div>');
  $(this).parent().parent().parent().siblings('.list-cards').append(newCard);
  $(this).siblings('input').val('');
  $(this).parent().parent().hide();
  collapsedCard = true;
})

$('.board').on('click', '.add-card-cancel', function() {
  $(this).parent().parent().hide('fast');
  collapsedCard = true;
})

var cardBeingEdited = null;
$('.board').on('click', '.card', function() {
  cardBeingEdited = this;
  $('#card-edit').modal();
  $('#card-edit-body').val($(this).find('.card-body').text());
})

$('.card-edit-save').click(function() {
  var newText = $('#card-edit-body').val();
  $(cardBeingEdited).children('.card-body').text(newText);
  $('#card-edit').modal('toggle');
})

$('.list-cards').sortable({
  connectWith: '.list-cards'
})

$('.board').sortable({
})

$('html').keydown(function(event) {
  if(event.which === 46) {
    var currentCard = $(':hover').eq(6)
    if($(':hover').eq(6).is('.card')) {
      currentCard.remove();
    }
  }
})

// var themeArray = ['blue', 'yellow', 'red', 'green'];
// var currentTheme = 0;
//
// $('.header-logo-default').click(function () {
//   currentTheme += 1;
//   $('body').css('background-color', themeArray[currentTheme%4]);
// })

// $('.dropdown-item').css('width', '0px');
$('.dropdown-menu').css('width', '0px');
// $('.dropdown-item').css('height', '0px');

var currentWidth = 0;

$('.header-logo').click(function() {
  if(currentWidth === 0) {
    $('.dropdown-menu').css('width', '750px');
    currentWidth = 750;
  // $('.dropdown-item').css('height', '30px');
  } else {
    $('.dropdown-menu').css('width', '0px');
    currentWidth = 0;
  }
})

$('#blueButton').hide();

$('#blueButton').click(function() {
  $('head').find('#favicon').attr('href', 'img/faviconblue.png');
  $('body').css('background-color', 'rgb(0,121,191)');
  $('.dropdown-menu').css('width', '0px');
  currentWidth = 0;
  setTimeout(function() {
    $('.dropdown-item').show();
    $('#blueButton').hide();
  }, 500)
})

$('#redButton').click(function() {
  $('head').find('#favicon').attr('href', 'img/faviconred.png');
  $('body').css('background-color', '#c0392b');
  $('.dropdown-menu').css('width', '0px');
  currentWidth = 0;
  setTimeout(function() {
    $('.dropdown-item').show();
    $('#redButton').hide();
  }, 500)
})

$('#greenButton').click(function() {
  $('head').find('#favicon').attr('href', 'img/favicongreen.png');
  $('body').css('background-color', '#27ae60');
  $('.dropdown-menu').css('width', '0px');
  currentWidth = 0;
  setTimeout(function() {
    $('.dropdown-item').show();
    $('#greenButton').hide();
  }, 500)
})

$('#orangeButton').click(function() {
  $('head').find('#favicon').attr('href', 'img/faviconorange.png');
  $('body').css('background-color', '#e67e22');
  $('.dropdown-menu').css('width', '0px');
  currentWidth = 0;
  setTimeout(function() {
    $('.dropdown-item').show();
    $('#orangeButton').hide();
  }, 500)
})

$('#yellowButton').click(function() {
  $('head').find('#favicon').attr('href', 'img/faviconyellow.png');
  $('body').css('background-color', '#f1c40f');
  $('.dropdown-menu').css('width', '0px');
  currentWidth = 0;
  setTimeout(function() {
    $('.dropdown-item').show();
    $('#yellowButton').hide();
  }, 500)
})

$('#purpleButton').click(function() {
  $('head').find('#favicon').attr('href', 'img/faviconpurple.png');
  $('body').css('background-color', '#9b59b6');
  $('.dropdown-menu').css('width', '0px');
  currentWidth = 0;
  setTimeout(function() {
    $('.dropdown-item').show();
    $('#purpleButton').hide();
  }, 500)
})
