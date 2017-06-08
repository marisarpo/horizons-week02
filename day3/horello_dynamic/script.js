"use strict";
$(document).ready(function(){
 $('.add-list').on('click', function(){
    $('.add-list-form-wrapper').removeClass('collapse')
});   
$('.add-list-cancel').on('click', function(){
    $('.add-list-form-wrapper').addClass('collapse')
});    
 $('.board').on('click', '.add-list-save', function(){
    var listName = $(this).parent().find('input').val();
    var inputString = '<div class="list-container"><div class="list"><div class="list-header"><span class="list-title">' + listName + '</span></div><div class="list-cards"></div><div class="list-footer"> <button class="add-card">Add a card...</button><div class="collapse add-card-form-wrapper"><div class="well add-card-form"> <input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default add-card-save">Save</button><button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove"></span></button></div></div></div></div></div>';
     
     $(this).closest('.add-list-form-wrapper').before(inputString)    
 })
    
 $('.board').on('click','.add-card',function(){
     $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
 })  
 
 $('.board').on('click','.add-card-cancel',function(){
     $(this).closest('.add-card-form-wrapper').addClass('collapse');
 })
 
 $('.board').on('click','.add-card-save',function(){
     var name = $(this).siblings("input").val()
     var large = '<div class="card"><span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span><div class="card-body">'+name+'</div></div>'
     $(this).closest('.list-footer').siblings('.list-cards').append(large);
     
     $(this).closest('.add-card-form-wrapper').addClass('collapse');
 })
 var cardBeingEdited = null;
    $('.board').on('click', '.card', function(){
        cardBeingEdited = $(this);
        var startCardText = $(this).find('.card-body').text();
        $('#card-edit-body').val(startCardText);
        
     $('#card-edit').modal()   
    })
    
    $('.card-edit-save').on('click', function(){
        var input = $('#card-edit-body').val();
        cardBeingEdited.find('.card-body').text(input);
        
        
    $('#card-edit').modal('hide')  
    })
    
    $('.board').on('click','.card',function() {
    $(".list-cards").sortable({
      connectWith: ".list-cards"});
    });
 
})



