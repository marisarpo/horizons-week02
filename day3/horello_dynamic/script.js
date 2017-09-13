"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function(){
  var cardBeingEdited = null;
  $('.list-container').on('click', '.add-list', function(){
    $('.add-list-form-wrapper').removeClass('collapse');
  });
  $('.list-container').on('click', '.add-list-cancel', function(){
    $('.add-list-form-wrapper').addClass('collapse')
  });

  $('.list-container').on('click', '.add-list-save', function(){
    var listTitle = $(this).siblings('.add-list-form-wrapper input').val();

    var newHTML = `<div class="list-container">
      <div class="list">
        <div class="list-header">
          <span class="list-title">`+ listTitle + `</span>
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
    </div>`;

    $(this).closest('.list-container').before(newHTML);
    $(this).closest('.add-list-form-wrapper').addClass('collapse');
    $('.board .list-cards').sortable({
      connectWith: ".board .list-cards"
    }).disableSelection();
  });
  //add card
  $('.board').on('click', '.add-card', function(e){
    // $(this).
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  })
  $('.board').on('click', '.add-card-cancel', function(e){
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  })
  $('.board').on('click', '.add-card-save', function(e){
    var cardTitle = $(this).siblings('input').val();

    var cardInfo = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">`+ cardTitle +`</div>
</div>`;
  $(this).closest('.list-footer').siblings('.list-cards').append(cardInfo);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

  $('.board').on('click', '.card', function(){
    cardBeingEdited = $(this);
    $('#card-edit').modal();
    $('#card-edit-body').val(cardBeingEdited.find('.card-body').text());
  });

  $(document).on('click', '.card-edit-save', function(e){
    var newText = $('#card-edit-body').val();
    cardBeingEdited.find('.card-body').html(newText);
    $('#card-edit').modal('toggle');
  });

  $('.board .list-cards').sortable({
    connectWith: ".board .list-cards"
  }).disableSelection();

  //Key listen

  $(document).keydown(function(e){
    if(String.fromCharCode(e.which) ==='C'){
      $('.board').find('.card:hover').remove();
    }
  })
  $(document).on('change', '#sel1', function(e){
    var themeVal = $(this).val();
    console.log(themeVal);
    switch(themeVal){
      case "first":
        $('#body-wrapper').attr('class', 'default');
        $('.add-card, .list-title').css('color', 'black');
        $('.add-card').css('background', 'rgba(16, 16, 16, 0.15)');
        $('.list').css('background', '#c2c4c6');
        $('.add-list').css('color', 'white');
        $('.add-list').css('background', '#006aa8');
        break;
      case "second":
        $('#body-wrapper').attr('class', 'second');
        $('.add-card, .list-title').css('color', 'white');
        $('.list').css('background', '#2980b9');
        $('.add-list').css('color', 'white');
        $('.add-list').css('background', '#1abc9c')
        break;
      case "third":
        $('#body-wrapper').attr('class', 'third');
        $('.add-card, .list-title').css('color', 'white');
        $('.list').css('background', '#c0392b');
        $('.add-list').css('color', 'white');
        $('.add-list').css('background', '#f39c12')
        break;
      case "fourth":
        $('#body-wrapper').attr('class', 'fourth');
        $('.add-card, .list-title').css('color', 'white');
        $('.list').css('background', '#9b59b6');
        $('.add-list').css('color', 'white');
        $('.add-list').css('background', '#2980b9')
      default:
        // $('#body-wrapper').attr('class', 'default')
    }
  })


})
