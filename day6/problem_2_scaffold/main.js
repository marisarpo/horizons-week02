var wrapper = $('<div class = "container list-container"></div>');

//click the type bo to expand and open buttons/stats:
$('.form-control').click(function(e){
	if($('#text-input').hasClass("open")){
		$('#text-input').removeClass("open")
		return;
	}
	$('#text-input').addClass("open")
})

//push the submit form to create a new card 
$('.submit').click(function(e){
	if($.trim($('#text-input').val())===""){
		alert("Need to tweet!")
	}
	console.log('click')
	wrapper.append($('<div class = "container tweet-box"><span><p>'+$('#text-input').val()+'</p></span></div>'))
})





///rendering: 
//var wrapper = $('<div><div class = "container list-container"></div></div>');