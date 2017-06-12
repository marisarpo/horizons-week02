$(document).ready(function() {
	setEventListeners();
})
var i = 0;
function setEventListeners() {
	$('.login').show();
	$('.register').hide();
	$('.main').hide();
	setLoginBtn();
	setRegBtn();
	postPosts();
	postComments();
	getLikes();
	morePosts();
}

function morePosts() {
	$('.more').on('click', function(event) {
		event.preventDefault();
		console.log('more posts here')
	})
}

function getLikes() {
	$('.posts').on('click', '.like-btn', function(event) {
		var post_id = $(this).closest('.thread').attr('id');
		event.preventDefault();
		$.ajax({
			url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + post_id,
			method: 'GET',
			data: {
				token: localStorage.getItem('token')
			},
			success: function(response) {
				getPosts();
				console.log('+1');
			}
		})
	})
}

function postComments() {
	$('.posts').on('click', '.add-reply', function(event){
		event.preventDefault();
		$(this).parent().siblings('.reply-wrapper').removeClass('collapse');
	})
	$('.posts').on('click', '.post-reply', function(event){
		event.preventDefault();
		var post_id = $(this).closest('.thread').attr('id');
		$(this).parent().parent().addClass('collapse');
		$.ajax({
			url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + post_id,
			method: 'POST',
			data: {
				token: localStorage.getItem('token'),
				content: $(this).siblings('.reply-text').val()
			},
			success: function(response) {
				getPosts();
			},
			error: function(err) {
				console.log(err);
			}
		})
	})
}

function setLoginBtn() {
	$('#login-btn').on('click', function() {
		$('.well').hide();
		var username = $('#username').val();
		var password = $('#password').val();
		//console.log(username, password);
		$.ajax({
			url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
			method: 'POST',
			data: {
				email: username,
				password: password
			},
			success: function(data) {
				localStorage.setItem('token', data.response.token);
				getPosts();
				$('.main').show();
				var interval = setInterval(function() {
					getPosts();
				}, 1000)
			},
			error: function(err) {
				alert('You have not registered');
			}
		})
	})

	$('#login-btn-go').on('click', function() {
		$(this).closest('.register').hide();
		$(this).closest('.register').siblings('.login').show();
	})
}

function postPosts() {
	$('#post-btn').on('click', function(event) {
		event.preventDefault();
		$.ajax({
			url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
			method: 'POST',
			data: {
				token: localStorage.getItem('token'),
				content: $('#status').val()
			},
			success: function(response) {
				getPosts();
			},
			error: function(err) {
				console.log(err);

			}
		})
	})
}

function setRegBtn() {
	$('#reg-btn-go').on('click', function() {
		$(this).closest('.login').hide();
		$(this).closest('.login').siblings('.register').show();
	})

	$('#reg-btn').on('click', function() {
		var firstName = $('#fname').val();
		var lastName = $('#lname').val();
		var username = $('#username-reg').val();
		var password = $('#password-reg').val();
		console.log(firstName, lastName, username, password);
		$.ajax({
			url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
			method: 'POST',
			data: {
				fname: firstName,
				lname: lastName,
				email: username,
				password: password
			},
			success: function(data) {
				$(this).closest('.login').hide();
				$(this).closest('.login').siblings('.register').show();
			},
			error: function(err) {
				console.log(err);
				alert('Failed registration');
			}
		})
	})
}

function getPosts() {
		$.ajax({
			url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
			method: 'GET',
			data: {
				token: localStorage.getItem('token')
			},
			success: function(data) {
				$('.posts').empty();
				data.response.forEach(function(post) {
					$('.posts').append(
			`<div class="thread" id="${post._id}">
          <div class="post">
            <h3 class="author">${post.poster.name}</h3>
            <div class="time">${post.createdAt}</div>
            <div class="post-body">${post.content}</div>
          </div> <!-- closes post -->
          <div class="replies"></div>
          <div class="footer">
            <h5 class="stats">${post.comments.length} replies, ${post.likes.length} likes</h5>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-info like-btn">
                Like <span class="glyphicon glyphicon-thumbs-up"></span>
              </button>
              <button type="button" class="btn btn-info add-reply">
              Reply <span class="glyphicon glyphicon-send"></span>
              </button>
            </div>

            <div class="collapse reply-wrapper">
              <div class="well reply-form">
                <input type="text" class="form-control reply-text"
                                   placeholder="Type a reply">
                <button type="button" class="btn btn-default post-reply">
                  Post a comment
                </button>
              </div>
            </div>
          </div> <!-- closes footer -->
        </div> <!-- closes thread -->`);
				})
				data.response.forEach(function(post) {
					post.comments.forEach(function(comment) {
						$(`#${post._id}`).find('.replies').append($(
			`<div class="reply">
        <div class="time">${comment.createdAt}</div>
        <div class="reply-body">${comment.poster.name}: ${comment.content}</div>
      </div>`));
					})
		var reps;
		
	})
			},
			error: function(err) {
				console.log(err);
				alert('Error');
			}
		})
}

function setPosts(posts) {
	posts.forEach(function(post) {
		var reps;
		$('.posts').append(
			`<div class="thread" id="${post._id}">
          <div class="post">
            <h3 class="author">${post.poster.name}</h3>
            <div class="time">${post.createdAt}</div>
            <div class="post-body">${post.content}</div>
          </div> <!-- closes post -->
          <div class="replies"></div>
          <div class="footer">
            <h5 class="stats">${post.comments.length} replies, ${post.likes.length} likes</h5>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-info">
                Like <span class="glyphicon glyphicon-thumbs-up"></span>
              </button>
              <button type="button" class="btn btn-info">
              Reply <span class="glyphicon glyphicon-send"></span>
              </button>
            </div>
          </div> <!-- closes footer -->
        </div> <!-- closes thread -->`);
	})
	posts.forEach(function(post) {
		console.log(post.poster.name, 'length: ' + post.comments.length)
		for (var i = 0; i < post.comments.length; i++) {
			//console.log(post.comments.length);
			$(`#${post._id}`).find('.replies').append($(
			`<div class="reply">
        <div class="time">${post.comments[i].createdAt}</div>
        <div class="reply-body">${post.comments[i].poster.name}: ${post.comments[i].content}</div>
      </div>`));
		}
	})
}
