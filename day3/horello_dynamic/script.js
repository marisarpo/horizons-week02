"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$('.add-list').on("click", function(){
	$('.add-list-form-wrapper').removeClass('collapse')
});


$('.add-list-cancel').on("click",function(){
	$('.add-list-form-wrapper').addClass('collapse')
});

$('.add-list-save').on("click",function(){
	var input= $('.add-list-form-wrapper input').val();
	//console.log(input);
	$(".list-container").last().before(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">`+input+`</span>
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
</div>`)
	$('.add-list-form-wrapper input').val('')
	$('.add-list-form-wrapper').addClass('collapse')

})

$('.board').on('click', '.add-card', function() {
	//console.log($(this).siblings('add-card-form-wrapper'))
	$(this).siblings('.add-card-form-wrapper').removeClass("collapse")//
})

$('.board').on('click', '.add-card-cancel', function() {
	//console.log($(this).siblings('add-card-form-wrapper'))
	//($(this)).siblings('add-card-form-wrapper').removeClass("collapse")//
	var $this = $(this);
 	var cardWrapper = $this.closest('.add-card-form-wrapper');
 	cardWrapper.addClass('collapse');
})

$('.board').on('click','.add-card-save',function(){

	var input= $(this).siblings("input").val();
	//console.log(input);
	//var rando=$(this).closest(".list-footer").siblings(".list-cards");
	$(this).closest(".list-footer").siblings(".list-cards").append(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">`+input+`</div>
</div>`)
	$(this).closest(".add-card-form-wrapper input").val('');
	$(this).closest(".add-card-form-wrapper").addClass('collapse');

})


var cardBeingEdited=null;

$('.board').on('click','.card',function(){
	cardBeingEdited=$(this);
	$("#card-edit").modal();
	var rando=cardBeingEdited.find(".card-body").text();
	$("#card-edit-body").val(rando);

})

$('.card-edit-save').on('click',function(){
	console.log("running");
	$("#card-edit-body").val(rando);
})















