"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(".add-list").click(function () {
  var $this=$(this);
  var parent = $this.closest(".add-list-container");
  var current= parent.children(".add-list-form-wrapper");
  $(current).removeClass('collapse')
})

$(".add-list-cancel").click( function () {
  var $this=$(this);
  var collapse = $this.closest(".add-list-form-wrapper");
  $(collapse).addClass('collapse');
})

$(".board").on("click", ".add-list-save", function () {
  var $this=$(this);
  var inText = $(".add-list-save").siblings("input").val();
  $(".add-list-save").siblings("input").val(null);
  var before = $this.closest(".list-container");
  $(before).before(
    '<div class="list-container">' +
  '<div class="list">' +
    '<div class="list-header">' +
      '<span class="list-title">' + inText + '</span>' +
    '</div>' +
    '<div class="list-cards"></div>' +
    '<div class="list-footer">' +
      '<button class="add-card">Add a card...</button>' +
      '<div class="collapse add-card-form-wrapper">' +
        '<div class="well add-card-form">' +
          '<input type="text" class="form-control" placeholder="Card title">' +
          '<button type="button" class="btn btn-default add-card-save">' +
            'Save' +
          '</button>' +
          '<button type="button" class="btn btn-default add-card-cancel">' +
            '<span class="glyphicon glyphicon-remove"></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '</div>'
  )
$('.add-list-form-wrapper').addClass('collapse');
$('.list-cards').sortable({
  connectWith: ".list-cards"
}).disableSelection()

})

$(".board").on("click", ".add-card",function () {
  var $this=$(this);
  var sib = $this.siblings(".add-card-form-wrapper");
  $(sib).removeClass('collapse')
})
$(".board").on("click",".add-card-cancel",function () {
  var $this=$(this);
  var parent = $this.closest(".add-card-form");
  var current= parent.closest(".add-card-form-wrapper");
  $(current).addClass('collapse');
})

$(".board").on("click", ".add-card-save", function () {
  var $this=$(this);

  var before = $(this).closest(".list");
  var again = $(before).children(".list-cards");
  var inText = $(this).siblings("input").val();
  $(this).siblings("input").val(null);
  $(again).append(
    '<div class="card">'+
    '<span class="card-more">'+
    '<span class="glyphicon glyphicon-align-left">'+'</span>'+
    '</span>'+
    '<div class="card-body">'+inText+'</div>'+
    '</div>'
  );
  $('.add-card-form-wrapper').addClass('collapse');
})


var cardBeingEdited= null;
$(".board").on("click", ".card", function(){
  var $this = $(this);
  cardBeingEdited = $this;
  $("#card-edit").modal();
  var n = $(this).find(".card-body").text();
  $("#card-edit-body").val(n);
})


$("#card-edit").on("click", ".card-edit-save", function(){
  var text = $("#card-edit-body").val();
  console.log(text);
  $(cardBeingEdited).children(".card-body").text(text);
  $("#card-edit").modal('toggle');

})

$('.list-cards').sortable({
  connectWith: ".list-cards"
}).disableSelection()
