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
		alert("Need to tweet!");
		return;
	}
		//create the tweet
		//new date object for date input
		var x = new Date();
		var months =['Jan','Feb','Mar','Apr','May','Jun','Jul','Sep','Oct','Nov','Dec'];
		$('.list-container').prepend($('<div class = "center-block tweeted">\
		<img class = "icon" src = "https://img.buzzfeed.com/buzzfeed-static/static/imagebuzz\
		/terminal01/2010/1/26/14/bear-with-foot-long-tongue-14326-1264534270-16.jpg"\
		height="100" width="100">\
		<div class ="date">'+x.getDate()+" "+months[x.getMonth()]+'</div>\
		<div class = "user"><b>Taylor</b> @taylor_concannon</div>\
		<div class="msg">'+$('#text-input').val()+'</div>\
		<div class= "expand">Expand</div></div>'));
		
		//clear out the text field
		$('#text-input').val("");
})
