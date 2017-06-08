"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function() {

  $(".add-list").on("click", function(){
    $('.add-list-form-wrapper').removeClass('collapse')
  })


  $(".add-list-cancel").on("click", function(){
    $('.add-list-form-wrapper').addClass('collapse')
  })


  $(".add-list-save").on("click", function(){
    var title = $('.add-list-form-wrapper').children().eq(0).children(0).val()

    var listHTML = $('\
    <div class="list-container"> \
      <div class="list">\
        <div class="list-header">\
          <span class="list-title">LIST TITLE GOES HERE</span>\
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
    </div>\
    ')
    listHTML.children().eq(0).children().eq(0).text(title);

    $(".add-list-form-wrapper").parent().parent().before(listHTML)
    $(".list-cards").sortable({connectWith: ".list-cards"}).disableSelection();
  })


  $('.board').on('click', '.add-card', function() {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  })
  $('.board').on('click', '.add-card-cancel', function() {
    $(this).parent().parent().addClass('collapse');
  })
  $('.board').on('click', '.add-card-save', function() {
    var title = $(this).parent().find("input").val()

    var card = $('\
    <div class="card">\
      <span class="card-more">\
        <span class="glyphicon glyphicon-align-left"></span>\
      </span>\
      <div class="card-body">CARD TITLE HERE</div>\
    </div>`\
    ')

    card.children().eq(1).text(title)
    $(this).closest(".list").children().eq(1).append(card);
    $(this).parent().parent().addClass('collapse');
  })



  var cardBeingEdited = null

  $(".board").on("click", ".card", function() {
    cardBeingEdited = $(this);
    $("#card-edit").modal("toggle");
    $("#card-edit-body").val(cardBeingEdited.find(".card-body").text())
  })

  $(".modal").on("click", ".card-edit-save", function() {
    cardBeingEdited.find(".card-body").text($("#card-edit-body").val());
    $("#card-edit").modal("hide");
  })


  $(".list-cards").sortable({connectWith: ".list-cards"}).disableSelection();
  $(".board").sortable()

})
