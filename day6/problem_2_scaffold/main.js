

$("#comment").on('click', function(){
  $(".collapse").collapse("toggle");
});

$("#submitBtn").on('click', function(){
  var text = $("#comment").val();
  $("#comment").val("");
  render(text);
});
var url = "http://static.independent.co.uk/s3fs-public/thumbnails/image/2015/12/27/16/vladimirputin.jpg";
var render = function(text){
  var wrapper = $('<div class: "result"> </div>');
  var card = $('<div class="card"><img src=' + url + ' class="img-thumbnail TextWrap" width="75" height="75"><b>' +"Vlad Putin  @VPutin"+ '</b><div><p class="xrow">' + text + '</p></div></card>');
  $(".history").prepend(card);
}
