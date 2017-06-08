"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;

$(".add-list").on('click', function(){
  $(".add-list-form-wrapper").toggleClass("collapse");
});

$(".add-list-cancel").on('click', function(){
  $(".add-list-form-wrapper").toggleClass("collapse");
})

$(".add-list-save").on('click', function(){
  var listName = $(this).siblings(".form-control").val();
  var html = $('<div class="list-container">\
  <div class="list">\
    <div class="list-header">\
      <span class="list-title">'+listName+'</span>\
    </div>\
    <div class="list-cards"></div>\
    <div class="list-footer">\
      <button class="add-card">Add a card...</button>\
      <div class="collapse add-card-form-wrapper">\
        <div class="well add-card-form">\
          <input type="text" class="form-control" placeholder="Card title">\
          <button type="button" class="btn btn-default add-card-save">\
            Save\
          </button>\
          <button type="button" class="btn btn-default add-card-cancel">\
            <span class="glyphicon glyphicon-remove"></span>\
          </button>\
        </div>\
      </div>\
    </div>\
  </div>\
</div>');

    $(this).closest('.list-container').before(html);
    $(this).closest(".add-list-form-wrapper").toggleClass("collapse");
    $('.list-cards').sortable({
      connectWith: '.list-cards'
    });
});

$('.board').on('click', '.add-card', function(){
  $(this).siblings(".add-card-form-wrapper").toggleClass("collapse");
});

$('.board').on('click', '.add-card-cancel', function(){
  $(this).parents(".add-card-form-wrapper").toggleClass("collapse");
});

$('.board').on('click', '.add-card-save', function(){
  var cardTitle = $(this).siblings(".form-control").val();
  var html = $(
    '<div class="card">\
      <span class="card-more">\
        <span class="glyphicon glyphicon-align-left"></span>\
      </span>\
      <div class="card-body">' + cardTitle + '</div>\
    </div>'
  );
  $(this).parents(".list-footer").siblings(".list-cards").append(html);
  $(this).parents(".add-card-form-wrapper").toggleClass("collapse");
});

$(".board").on('click', '.card', function(){
  cardBeingEdited = this;
  $("#card-edit").modal();
  var cardName = $(this).find(".card-body").text();
  $('#card-edit-body').val(cardName);
});

$(".card-edit-save").on('click', function(){
  var newCardName = $('#card-edit-body').val();
  $(cardBeingEdited).find(".card-body").text(newCardName);
  $("#card-edit").modal('toggle');
});

$('.list-cards').sortable({
  connectWith: '.list-cards'
});

var themes = [['rgb(0,121,191)'],['rgb(30,40,50)'],['DarkSalmon'],['LightCyan']];
var themeIndex = 0;

$(document).on("keydown", function(event){
  var key = event.key;
  if(key === 'c'){
    $('.card:hover').remove();
  }
});

$(".header-logo-default").on('click', function(){
  themeIndex++;
  if(themeIndex>themes.length-1){
    themeIndex=0;
  }
  $('body').css("background-color", themes[themeIndex][0]);
});
