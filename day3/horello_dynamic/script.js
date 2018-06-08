"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function(){
  $('.add-list-form-wrapper').removeClass('collapse');
});

$('.add-list-cancel').on('click', function(){
  $('.add-list-form-wrapper').addClass('collapse');
});

$('.add-list-save').on('click', function(){
  var title = $('.add-list-form-wrapper input').val();
  var newElem = $(`<div class="list-container">
                      <div class="list">
                        <div class="list-header">
                          <span class="list-title">${title}</span>
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
  $('.add-list-form-wrapper').closest('.list-container').before(newElem);
  $('.list-cards').sortable({
    connectWith: '.list-cards'
  });
});

$('.board').on('click', '.add-card', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function(){
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.add-card-save', function(){
  var title = $(this).closest('.add-card-form-wrapper').find('input').val();
  console.log(title);
  var newElem = $(`<div class="card">
                      <span class="card-more">
                        <span class="glyphicon glyphicon-align-left"></span>
                      </span>
                      <div class="card-body">${title}</div>
                    </div>`);
  $(this).closest('.list').children('.list-cards').append(newElem);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

var cardBeingEdited = null;
$('.board').on('click', '.card', function(){
  cardBeingEdited = this;
  $('#card-edit').modal();
  var text = $(this).find('.card-body').text();
  $('#card-edit-body').val(text);
});

$('#card-edit').on('click', '.card-edit-save', function(){
  var newText = $('#card-edit-body').val();
  $(cardBeingEdited).find('.card-body').text(newText);
  $('#card-edit').modal('hide');
});

$('.list-cards').sortable({
  connectWith: '.list-cards'
});

$(document).on('keydown', function(e){
  if (e.key === 'c') {
    $('.card :hover').remove();
  }
});

$('.header-logo').on('click', function(){
  // var randomColorChangeA = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  var theme1 = ['#a7a8ea', '#a7b8ea', '#a7c8ea', '#a7d8ea']
  var theme2 = ['#f95c7c', '#f9745c', '#f9a35c', '#f9c35c']
  var theme3 = ['#9f9bff', '#ab9bff', '#b79bff', '#c39bff']
  var toggle = [theme1, theme2, theme3]
  var randomColorChange = toggle[Math.floor(Math.random()*toggle.length)];
  $('header').css('background-color', randomColorChange[0]);
  $('body').css('background-color', randomColorChange[1]);
  $('.list').css('background-color', randomColorChange[2]);
  $('.card').css('background-color', randomColorChange[3]);
});
