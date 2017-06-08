"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.comments').on('click', '.hide-replies', function(){
	// debugger;
	$(this).parent().siblings('.replies').hide();

})
$('.comment').on('click', '.show-replies', function(){
	$(this).parent().siblings('.replies').show();
})


$('.comments').on('click', '.post', function(){
	var mytext = (prompt('enter your text'));
	if(mytext == '') {
		alert('please enter text for your comment');
	}
	else{
		$(this).siblings('.comments').append(`
          	<div class="message comment"> 
          		<div class="author"> "Anon" says: </div>` 
          		+ mytext + 
          		`<div class="controls">
          			<button class="hide-replies btn btn-default"> Hide Replies </button>
          			<button class="show-replies btn btn-default"> Show Replies </button>
          			<button class="reply btn btn-default"> Reply </button>
          		</div>
        	</div>`
        );
	}
})

$('.comments').on('click', '.reply', function() {
	var myReply = (prompt('enter your reply'));
	if(myReply == '') {
		alert('please enter text for your reply');
	}
	else{
		$(this).parent().siblings('.replies').append(`
			<div class="comment message">
          		<div class="author"> "Anon" says: </div>` 
          		+ myReply + 
          		`<div class="controls">
          			<button class="hide-replies btn btn-default"> Hide Replies </button>
          			<button class="show-replies btn btn-default"> Show Replies </button>
          			<button class="reply btn btn-default"> Reply </button>
          			</div>
          			<div class="replies">
          		</div>
        	</div>`
        )
	}
})	

