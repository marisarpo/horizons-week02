"use strict";



// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEditted;

$(".add-list").on("click", function() {
	var $this = $(this);
	$this.parent().children(".add-list-form-wrapper").removeClass("collapse");
})

$(".add-list-cancel").on("click", function() {
	var $this = $(this);
	$this.parent().parent().addClass("collapse");	
})

$(".add-list-save").on("click", function() {
	var $this = $(this);
	var newListTitle = $this.siblings("input").val();
	$this.siblings("input").val("");

	var newListEle = $("<div class='list-container'><div class='list'><div class='list-header'><span class='list-title'>"
										+ newListTitle +"</span></div>"
    								+"<div class='list-cards'></div><div class='list-footer'><button class='add-card'>Add a card...</button>"
    								+"<div class='collapse add-card-form-wrapper'><div class='well add-card-form'>"
          					+"<input type='text' class='form-control' placeholder='Card title'>"
          					+"<button type='button' class='btn btn-default add-card-save'>Save</button>"
          					+"<button type='button' class='btn btn-default add-card-cancel'>"
            				+"<span class='glyphicon glyphicon-remove'></span></button></div></div></div></div></div>");

	$(".add-list-form-wrapper").parent().parent().before(newListEle);
	$this.parent().parent().addClass("collapse");


$('.list-cards').sortable({
	connectWith:".list-cards"

});
});

$('.board').on('click', '.add-card', function() {
	var $this = $(this);
	$this.siblings('.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function() {
	var $this = $(this);
	$this.parent().parent().addClass("collapse");
});

$('.board').on('click', '.add-card-save', function() {
	var $this = $(this)
	var newTitleCard = $this.siblings("input").val()
	$this.siblings("input").val("")

	var newCardEle = $(`<div class="card">
											  <span class="card-more">
											    <span class="glyphicon glyphicon-align-left"></span>
											  </span>
											  <div class="card-body">${newTitleCard}</div>
											</div>`);

	$this.parent().parent().parent().siblings(".list-cards").append(newCardEle);

	$this.parent().parent().addClass("collapse");
$('.list-cards').sortable({
	connectWith:".list-cards"

});

});

$('.board').on('click', '.card', function() {
	cardBeingEditted = $(this);

	$(".modal").find("#card-edit-body").val(cardBeingEditted.find(".card-body").text());
	$("#card-edit").modal();
});

$(".modal").on('click', '.card-edit-save', function() {
	cardBeingEditted.find(".card-body").text( $("#card-edit-body").val() );
});

// $('.card').addClass(".sortable");
$('.list-cards').sortable({
	connectWith:".list-cards"

});


