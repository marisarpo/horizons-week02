$(document).ready(function() {
	var registered = false;
	$('.container').hide();
	// $('.main-page').hide();
	getPosts();

	$('.first').on('click', function() {
		event.preventDefault();
		this.email = $('#eMail').val();
		this.pass = $('#passWord').val();

		if (!registered) {
			this.fName = $('#firstName').val();
			this.lName = $('#lastName').val();
			registered = true;
			$.ajax({
				url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
				method: 'POST',
				data: {
					fname: this.fName,
					lname: this.lName,
					email: this.email,
					password: this.pass 
				},
				success: function() {
					$('.second').text("Go to registration");
					$('.first').text("Login");
					$('#title').text("Login");
					$('#firstName').hide();
					$('#lastName').hide();
					return true;
				},
				error: function(err) {
					console.log(err)
				}
			})
		}
		else {
			registered = false;
			$.ajax({
				url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
				method: 'POST',
				data: {
					email: this.email,
					password: this.pass 
				},
				success: function(data) {
					localStorage.setItem('token', data.response.token);
					$('.container').hide();
					$('.main-page').show();
					getPosts();
					return true;
				},
				error: function(err) {
					console.log(err)
				}
			})
		}
	})

	$('.second').on('click', function() {
		event.preventDefault();
		if (!registered) {
			registered = true;
			$('.second').text("Go to registration");
			$('.first').text("Login");
			$('#title').text("Login");
			$('#firstName').hide();
			$('#lastName').hide();
		}
		else {
			registered = false;
			$('.second').text("Login");
			$('.first').text("Register");
			$('#title').text("New User Registration");
			$('#firstName').show();
			$('#lastName').show();
		}
	})

	$('#postButton').on('click', function() {
		console.log('hi')
		this.content = $('#postText').val();
		console.log(this.content);
		$.ajax({
			url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
			method: 'POST',
			data: {
				token: localStorage.getItem('token'),
				content: this.content
			},
			success: function(data) {
				
			},
			error: function(err) {
				console.log(err)
			}
		})
	})

	function getPosts() {
		$.ajax({
			url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/:page",
			method: 'GET',
			data: {
				token: localStorage.getItem('token')
			},
			success: function(data) {
				parsePosts(data.response)
			},
			error: function(err) {
				console.log(err)
			}
		})
	}

	function parsePosts(posts) {
		posts.forEach(function(post) {
			var name = post.poster.name;
			var date = post.createdAt;
			var content = post.content;
			var newPost = $(`<div class="post col-xs-4">
					          <div class="name">${name}</div>
					          <div class="date">${date}</div>
					          <div class="text">${content}</div>
					          <hr></hr>
					          <button type="button" class="btn btn-primary">
					              <span class="glyphicon glyphicon-thumbs-up"</span>
					            </button>
					          <button type="button" class="btn btn-primary">
					              Reply
					            </button>
					        </div>`);
			$('.post-list').append(newPost)

		})
	}
})
