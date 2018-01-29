"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$('.board').on('click', '.add-list', function() {
    // this works but you don't need to go up the tree, just use sibling:   
    var containerDiv =$(this).closest(".add-list-container");
    var wrapperDiv = containerDiv.children(".add-list-form-wrapper");

    // get the sibling of add-list, add-list-form-wrapper:
    // var wrapperDiv = $(this).siblings(".add-list-form-wrapper");
    console.log(wrapperDiv);
    wrapperDiv.removeClass('collapse'); 
});

$('.board').on('click', '.add-list-cancel', function() {    
    // go from add-list-cancel -> wrapper:
    var containerDiv =$(this).closest(".add-list-container");
    var wrapperDiv = containerDiv.children(".add-list-form-wrapper");

    // var wrapperDiv = $(this).siblings(".add-list-form-wrapper");    
    wrapperDiv.addClass('collapse'); 
});

//add-list-container
$('.board').on('click', '.add-list-save', function() {   
    // go from add-list-cancel -> wrapper:
    var containerDiv =$(this).closest(".add-list-container");
    var wrapperDiv = containerDiv.children(".add-list-form-wrapper");
    

    var input = wrapperDiv.find("input").eq(0).val();    

    wrapperDiv.closest(".list-container").before(newList(input));
    wrapperDiv.addClass('collapse'); 
    $(".list-cards").sortable({
        items: ".card",
        connectWith: ".list-cards",
    });
});


function newList(title){
    return `<div class="list-container">
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
  </div>`;
}

//.list-container
$('.board').on('click', '.add-card', function() {    
    $(this).siblings(".add-card-form-wrapper").removeClass("collapse");
});

$('.board').on('click', '.add-card-cancel', function() {    
    var wrapperDiv = $(this).parents(".add-card-form-wrapper");
    wrapperDiv.addClass("collapse");
});

$('.board').on('click', '.add-card-save', function() {   
    var wrapperDiv = $(this).parents(".add-card-form-wrapper");
    var input = wrapperDiv.find("input").val();
    // $(this).closest(".list-footer").before(newCard(input));
    $(this).closest(".list").find(".list-cards").append(newCard(input));
    wrapperDiv.addClass("collapse");
});


function newCard(title)
{
    return `<div class="card">
    <span class="card-more">
      <span class="glyphicon glyphicon-align-left"></span>
    </span>
    <div class="card-body">${title}</div>
    </div>`;
}

var cardBeingEdited = null;
$('.board').on('click', '.card', function() {  
   cardBeingEdited = this;
   console.log(this);

    var text = $(cardBeingEdited).find(".card-body").text();
    $("#card-edit-body").val(text);


   $("#card-edit").modal();
});

$('#card-edit').on('click', '.card-edit-save', function() {  
    $("#card-edit").modal('toggle');


    var new_text = $("#card-edit-body").val();
    $(cardBeingEdited).find(".card-body").text(new_text);
 });

$(".list-cards").sortable({
        connectWith: ".list-cards",
        items: ".card"        
    });
