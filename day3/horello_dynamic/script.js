"use strict";

$( document ).ready(function() {


  $(".add-list").on("click", function() {
    $(".add-list-form-wrapper").removeClass("collapse")
  });

  $(".add-list-cancel").on("click", function() {
    $(".add-list-form-wrapper").addClass("collapse")
  });





   $(".add-list-save").on("click", function() {
    var written = $(".add-list-form-wrapper .form-control").val();

    var currentContainer = $(this).closest('.list-container')
    var newComment = $(`
    <div class="list-container">
      <div class="list">
        <div class="list-header">
          <span class="list-title"> ${written} </span>
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
    </div>
    `)

    currentContainer.before(newComment)
  });


  $('.board').on('click', '.add-card', function() {
    $(this).siblings(".add-card-form-wrapper").removeClass("collapse")
})

$('.board').on('click', '.add-card-cancel', function() {
  $(this).closest(".add-card-form-wrapper").addClass("collapse")
});

$(".add-card-save").on("click", function() {
   var written = $(".add-card-form-wrapper .form-control").val();
   var $this = $(this);
   var currentContainer = $this.closest('.card-container')

   var newComment = $(`
    <div class="card">
      <span class="card-more">
        <span class="glyphicon glyphicon-align-left"></span>
      </span>
      <div class="card-body"> ${written} </div>
    </div>
   `)

   currentContainer$.append(newComment)
 });







  });
