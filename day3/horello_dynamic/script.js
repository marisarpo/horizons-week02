"use strict";

$(document).ready(function() {

  $('.add-list').on('click', function(){

    $('.add-list-form-wrapper').removeClass('collapse');

  })

  $('.add-list-cancel').on('click', function() {

    $('.add-list-form-wrapper').addClass('collapse');

  })

  $('.add-list-save').on('click', function() {

    $('.add-list-form-wrapper').addClass('collapse');

    var listTitle = $(this).closest('.add-list-form-wrapper').children().children('input').val();


    var newList = $('<div class="list-container"> <div class="list"> <div class="list-header"> <span class="list-title">' + listTitle + '</span> </div> <div class="list-cards"></div> <div class="list-footer"> <button class="add-card">Add a card...</button> <div class="collapse add-card-form-wrapper"> <div class="well add-card-form"> <input type="text" class="form-control" placeholder="Card title"> <button type="button" class="btn btn-default add-card-save">Save </button> <button type="button" class="btn btn-default add-card-cancel"> <span class="glyphicon glyphicon-remove"></span> </button> </div> </div> </div> </div> </div>')

    $(this).closest('.list-container').before(newList);

    $('.list-cards').sortable({

      connectWith: '.list-cards'

    });

  })

  $('.board').on('click', '.add-card', function(){

    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');

  })

  $('.board').on('click', '.add-card-cancel', function(){

    $(this).siblings('input').val(null);
    $(this).closest('.add-card-form-wrapper').addClass('collapse');

  })

  $('.board').on('click', '.add-card-save', function() {

    $(this).closest('.add-card-form-wrapper').addClass('collapse');

    var cardName = $(this).closest('.add-card-form-wrapper').children().children('input').val();

    var newCard = $('<div class="card"> <span class="card-more"> <span class="glyphicon glyphicon-align-left"></span> </span> <div class="card-body">' + cardName + '</div> </div>')

    $(this).parent().parent().parent().siblings('.list-cards').append(newCard);
    $(this).siblings('input').val(null);

  })

  var cardBeingEditied = null;

  $('.board').on('click', '.card', function() {

    cardBeingEditied = this;

    $('#card-edit').modal();

    $('#card-edit-body').val($(this).find('.card-body').text());




  })

  $('.card-edit-save').on('click', function() {


    var newContents = $('#card-edit-body').val();

    $(cardBeingEditied).find('.card-body').text(newContents);

    $('#card-edit').modal('toggle');

    cardBeingEditied = null;
  })

  $(".board").sortable({


  });



  $('.list-cards').sortable({

    connectWith: '.list-cards'

  });



  $(window).on('keydown', function() {
    console.log("did it");

    var keyDown = event.which;

    var letter = String.fromCharCode(keyDown);
    console.log(letter)

    if (letter === 'C') {
      $('.card:hover').remove()
    }


  })



})
