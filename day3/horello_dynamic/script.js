"use strict";

$(document).ready(function(){
  $('.add-list').on('click',function(){
  $('.add-list-form-wrapper').removeClass('collapse');
  })

  $('.add-list-cancel').on('click',function(){
  $('.add-list-form-wrapper').addClass('collapse');
  })

  $('.add-list-save').on('click',function(){
      var listName = $(this).siblings('input.form-control').val()
      $(this).siblings('input.form-control').val('');

      $(this).closest('.list-container').before($('<div class="list-container">\
        <div class="list">\
      <div class="list-header">\
        <span class="list-title">'+ listName +'</span>\
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
  </div>'));
  $('.add-list-form-wrapper').addClass('collapse');
  })

  //OPEN ADD CARD
  $('.board').on('click','.add-card',function(){
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse')
  })

  //CANCEL
  $('.board').on('click','.add-card-cancel',function(){
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  })

  //SAVE
  $('.board').on('click','.add-card-save',function(){
    var cardTitle = $(this).siblings('input.form-control').val()
    $(this).siblings('input.form-control').val('');

    $(this).closest('.list').append($(
          '<div class="card">\
      <span class="card-more">\
        <span class="glyphicon glyphicon-align-left"></span>\
      </span>\
      <div class="card-body">'+ cardTitle +'</div>\
    </div>'
        ))

    $(this).closest('.add-card-form-wrapper').addClass('collapse')
  })

  var cardBeingEdited = null;
  $('.board').on('click','.card',function(){
    cardBeingEdited = $(this);

    $('#card-edit').modal()
    $('#card-edit-body').val(cardBeingEdited.find(".card-body").text())

  })

  $('.card-edit-save').on('click',function(){
    var card = $(this).closest('.modal')
    var newText = card.find('#card-edit-body').val()

     cardBeingEdited.find(".card-body").text(newText)
  })

  $('.list-cards').sortable({
    // // Getter
    // var appendTo = $('.list-cards').sortable( "option", "appendTo" );
    //
    // // Setter
    // $(".list-cards").sortable( "option", "appendTo", document.body );
    revert: false,
    items: '.card',
    connectWith: '.list-cards'
  });

})
