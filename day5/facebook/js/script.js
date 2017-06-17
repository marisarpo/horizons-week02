$(document).ready(function (){
	$('.login-container').hide();
	$('#posts').hide();
	$('.post-container').hide();




	$('#reg-button').on('click', function(event){
		event.preventDefault();
		$('#posts').show();
		$('.post-container').show();

		$.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
			method: 'POST',
			success: function(data) {


		// data will be the response data that is
		// returned by the endpoint. use this to
		// access the token for future authorization.
		// data.response.token will give you access
		// to the AUTH_TOKEN
	},

	data: {
		fname: $('.Firstname').val(),
		lname: $('.Lastname').val(),
		email: $('.Username').val(),
		password: $('.Password').val()
	}
});
	})


	$('.login-button').on('click', function(event){
		event.preventDefault();
		$('.container').hide();
		$('.login-container').show();
		$.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
			method: 'POST',
			success: function(data) {
				localStorage.setItem('token', data.response.token);
				$('#posts').show();
				$('.login-container').hide();
				$('.post-container').show();

				setInterval(renderPosts,4000);



	},
	data: {
		email: $('.Username2').val(),
		password: $('.Password2').val()
	}
});
	})
	var renderPosts= function(){
		$('#posts').empty();
		for(var i=1;i<6;i++){



			$.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/'+i, {
				method: 'GET',
				success: function(dataPosts) {
					console.log(dataPosts);
					var responses=dataPosts.response;
					responses.forEach(function(resp){
						var post=$(`<div class="[ col-xs-12 col-sm-12 ]">
							<div class="[ panel panel-default ] panel-google-plus">
							<div class="dropdown">
							<span class="dropdown-toggle" type="button" data-toggle="dropdown">
							<span class="[ glyphicon glyphicon-chevron-down ]"></span>
							</span>
							<ul class="dropdown-menu" role="menu">
							<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
							<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
							<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
							<li role="presentation" class="divider"></li>
							<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
							</ul>
							</div>
							<div class="panel-google-plus-tags">
							<ul>
							<li>#Millennials</li>
							<li>#Generation</li>
							</ul>
							</div>
							<div class="panel-heading">
							<img class="[ img-circle pull-left ]" src="images/logo.png" alt="Mouse0270" height=40px width=40px />
							<h3>${resp.poster.name}</h3>
							<h5><span>Jun 07, 2017</span> </h5>
							</div>
							<div class="panel-body">
							<p>${resp.content}</p>
							</div>
							<div class="panel-footer">
							<button type="button" class="[ btn btn-default ]">${resp.likes}likes</button>
							<button type="button" class="[ btn btn-default ]">
							<span class="[ glyphicon glyphicon-share-alt ]"></span>
							</button>
							<div class="input-placeholder">Add a comment...</div>
							</div>
							<div class="panel-google-plus-comment">
							<img class="img-circle" src="https://lh3.googleusercontent.com/uFp_tsTJboUY7kue5XAsGA=s46" alt="User Image" />
							<div class="panel-google-plus-textarea">
							<textarea rows="4"></textarea>
							<button type="submit" class="[ btn btn-success disabled ]">Post comment</button>
							<button type="reset" class="[ btn btn-default ]">Cancel</button>
							</div>
							<div class="clearfix"></div>
							</div>
							</div>
							</div>`)

						$('#posts').append(post);
					})
				},
				data: {
					token:localStorage.getItem('token')
				}
			});

		}



	}


	$('#postbutton').on('click', function(event) {
		event.preventDefault();
		// $('#posts').before($(`<div class="[ col-xs-12 col-sm-12 ]">
		// 	<div class="[ panel panel-default ] panel-google-plus">
		// 	<div class="dropdown">
		// 	<span class="dropdown-toggle" type="button" data-toggle="dropdown">
		// 	<span class="[ glyphicon glyphicon-chevron-down ]"></span>
		// 	</span>
		// 	<ul class="dropdown-menu" role="menu">
		// 	<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
		// 	<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
		// 	<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
		// 	<li role="presentation" class="divider"></li>
		// 	<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
		// 	</ul>
		// 	</div>
		// 	<div class="panel-google-plus-tags">
		// 	<ul>
		// 	<li>#Millennials</li>
		// 	<li>#Generation</li>
		// 	</ul>
		// 	</div>
		// 	<div class="panel-heading">
		// 	<img class="[ img-circle pull-left ]" src="images/logo.png" alt="Mouse0270" height=40px width=40px />
		// 	<h3>Anonymous</h3>
		// 	<h5><span>Jun 07, 2017</span> </h5>
		// 	</div>
		// 	<div class="panel-body">
		// 	<p>hello</p>
		// 	</div>
		// 	<div class="panel-footer">
		// 	<button type="button" class="[ btn btn-default ]">22 Likes</button>
		// 	<button type="button" class="[ btn btn-default ]">
		// 	<span class="[ glyphicon glyphicon-share-alt ]"></span>
		// 	</button>
		// 	<div class="input-placeholder">Add a comment...</div>
		// 	</div>
		// 	<div class="panel-google-plus-comment">
		// 	<img class="img-circle" src="https://lh3.googleusercontent.com/uFp_tsTJboUY7kue5XAsGA=s46" alt="User Image" />
		// 	<div class="panel-google-plus-textarea">
		// 	<textarea rows="4"></textarea>
		// 	<button type="submit" class="[ btn btn-success disabled ]">Post comment</button>
		// 	<button type="reset" class="[ btn btn-default ]">Cancel</button>
		// 	</div>
		// 	<div class="clearfix"></div>
		// 	</div>
		// 	</div>
		// 	</div>`));
		console.log($('#posttext').val());


		$.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
			method: 'POST',
			success: function(data) {
				console.log(data);
		},

		data: {
			token:localStorage.getItem('token'),
			content:$('#posttext').val(),
		}
});




	})




})


$('#logout').on('click', function(){
	// $('.login-container').hide();
	$('#posts').hide();
	$('.post-container').hide();
	$('.login-container').show();


})

// $(function () {
//    $('.panel-google-plus > .panel-footer > .input-placeholder, .panel-google-plus > .panel-google-plus-comment > .panel-google-plus-textarea > button[type="reset"]').on('click', function(event) {
//         var $panel = $(this).closest('.panel-google-plus');
//             $comment = $panel.find('.panel-google-plus-comment');

//         $comment.find('.btn:first-child').addClass('disabled');
//         $comment.find('textarea').val('');

//         $panel.toggleClass('panel-google-plus-show-comment');

//         if ($panel.hasClass('panel-google-plus-show-comment')) {
//             $comment.find('textarea').focus();
//
//    });
//    $('.panel-google-plus-comment > .panel-google-plus-textarea > textarea').on('keyup', function(event) {
//         var $comment = $(this).closest('.panel-google-plus-comment');

//         $comment.find('button[type="submit"]').addClass('disabled');
//         if ($(this).val().length >= 1) {
//             $comment.find('button[type="submit"]').removeClass('disabled');
//         }
//    });
// });
