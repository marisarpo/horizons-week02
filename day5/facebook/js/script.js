var userId = "";

$(document).ready(function() {

	fadeOut($('#signin-container'), 0.1);
	$('.post-holder').hide();

	$('#registration-submit-btn').on('click', function(event) {
		event.preventDefault();
		$.ajax(
		{
			url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
			data: {
				fname: $('#input-first-name').val(),
				lname: $('#input-last-name').val(),
				email: $('#input-email').val(),
				password: $('#input-password').val()
			},
			method: 'POST',
			success: function() {
				fadeOut($('#login-container'), 2);
				fadeIn($('#signin-container'), 2);
				return true;
			},
			error: function(err) {

				alert("Error occurred while signing up.");
			}
		});

	});

	$('#post-submit-btn').on('click', function(event) {
		event.preventDefault();
		$.ajax({
			url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
			method: 'POST',
			success: function(data) 
			{
				$('#post-textarea').val("");
				showPosts();
				return true;
			},
			error: function(err) 
			{
				alert("Error occurred while posting.");
			},
			data: 
			{
				token: localStorage.getItem('token'),
				content: $('#post-textarea').val()
			}
		});

	});

	$('#login-submit-btn').on('click', function(event) {
		event.preventDefault();
		$.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
			method: 'POST',
				success: function(data) {
					localStorage.setItem('token', data.response.token);
					localStorage.setItem('id', data.response.id);
					showPosts();
					return true;
				},
			data: {
				email: $('#input-login-email').val(),
				password: $('#input-login-password').val()
			}
		});

	});

	$('#login-open-btn').on('click', function() {

		fadeIn($('#login-container'), 2);
		fadeOut($('#signin-container'), 2);
		$('.post-holder').hide();

	});

	$('#signin-open-btn').on('click', function() {

		fadeOut($('#login-container'), 2);
		fadeIn($('#signin-container'), 2);
		$('.post-holder').hide();

	});

	if (localStorage.getItem('id') !== undefined) {
		showPosts();
		setInterval(showPosts, 60000);
	}

});

function putLikeListener() {
	$('.like-submit-btn').on('click', function(event) {
		event.preventDefault();
		var self = this;
		console.log(localStorage.getItem('token'));
		console.log($(this).parent().attr('id'));
		$.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + $(this).parent().attr('id') + '?token=' + localStorage.getItem('token'), {
			method: 'GET',
			success: function(data) {
				showPosts();
				setInterval(showPosts, 60000);
				return true;
			}
		});
	});

	$('.comment-post-btn').on('click', function(event) {
		event.preventDefault();
		$.ajax({
			url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + $(this).parent().parent().attr('id'),
			method: 'POST',
			success: function(data) 
			{
				$('#post-textarea').val("");
				showPosts();
				return true;
			},
			error: function(err) 
			{
				alert("Error occurred while posting.");
			},
			data: 
			{
				token: localStorage.getItem('token'),
				content: $(this).siblings('.comment-submit-input').val()
			}
		});
	});

	$('.comment-submit-btn').on('click', function(event) {
		if ($(this).text() === "View comments") {
			$(this).siblings('.comment-holder').show();
			$(this).text("Hide comments");
		} else {
			$(this).siblings('.comment-holder').hide();
			$(this).text("View comments");
		}
	});
}

function createComment(comment) {
	return `

		<div class="comment-div">
			<p class="pcomment">
				<span style="text-weight: bold">
					${comment.poster.name}
				</span>
				: ${comment.content}
			</p>
		</div>

	`;
}

function showPosts() {
	$('#login-container').hide();
	$('#signin-container').hide();
	$('.post-holder').show();
	$('.post-holder').empty();
	$('.post-holder').append(`
      <div class="submit-post">
          <div class="submit-post-div">
              <h4 class="post-name">
                Upload post
              </h4>

              <textarea style="margin-bottom: 10px" type="text" rows="4" class="form-control" id="post-textarea" placeholder="What's on your mind..."></textarea>

              <button id="post-submit-btn" type="submit" class="btn btn-warning">Post</button>
          </div>
        </div>`);
	$('#post-submit-btn').on('click', function(event) {
		event.preventDefault();
		$.ajax({
			url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
			method: 'POST',
			success: function(data) 
			{
				$('#post-textarea').val("");
				showPosts();
				return true;
			},
			error: function(err) 
			{
				alert("Error occurred while posting.");
			},
			data: 
			{
				token: localStorage.getItem('token'),
				content: $('#post-textarea').val()
			}
		});

	});
	$.ajax({

		url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/:page',
		data: {
			token: localStorage.getItem('token')
		},
		success: function(resp) {
			resp.response.forEach(function(post) {
				$('.post-holder').append(createPost(post));
			});
			putLikeListener();
			$('.comment-holder').hide();
		},
		error: function(err) {
			alert("Error showing posts.");
		}

	});
}

function createPost(post) {
	var wasLiked = false;
	var userId = localStorage.getItem('id');
	post.likes.forEach(function(like) {
		if (like.id === userId) {
			wasLiked = true;
		}
	});

	var text = wasLiked ? "Unlike" : "Like";

	var comments = "";
	post.comments.forEach(function(comment) {
		comments += createComment(comment);
	});

	return `<div class="post" id="${post._id}">
      <h4 class="post-name">
        ${post.poster.name}
      </h4>

      <p class="post-content">
        ${post.content}
      </p>
		
	  <p class="il">
		${post.likes.length} Likes
	  </p>

      <button type="submit" 
      class="btn btn-warning like-submit-btn">${text}<span class="glyphicon glyphicon-heart"></span></button>

      <p class="post-date">
        Posted on:&nbsp;${post.createdAt}
      </p>

      <button type="submit" 
      class="btn btn-warning comment-submit-btn">View comments</button>

      <div class="comment-holder">
      	<input type="text" style="margin-top: 10px; width: 60%; display: inline-block" class="comment-submit-input form-control" placeholder="Post a comment...">
      	 <button type="submit" style="width: 30%; display: inline-block"
      class="btn btn-default comment-post-btn">Post comment</button>
		${comments}
      </div>
    </div>`;
}

function fadeOut(element, duration) {
	/*
	element.css('animation-name', 'close-section');
	element.css('animation-duration', duration+'s');
	element.css('animation-fill-mode', 'forwards');*/
	element.hide();
}

function fadeIn(element, duration) {
	/*
	element.css('animation-name', 'open-section');
	element.css('animation-duration', duration+'s');
	element.css('animation-fill-mode', 'forwards');*/
	element.show();
}