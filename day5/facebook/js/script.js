var userId = null;

$('#login-switch').on('click', function() {
	$('#registration-page').hide();
	$('#login-page').show();
})

$('#register-switch').on('click', function() {
	$('#login-page').hide();
	$('#registration-page').show();
})

$('#register-btn').on('click', function() {
	$.ajax({
		url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
		method: 'POST',
		data: {
			fname: $('#fname').val(),
			lname: $('#lname').val(),
			email: $('#email').val(),
			password: $('#password').val()
		},
		success: function() {
			alert('Your account is successfully registered!');
			$('#registration-page').hide();
			$('#login-page').show();
		},
		error: function(err) {
			alert(err.responseText)
		}
	})
})

$('#login-btn').on('click', function() {
	$.ajax({
		url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
		method: 'POST',
		data: {
			email: $('#email-login').val(),
			password: $('#password-login').val(),
		},
		success: function(resp) {
			localStorage.setItem('auth', resp.response.token)
			userId = resp.response.id;
			alert('Successfully logged in!')
			$('#login-page').hide();
			$('#newsfeed').show();
			render();
		},
		error: function(err) {
			alert('Failed to login. Please try again!')
		}
	})
})

$('#newpost-btn').on('click', function() {
	$.ajax({
		url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
		method: 'POST',
		data: {
			token: localStorage.getItem('auth'),
			content: $('#newpost-content').val(),
		},
		success: function() {
			render();
		},
		error: function(err) {
			alert('Failed to post. Please try again!')
		}
	})
})

$('#list-posts').on('click', '.newcomment-btn', function() {
	$.ajax({
		url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + $(this).parents('.post').attr('postId'),
		method: 'POST',
		data: {
			token: localStorage.getItem('auth'),
			content: $(this).parent().siblings('textarea').val()
		},
		success: function() {
			render();
		},
		error: function(err) {
			alert('Failed to post new comment. Please try again!')
		}
	})
})

$('#list-posts').on('click', '.likes-btn', function() {
	$.ajax({
		url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + $(this).parents('.post').attr('postId'),
		data: {
			token: localStorage.getItem('auth')
		},
		success: function() {
			render();
		},
		error: function(err) {
			alert('Could not like the post!')
		}
	})
})

$('#logout-btn').on('click', function() {
	$.ajax({
		url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
		data: {
			token: localStorage.getItem('auth')
		},
		success: function() {
			alert('Successfully logged out!')
			$('#newsfeed').hide();
			$('#login-page').show();
			localStorage.removeItem('auth');
		},
		error: function() {
			alert('ERROR! Please try again.')
		}
	})
})

function render() {
	$('#list-posts').empty();
	$.ajax({
		url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
		data: {
			token: localStorage.getItem('auth')
		},
		success: function(resp) {
			//console.log(resp);
			renderPosts(resp.response)
		},
		error: function(err) {
			console.log(err)
		}
	})
}

$('#list-posts').on('click', '.comments-btn', function() {
	$(this).closest('.post').find('.write-comment').toggle();
})


function renderPosts(postsArr) {

	postsArr.forEach(function(post) {
		var x = `
		<div class="post" postId="${post._id}">

          <div class="post-header">

            <div class="post-owner" posterId="${post.poster.id}">${post.poster.name}</div>

            <div class="post-time">${new Date(post.createdAt)}</div>

          </div>

          <div class="post-content">${post.content}</div>

          <div class="post-stat">

            <div class="comments-count">
            	<button class="comments-btn btn btn-default">${post.comments.length} comments</button>
            </div>

            <div class="likes-count">
            	<button class="likes-btn btn btn-default">${post.likes.length} 
            	<span class="glyphicon glyphicon-thumbs-up"></span></button>
            </div>

          </div>
          <div class="list-comments" posterId="${post.poster.id}">`;

          x += renderComments(post.comments);

          x += `</div>

          <div class="write-comment collapse">

	          <div class="divider"></div>

	          <div class="newcomment-section">

	              <textarea class="newcomment-content form-control" type="text" rows="2" placeholder="You got something to say?"></textarea>
	              <div class="comment-btn-div">
	                <button class="newcomment-btn btn btn-info">COMMENT</button>
	              </div>

	          </div>

	      </div>

        </div>`;

		$('#list-posts').append(x);

	})
}

function renderComments(commentsArr) {

	var result = ''

	commentsArr.forEach(function(comment) {
		result += `<div class="comment">

              <div class="comment-owner" posterId="${comment.poster.id}">${comment.poster.name}</div>

              <div class="comment-time">${new Date(comment.createdAt)}</div>

              <div class="comment-content">${comment.content}</div>

            </div>`;
	})

	return result

}

setInterval(render, 60000);
