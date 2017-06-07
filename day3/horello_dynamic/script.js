"use strict";

$(document).ready(function(){

  $('.add-list').on('click', function(){
    $('.add-list-form-wrapper').removeClass('collapse')
  })

  $('.add-list-cancel').on('click', function(){
    $('.add-list-form-wrapper').addClass('collapse')
  })



  $('.add-list-save').on('click', function(){
    var title = $('.add-list-form-wrapper input').val();
    var newList = $(
      '<div class="list-container">'+
      '<div class="list">'+
      '<div class="list-header">'+
      '<span class="list-title">'+title+'</span>'+
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
      '</button>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>');
      $('.add-list-container').parent().before(newList);
      $('.add-list-form-wrapper').addClass('collapse');
      $('.list-cards').sortable({
        connectWith:'.list-cards',

      });
    })

    $('.board').on('click', '.add-card', function() {
      $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
    })

    $('.board').on('click', '.add-card-cancel', function() {
      $(this).parent().parent().addClass('collapse');
    })

    $('.board').on('click', '.add-card-save', function() {
      var title = $(this).siblings('input').val();
      var newCard = $(
        '<div class="card">'+
        '<span class="card-more">'+
        '<span class="glyphicon glyphicon-align-left"></span>'+
        '</span>'+
        '<div class="card-body">'+title+'</div>'+
        '</div>');
        $(this).parent().parent().parent().siblings('.list-cards').append(newCard);
        $('.add-card-form-wrapper').addClass('collapse');
      })

      var cardBeingEdited = null;

      $('.board').on('click', '.card', function(){
        cardBeingEdited = $(this);
        $('#card-edit-body').val(cardBeingEdited.children('.card-body').text());
        $('#card-edit').modal();
      })

      $('#card-edit').on('click', '.card-edit-save', function(){
        var save = $(this).parent().siblings('.modal-body').children('#card-edit-body').val();
        cardBeingEdited.children('.card-body').text(save);
        $('#card-edit').modal('toggle');
      })


      $('.list-cards').sortable({
        connectWith:'.list-cards',
      });




    })
