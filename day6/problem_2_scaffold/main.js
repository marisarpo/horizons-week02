var board = $('<div><div class= "board"><div id="boardAnchor"</div></div>')
var wrapper = $('<div><div class = "container list-container"></div></div>');

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
		//create the tweet
		$('.list-container').prepend($('<div class = "center-block tweeted"><span class = "icon">\
		<img src = "https://img.buzzfeed.com/buzzfeed-static/static/imagebuzz\
		/terminal01/2010/1/26/14/bear-with-foot-long-tongue-14326-1264534270-16.jpg"\
		height="100" width="100"></span><span class="msg">'+$('#text-input').val()+'</div>'))
		
		//clear out the text field
		$.trim($('#text-input').val("")
			console.log(Date(dateStr))
})
