"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function (){
  //add list gen
  $(".add-list").on("click", function(){
    $('.add-list-form-wrapper').removeClass('collapse');
  });

  //add list cancel
  $(".add-list-cancel").on("click", function(){
    $(".add-list-form-wrapper").addClass("collapse");
  });

  //add list save
  $(".add-list-save").on("click", function(){
    var inp = $(".add-list-form-wrapper input").val();
    var str = `<div class="list-container">
      <div class="list">
        <div class="list-header">
          <span class="list-title">` + inp + `</span>
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
    $(this).closest('.list-container').before($(str));
    $('.add-list-form-wrapper').addClass('collapse');
  });

  //add card
  $(".board").on("click", ".add-card", function (){
    var wrap = $(this).siblings(".add-card-form-wrapper");
    wrap.removeClass('collapse');
  });

  //add card cancel
  $(".board").on("click", ".add-card-cancel", function(){
    var wrap = $(this).closest(".add-card-form-wrapper");
    wrap.addClass('collapse');
  });

  //add card save
  $(".board").on("click", ".add-card-save", function(){
    var wrap = $(this).siblings("input");
    var inp = wrap.val();
    console.log(inp);
    var str = `<div class="card">
      <span class="card-more">
        <span class="glyphicon glyphicon-align-left"></span>
      </span>
      <div class="card-body">` + inp + `</div>
    </div>`;
    $(this).closest(".list").find(".list-cards").append($(str));
  });

  var cardBeingEdited = null;

  $(".board").on("click", ".card", function (){
    cardBeingEdited = this;
    var m = $("#card-edit");
    m.modal();
    var body = $(this).find(".card-body").text();
    //console.log(body);
    m.("#card-edit-body").val(body);


  });





});
