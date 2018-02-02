"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(".add-list").on("click", function() {
	$('.add-list-form-wrapper').toggleClass('collapse');
})

$(".add-list-cancel").on("click", function() {
	$('.add-list-form-wrapper').addClass('collapse');
})


$(".add-list-save").on("click", function() {
	var listName = $(this).siblings('input').val();
	$(this).parents(".list-container").before(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">` + listName + `</span>
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
	$(this).siblings('input').val("");
	$('.add-list-form-wrapper').addClass('collapse');
	$('.list-cards').sortable({
  	items: '.card',
  	connectWith: ".list-cards"
 	});
})

$('.board').on('click', '.add-card', function() {
	$(this).siblings('.add-card-form-wrapper').toggleClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
	$(this).parents('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
	var cardName = $(this).siblings('input').val();
	console.log(cardName);
	$(this).closest(".list-footer").siblings('.list-cards').append(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">` + cardName + `</div>
</div>`);
	$(this).siblings('input').val("");
	$(this).parents('.add-card-form-wrapper').addClass('collapse');
})

var cardBeingEdited = null;

$('.board').on('click', '.card', function() {
	cardBeingEdited = $(this);
	$("#card-edit").modal();
	$("#card-edit-body").val(cardBeingEdited.children(".card-body").text());
})

$('.card-edit-save').on('click', function() {
	cardBeingEdited.find('.card-body').text($("#card-edit-body").val());
	$("#card-edit").modal('toggle');
})

$('.list-cards').sortable({
  // Configuration parameters hereox
  items: '.card',
  connectWith: ".list-cards"
 });


// $(".board :hover").keydown(function(event) {
// 	console.log(event);

	
// });
var cardBeingHovered = null;


$(".board").on("mouseover", ".card", function(e){
	cardBeingHovered = $(this);
	//cardBeingHovered.remove();
});

$("body").keydown(function(event){
	if (event.key === "c") {
	cardBeingHovered.remove();
	}
});


