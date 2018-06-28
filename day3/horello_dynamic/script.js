"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$(".add-list").on("click", function(event){
  $(".add-list-form-wrapper").removeClass('collapse');
});

$(".add-list-cancel").on("click", function(event){
  $(".add-list-form-wrapper").addClass('collapse');
});

$(".add-list-save").on("click", function(event){
  var title = $(".add-list-form-wrapper input").val();
  var obj = $(`
      <div class="list-container">
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
  $(this).closest(".list-container").before(obj);
  $(".add-list-form-wrapper input").val('');
  $(".add-list-form-wrapper").addClass('collapse');
  $('.list-cards').sortable({
    items: '.card',
    connectWith: '.list-cards'
  });
});

$(".board").on("click", ".add-card", function(event){
  $(this).siblings(".add-card-form-wrapper").removeClass("collapse");
});

$(".board").on("click", ".add-card-cancel", function(event){
  $(this).closest(".add-card-form-wrapper").addClass("collapse");
});

$(".board").on("click", ".add-card-save", function(event){
  var title = $(this).siblings(".form-control").val();
  var obj = $(
    `<div class="card">
        <span class="card-more">
          <span class="glyphicon glyphicon-align-left"></span>
        </span>
        <div class="card-body">${title}</div>
      </div>`);
  $(this).closest(".list-footer").siblings(".list-cards").append(obj);
  $(this).siblings(".form-control").val("");
  $(this).closest(".add-card-form-wrapper").addClass("collapse");
});

var cardBeingEdited = null;

$(".board").on("click", ".card", function(event){
  cardBeingEdited = $(this);
  $("#card-edit-body").val( $(this).children(".card-body").text() );
  $("#card-edit").modal();
});

$(".card-edit-save").on("click", function(event){
  cardBeingEdited.children(".card-body").text( $("#card-edit-body").val() );
  $("#card-edit").modal('toggle');
});

$('.card-edit-cancel').click(function() {
  $('#card-edit-body').val('');
  cardBeingEdited = null;
});

$(".list-cards").sortable({
  items: ".card",
  connectWith: ".list-cards",
});

$(document).on("keydown", function(event){
  if ( event.key === "c" )
  {
    $(".hovering").remove();
  }
})

$(".card").hover( function(event){
  $(this).toggleClass("hovering");
});

$(".header-logo").on("click", function(event){
  if ( $("#theme").attr("href") === "style.css" )
  {
    $("#theme").attr("href", "style2.css");
  }
  else if( $("#theme").attr("href") === "style2.css" )
  {
    $("#theme").attr("href", "style3.css");
  }
  else if( $("#theme").attr("href") === "style3.css" )
  {
    $("#theme").attr("href", "style.css");
  }
});

$("#blue").on("click", function(event){
  $("#theme").attr("href", "style.css");
});

$("#green").on("click", function(event){
  $("#theme").attr("href", "style2.css");
});

$("#purple").on("click", function(event){
  $("#theme").attr("href", "style3.css");
});
