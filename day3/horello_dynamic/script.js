"use strict";
var cardBeingEdited = null;

$(document).ready(function(){

  $('.add-list').on('click', function(){
    $('.add-list-form-wrapper').removeClass('collapse');
  })

  $('.add-list-cancel').on('click', function(){
    $('.add-list-form-wrapper').addClass('collapse');
  })

  $('.add-list-save').on('click', function(){
    var title = $('.add-list-form-wrapper input').val();

    var listC = $('<div>');
    listC.addClass('list-container');

    var list = $('<div>');
    list.addClass('list');
    listC.append(list);

    var listHead = $("<div>");
    listHead.addClass("list-header");
    listHead.append("<span class = 'list-title'>" +title+ "</span>");
    list.append(listHead);
    list.append("<div class=\"list-cards\"></div> <div class=\"list-footer\"><button class=\"add-card\">Add a card...</button> <div class=\"collapse add-card-form-wrapper\"><div class=\"well add-card-form\"><input type=\"text\" class=\"form-control\" placeholder=\"Card title\"><button type=\"button\" class=\"btn btn-default add-card-save\">Save</button><button type=\"button\" class=\"btn btn-default add-card-cancel\"><span class=\"glyphicon glyphicon-remove\"></span></button></div></div></div>");


    $('.add-list-container').parent().before(listC);
    var title = $('.add-list-form-wrapper input').val('');
    $('.add-list-form-wrapper').addClass('collapse');

    $('.list-cards').sortable({
       connectWith: '.list-cards'
    });
  })

  $('.board').on('click','.add-card', function(){
    var curList = $(this).siblings('.add-card-form-wrapper');
    curList.removeClass('collapse');
  })

  $('.board').on('click','.add-card-cancel', function(){
    var curList = $(this).parent();
    $(this).siblings('input').val('');
    curList.parent().addClass('collapse');
  })

  $('.board').on('click', '.add-card-save', function(){
    var curList = $(this).parent();
    var title = $(this).siblings('input').val();
    var card = $("<div class=\"card\"><span class=\"card-more\"><span class=\"glyphicon glyphicon-align-left\"></span></span><div class=\"card-body\">" + title + "</div></div>");
    $(this).parent().parent().parent().siblings('.list-cards').append(card);
    $(this).siblings('input').val('');
    curList.parent().addClass('collapse');

  })

  $('.board').on('click', '.card', function(){
    cardBeingEdited = $(this);
    $('#card-edit-body').val(cardBeingEdited.children('.card-body').text());
    $('#card-edit').modal();
  })

  $('#card-edit').on('click', '.card-edit-save', function(){
    var save = $(this).parent().siblings('.modal-body').children('#card-edit-body').val();
    console.log(save);
    cardBeingEdited.children('.card-body').text(save);
    $('#card-edit').modal('toggle');
  })

  $('.list-cards').sortable({
     connectWith: '.list-cards'
  });
})
