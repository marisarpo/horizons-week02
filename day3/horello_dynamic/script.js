"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function(){
  var cardBeingEdited = null
  $('.add-list').on('click', function() {
    $('.add-list-form-wrapper').removeClass('collapse')
  })

  $('.add-list-cancel').on('click', function() {
    $(this).siblings('input').val('')
    $('.add-list-form-wrapper').addClass('collapse')
  })

  $('.add-list-save').on('click', function() {
    var title = $('.add-list-form-wrapper input').val()
    var listHtml = `<div class="list-container">
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

    var newList = $(listHtml)
      $(this).closest('.list-container').before(newList)
      $(this).siblings('input').val('')
      $('.add-list-form-wrapper').addClass('collapse')
  })

  $('.board').on('click', '.add-card', function() {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse')
  })

  $('.board').on('click', '.add-card-cancel', function() {
    $(this).siblings('input').val('')
    $(this).closest('.add-card-form-wrapper').addClass('collapse')
  })

  $('.board').on('click', '.add-card-save', function() {
    var title = $(this).siblings('input').val()
    var cardHtml = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${title}</div>
</div>`

    var newCard = $(cardHtml)
    $(this).closest('.list-container').find('.list-cards').append(newCard)
    $(this).siblings('input').val('')
    $('.add-card-form-wrapper').addClass('collapse')
  })

  $('.board').on('click', '.card', function() {
    cardBeingEdited = $(this)
    $('#card-edit').modal()
    var body = cardBeingEdited.find('.card-body').text()
    $('#card-edit-body').val(body)
  })

  $('.card-edit-save').on('click', function() {
    var newBody = $('#card-edit-body').val()
    cardBeingEdited.find('.card-body').text(newBody)

    $('#card-edit').modal('hide')
    $('#card-edit-body').val('')
    cardBeingEdited = null
  })

  $('.list-cards').sortable({
    connectWith: '.list-cards'
  })

  $(document).on('keydown', function(event) {
    if (event.keyCode === 67) {
      $('.card:hover').remove()
    }

  })

})
