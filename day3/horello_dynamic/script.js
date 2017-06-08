"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var title2;
var p1 = `<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">`
var p2 = `</span>
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
var c1 = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">`

var c2 = `</div>
</div>`

$(".add-list").click( function(){
$('.add-list-form-wrapper').removeClass('collapse')
})

$(".add-list-cancel").click( function(){
$('.add-list-form-wrapper').addClass('collapse')
})

var title;
$(".add-list-save").click( function(){
 title = $('.add-list-form-wrapper').find('.form-control').val();
$(this).closest('.list-container').before(p1 + title + p2)
$('.add-list-form-wrapper').addClass('collapse')
})

$('.board').on('click', '.add-card', function() {
  $(this).siblings().removeClass('collapse')
})

$('.board').on('click', '.add-card-cancel', function() {
  $(this).parent().parent().addClass('collapse')

})

$('.board').on('click', '.add-card-save', function() {
title2 = $(this).siblings('.form-control').val();
$(this).closest('.list-footer').siblings('.list-cards').append(c1 + title2 + c2)
$('.add-card-form-wrapper').addClass('collapse')
})

var cardBeingEdited = null;

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this)

// #card-edit-body

$('#card-edit-body').val(cardBeingEdited.find('.card-body').text())
  $("#card-edit").modal()
})
