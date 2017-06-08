"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(".add-list").on("click", function(){
  $(".add-list-form-wrapper").removeClass("collapse");
})

$(".add-list-cancel").on("click", function(){
  $(".add-list-form-wrapper").addClass("collapse");
})

//var inputVal = $(".add-list-form-wrapper").val();
$(".add-list-save").on("click", function(){
  var inputVal = $(".add-list-form-wrapper").children().children(".form-control").val();
  var inputList = `<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${inputVal}</span>
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

 $('.add-list-container').parent().before(inputList);
 $(".add-list-form-wrapper").addClass("collapse");
})

$(".board").on("click", ".add-card", function(){
  console.log($(this));
  $(this).siblings('.add-card-form-wrapper').removeClass("collapse");
})

$(".board").on("click", ".add-card-cancel", function(){
  $(this).parent().parent('.add-card-form-wrapper').addClass("collapse");
})

//when click SAVE / Adding a card.
$(".board").on("click", ".add-card-save", function(){
  var inputVal = $(this).siblings('.form-control').val();
  var inputNode =
  `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">` + inputVal + `</div>
</div>`;
$(this).parent().parent().parent().siblings(".list-cards").append(inputNode);
$(this).parent().parent('.add-card-form-wrapper').addClass("collapse");
})

var cardBeingEdited = null;
$('.board').on('click', '.card', function(){
  cardBeingEdited = this;
  $('#card-edit').modal();
  //$('#card-edit-body').val() = $(this).find('.card-body').text();
})

$('body').on('click', '.card-edit-save', function(){
  var changed = $(this).closest('.modal-content').find('textarea').val();
  $(cardBeingEdited).children('.card-body').text(changed);
  $('#card-edit').modal('hide');

})

$('.list-container').sortable({
  // Configuration parameters here
  });

$('.list-cards').sortable({
    // Configuration parameters here
    });
