link1.addEventListener("click",function(event){
  alert("?");
  event.preventDefault();
});

$('#link2').click(function (event) {
  alert("??");
  return false;
});

$('.somelink').click(function (event) {
  alert("???");
  return false;
});

mint.addEventListener("click",function(event){
  document.getElementById("yellow").style.display= "none";
});

/*
thumbs.addEventListener("click", function(event){
document.getElementById("bigImg").setAttribute('src', '');
  event.preventDefault();
});
*/
$('#thumbs a').click(function(event) {
  $('#bigImg').attr('src', this.href);
  // Return false needed here to prevent the browser from navigating away!
  return false;
});
// */
img2.addEventListener("click", function(event){

document.getElementById("bigImg").setAttribute('src',"http://javascript.info/files/tutorial/browser/events/gallery/img2-lg.jpg");
  event.preventDefault();
});

img3.addEventListener("click", function(event){

document.getElementById("bigImg").setAttribute('src',"http://javascript.info/files/tutorial/browser/events/gallery/img3-lg.jpg");
  event.preventDefault();
});

img4.addEventListener("click", function(event){

document.getElementById("bigImg").setAttribute('src',"http://javascript.info/files/tutorial/browser/events/gallery/img4-lg.jpg");
  event.preventDefault();
});

img5.addEventListener("click", function(event){

document.getElementById("bigImg").setAttribute('src',"http://javascript.info/files/tutorial/browser/events/gallery/img5-lg.jpg");
  event.preventDefault();
});

img6.addEventListener("click", function(event){

document.getElementById("bigImg").setAttribute('src',"http://javascript.info/files/tutorial/browser/events/gallery/img6-lg.jpg");
  event.preventDefault();
});
