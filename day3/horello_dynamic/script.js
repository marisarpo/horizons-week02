"use strict";
$(document).ready(function(){
  var cardBeingEdited = null;
  var hoveredCard = null;
  $('.add-list').on('click',function(){
    $('.add-list-form-wrapper').removeClass('collapse');
  })
  $('.add-list-cancel').on('click',function(){
    $('.add-list-form-wrapper').addClass('collapse');
  })
  $('.add-list-save').on('click',function(){
    var title = $(this).prev().val();
    var text = `<div class="list-container">
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
                </div>`
      var parent = $(this).closest('.list-container');
      parent.before(text);
      $(function(){$('.list-cards').sortable({
        connectWith:'.list-cards'
      }).disableSelection();
    });
  })
  $('.board').on('click','.add-card',function(){
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  })
  $('.board').on('click','.add-card-cancel',function(){
    $(this).siblings('.add-card-form-wrapper').addClass('collapse');
  })
  $('.board').on('click', '.add-card-save', function() {
    var title = $(this).prev().val();
    var listCards = $(this).closest('.list-footer').prev();
    //console.log(listCards);
    //console.log($(this));
    var text = `<div class="card">
                  <span class="card-more">
                    <span class="glyphicon glyphicon-align-left"></span>
                  </span>
                  <div class="card-body">${title}</div>
                </div>`
    listCards.append(text);
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  })
  $('.board').on('click', '.card', function() {
    cardBeingEdited = $(this);
    $('#card-edit').modal();
    $('#card-edit-body').val($(this).find('.card-body').text())
    $('.card-edit-save').on('click', function(){
      var uncle_data = $(this).closest('.modal').find('#card-edit-body').val();
      cardBeingEdited.find('.card-body').text(uncle_data)
      $('#card-edit').modal('hide');
    })
  })
  $(function(){$('.list-cards').sortable({
    connectWith:'.list-cards'
    }).disableSelection();
  });
  $(document).on('keydown',function(e){
    var newCode = e.keyCode;
    if (newCode === 67){
    $('.card:hover').remove();
    }
  })
var clicks = 0;
var cssBackArray = ['rgb(0,0,0)','rgb(0,121,191)'];
var cssListArray = ['#fff','#e2e4e6']
  $('.header-logo').on('click',function(){
    $(this).closest('body').css('background-color', cssBackArray[clicks])
    $(this).closest('.list').css('background', cssListArray[clicks])
    clicks++;
    if( clicks == 2){
      clicks = 0;
    }
  })




})
