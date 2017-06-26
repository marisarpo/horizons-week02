//click registration in registration
$(document).ready();
  $('#registerButton').on('click', function(event){
    event.preventDefault();
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
      success: function(resp) {
        console.log('true');
        $('#registrationWrapper').hide();
        $('#loginWrapper').toggle();
      },
      method: 'POST',
      data: {
        fname: $('#fname').val(),
        lname: $('#lname').val(),
        email: $('#email').val(),
        password: $('#password').val(),
      },

      error: function(err){
        console.log('Error', err);
      }
    });
  });

  //click login in registration
  $('#loginButton').on('click', function(event){
    event.preventDefault();
    $('#registrationWrapper').toggle();
    $('#loginWrapper').toggle();

  });

  //click registration in Login
  $('#registerButton2').on('click', function(event){
    event.preventDefault();
    $('#registrationWrapper').toggle();
    $('#loginWrapper').toggle();
  });


  //click login in login
  $('#loginButton2').on('click', function(event){
    event.preventDefault();
    $('#loginWrapper').toggle();
    $('#postspageWrapper').toggle();
    //var refresh = function() {
      $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
      method: 'POST',
      success: function(data) {
        localStorage.setItem('token', data.response.token);
        // $('#loginWrapper').toggle();
        // $('#postspageWrapper').toggle();

        //if succeed, get posts
        var refresh = function() {
          $('.refreshWrapper').remove();
          console.log('refreshed');
          $.ajax({
          url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
          data: {
            token: localStorage.getItem('token')
          },
          success: function(postData) {
            console.log('in');
            for (var i=0; i<postData.response.length; i++){
              var postName=postData.response[i]['poster']['name'];
              var postContent=postData.response[i]['content'];
              var postId=postData.response[i]['_id'];
              var postTime=postData.response[i]['createdAt'];
              var comments = postData.response[i]['comments'];
              var commentNum = comments.length;
              var likes = postData.response[i]['likes'];
              var likesNum = likes.length;

              var postHtml = $(`<div class='refreshWrapper'>
                  <div class='originalPost'>
                  <div class='name'>${postName}</div>
                  <div class='time'>${postTime}</div>
                  <div class='content'>${postContent}</div>
                </div>

                <div class='repliesBigWrapper'>
                <div class='replySummary'>${commentNum} Replies, ${likesNum} Likes</div>
                <div class='getId' id=${postId}></div>


                <div class='commentBoxWrapper'>
                    <input class='commentbox' type='text' placeholder='Write some comments?'></input>
                    <button id='commentButton' value='Comment'>Comment</button>
                  </div>


                <button class='btn btn-default likeButton'>
                  <span class='glyphicon glyphicon-heart'></span> Like
                </button>
                <button class='btn btn-default replyButton'>Reply</button>
              </div>`)

              $('#placeholder').append(postHtml);
              for (var j=0; j<comments.length; j++){
                var replyName = comments[j].poster.name;
                var newDate= new Date(comments[j].createdAt);
                var replyTime = newDate.getFullYear()+'-'+newDate.getMonth()+'-'+newDate.getDate()+" "
                                +newDate.getHours()+":"+newDate.getMinutes();
                var replyContent = comments[j].content;
                var replyHtml = $(`<div class='replies' ><div class='replyName'>${replyName}</div>
                  <div class='replyTime'>${replyTime}</div>
                  <div class='comments'>${replyContent}</div></div>
                  `);
                  $('#'+postId).append(replyHtml);
                }
            }
          },
          error: function(err){
            console.log(err);
          },
        });
      }
      refresh();
      setInterval(refresh, 10000);
      },
      error: function(err){
        console.log("Cannot login")
        console.log(err);
      },
      data: {
        email: $('#email2').val(),
        password: $('#password2').val()
      }
    });
  });

  $('#postButton').on('click', function(event){
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
      method: 'POST',
      data: {
        token: localStorage.getItem('token'),
        content: $('#postbox').val()
      },
      success: function(postData){
        console.log('success!');
        var postName=postData.response['poster']['name'];
        var postContent=postData.response['content'];
        var postTime=postData.response['createdAt'];
        var comments = postData.response['comments'].toString();
        var commentNum = comments.length;
        var likes = postData.response['likes'];
        var likesNum = likes.length;

        var postHtml = $(`<div class='originalPost'>
            <div class='name'>${postName}</div>
            <div class='time'>${postTime}</div>
            <div class='content'>${postContent}</div>
          </div>

          <div class='replies'>
            <div class='replySummary'>${commentNum} Replies, ${likesNum} Likes</div>
            <div class='getId' id=${postId}></div>
            <div class='comments'>${comments}</div>

            <div class='commentBoxWrapper'>
                <input class='commentbox' type='text' placeholder='Write some comments?'></input>
                <button id='commentButton' value='Comment'>Comment</button>
              </div>


            <button class='btn btn-default likeButton'>
              <span class='glyphicon glyphicon-heart'></span> Like
            </button>
            <button class='btn btn-default replyButton'>Reply</button>
          </div>
        </div>`);

        $('#placeholder').before(postHtml);
      },
      error: function(err){
        console.log('Cannot Post!');
      }
    })
  });

  //toggle comment box
  $('body').on('click', '.replyButton', function(event){
    var postId = $(this).siblings('.replySummary').attr('id');
    var commentbox = $(this).siblings('.commentBoxWrapper');
    commentbox.toggle();
  });

  //post comment
  $('body').on('click', '#commentButton', function(event){
    var postId = $(this).parents().siblings('.getId').attr('id');
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/'+postId,
      method: 'POST',
      data: {
        token: localStorage.getItem('token'),
        content: $('.commentbox').val()
      },
      success: function(postData){
        var commentsIndex = postData.response.comments.length-1;
        console.log('comments index: '+commentsIndex);
        var replyName = postData.response.comments[commentsIndex].poster.name;
        var newDate= new Date(postData.response.comments[commentsIndex]['createdAt']);
        var replyTime = newDate.getFullYear()+'-'+newDate.getMonth()+'-'+newDate.getDate()+" "
                        +newDate.getHours()+":"+newDate.getMinutes();
        var replyContent = postData.response.comments[commentsIndex]['content'];
        var replyHtml = $(`<div class='replies' ><div class='replyName'>${replyName}</div>
          <div class='replyTime'>${replyTime}</div>
          <div class='comments'>${replyContent}</div></div>
          `);
        $('#'+postId).append(replyHtml);

        // update Reply Summary
        var replySum = $('#'+postId).siblings('.replySummary').text();
        var rIndex = replySum.indexOf('R');
        var newReplyNum = parseInt(replySum.substring(0, rIndex-1))+1;

        var lIndex = replySum.indexOf('L');
        var cIndex = replySum.indexOf(',');
        var likesNum = replySum.substring(cIndex+2, lIndex-1);
        $('#'+postId).siblings('.replySummary').html(`<div class='replySummary'>${newReplyNum} Replies, ${likesNum} Likes</div>`);
      }
    })
  });


  //get likes
  $('body').on('click', '.likeButton', function(event){
    var postId = $(this).siblings('.getId').attr('id');
    console.log(postId);
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/'+postId,
      method: 'GET',
      data: {
        token: localStorage.getItem('token')
      },
      success: function(postData){
        //update Reply Summary
        var replySum = $('#'+postId).siblings('.replySummary').text();
        var likesNum = postData.response.likes.length;

        var rIndex = replySum.indexOf('R');
        var newReplyNum = parseInt(replySum.substring(0, rIndex-1));
        $('#'+postId).siblings('.replySummary').html(`<div class='replySummary'>${newReplyNum} Replies, ${likesNum} Likes</div>`);

      },

      error: function(err){
        console.log('Cannot Like!')
      }
    })
  });


  $('#logoutButton').on('click', function(event){
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
      data: {
        token: localStorage.getItem('token')
      },
      success: function(event){
        console.log("logout!");
        $('#loginWrapper').toggle();
        $('#postspageWrapper').toggle();
      },
      error: function(err){
        console.log('cannnot logout');
      }
    })
  });
