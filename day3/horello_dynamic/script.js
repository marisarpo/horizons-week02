"use strict";

$(document).ready(function() {

  //Show Add List Form
  $(".add-list").on("click", function() {
    $(this).siblings(".add-list-form-wrapper").removeClass("collapse");
  });

  //Close Add List Form
  $(".add-list-cancel").on("click", function() {
    $(this).parent().parent().addClass("collapse");
  });

  //Save Add List Form
  $(".add-list-save").on("click", function() {
    var title = $(this).siblings("input").val();

    var node = $(`<div class="list-container">
                  <div class="list">
                    <div class="list-header">
                      <span class="list-title">`+ title +`</span>
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
    $(".add-list-container").parent().before(node);
    $(this).parent().parent().addClass("collapse");
  });


  //Show Add Card Form
  $(".board").on("click", ".list-container .list .list-footer .add-card",function() {
    $(this).siblings(".add-card-form-wrapper").removeClass("collapse");
  });


 //Close Add Card Form
  $(".board").on("click", ".list-container .list .list-footer .add-card-cancel",function() {
    $(this).parent().parent().addClass("collapse");
  });

  //Save Card
  $(".board").on("click", ".list-container .list .list-footer .add-card-save",function() {
    var title = $(this).siblings("input").val();
    var node = $(`<div class="card">
                    <span class="card-more">
                      <span class="glyphicon glyphicon-align-left"></span>
                    </span>
                    <div class="card-body">`+title+`</div>
                  </div>`);

    $(this).parent().parent().addClass("collapse");
    var listFooter = $(this).parent().parent().parent().siblings(".list-cards").append(node);
  });

  //Edit Card
  $(".board").on("click", ".card", function() {
    var cardBody = $(this).children(".card-body");
    var modalText = $("#card-edit").find("textarea");
    modalText.val(cardBody.text());
    $(".card-edit-save").on("click", function() {
      cardBody.text(modalText.val());
      $("#card-edit").modal('hide');
      $(this).off("click");
    })
    $("#card-edit").modal('toggle');

  })
  

});