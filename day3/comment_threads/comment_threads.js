"use strict";
$(document).ready(function(){

$('.post').on('click',function(){
prompt('Enter your name: ');
prompt('Enter your comment: ');
$('<div class="comment">
  <div class="author">"AUTHOR NAME HERE" says:</div>
  <div class="message">COMMENT HERE</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>')
})




})
// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
