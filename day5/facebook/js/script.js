$(document).ready(function() {
  $('.posts').hide();
  $('.signup').click(function(){
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    {
      method: 'POST',
      data: {
        fname:$('.createaccount .fname').val(),
        lname:$('.createaccount .lname').val(),
        email:$('.createaccount #newus').val(),
        password:$('.createaccount #newps').val()
      },
      success: function(res) {
        console.log(res);
        $('#us').val($('.createaccount #newus').val());
      },
      error: function(err) {
        console.log(err);
      }

    });
  });

  var posterName;
  var signinBool=false;

  $('.signin').click(function(){
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    {
      method:'POST',
      data: {
        email:$('#us').val(),
        password:$('#ps').val()
      },
      success :function (res) {
        localStorage.setItem('id',res.response.id);
        localStorage.setItem('token',res.response.token);
        // put posterName here
        $('.logincontent').hide();
        showNews();
        signinBool=true;
      }
    });
  });

  if (signinBool===true){
    setInterval(showNews,30000);}

    var longArrObj;
    function showNews() {
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page',
      {
        method:'GET',
        data: {
          token: localStorage.getItem('token'),
        },
        success: function(res){
          longArrObj=res.response;
          getpost(longArrObj);
        }
      })

    };

    function getpost(arr) {
      $('.feed').empty();
      for(var i=0;i<arr.length;i++) {
        var postID = arr[i]._id;
        var post = arr[i];
        var numComments = post.comments.length;
        var numLikes = post.likes.length;
        var comments='';
        var postDate = new Date(post.createdAt);
        post.comments.forEach(function(comment) {
          var commentDate=new Date(comment.createdAt);
          comments=comments+`<div>
           <span class="space">Author: ${comment.poster.name}:</span>
           ${comment.content}<span class="space" style='font-weight:bold'>Posted at:${commentDate}</span></div>`;
        });
        var newcode = `
        <div id="${postID}" class=post>
        <div class=content>
        <h3>${post.poster.name}</h3>
        <p>${postDate}</p>
        <p>${post.content}</p>
        </div>
        <button  class="like">Like</button>
        <div class=replies>
        <div>${numComments} Replies, <span class="whoLike">${numLikes} Likes </span></div>
        ${comments}
        <input id="mycom"></input><button class="reply">Reply</button>
        </div>
        </div>`;
        $('.feed').append(newcode);
      }
      // var newPostCode = `<div class="newPost">
      // <textarea name="name" id='newPostContent' rows="8" cols="80" placeholder="What's on your mind?"></textarea>
      // <button type="button" id='newPostbtn' name="button">Post</button>
      // </div>`;
      // $('.feed').append(newPostCode);
      $('.posts').show();
    }

     var longArrObj2;
    $('body').on('mouseover','.whoLike',function() {
      var postId = $(this).closest('.post').attr('id');
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page',
      {
        method:'GET',
        data: {
          token: localStorage.getItem('token'),
        },
        success: function(res){
          longArrObj2=res.response;
        }
      });
      var destination;
      _.find(longArrObj2,function(obj){
        if(obj._id===postId){
          destination= obj;
        }
      });
      var likeNames='';
      for (var i=0;i<destination.likes.length;i++){
        likeNames=likeNames+destination.likes[i].name+',  ';
      }

        $(this).append(`<span class='remove'>${likeNames}</span>`);
    });

  $('body').on('mouseout','.whoLike',function() {
   $(this).children().empty();
});

    $('.posts').on('click','#newPostbtn',function(event){
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts',
      {
        method:'POST',
        data:{
          token:localStorage.getItem('token'),
          content:$('#newPostContent').val()
        },
        success: function(res){
          showNews();
          $('textarea').val('');
        }
      })
    });

    $('.feed').on('click','.like',function(){
      var postId= $(this).parent().attr('id');
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/'+postId,
      {
        method:'GET',
        data:{
          token:localStorage.getItem('token')
        },
        success:function(){
          showNews();
        }
      }
    )
  });

    $('.feed').on('click','.reply',function(){
    var postId= $(this).parent().parent().attr('id');
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/'+postId,
    {
      method:'POST',
      data:{
        token:localStorage.getItem('token'),
        content:$(this).siblings('input').val(),
      },
      success:function(){
        showNews();
      }
    }
  )
});

$('.posts').on('click','.logout',function(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
  {
    method:'GET',
    data:{
      token:localStorage.getItem('token')
    },
    success:function(){
      $('.posts').hide();
      $('.logincontent').show();
      signinBool=false;
      $('#us').val('');
      $('#ps').val('');
    }
  });
});

$('.posts').on('click','.chat',function(){
  var socket = io.connect('https://horizons-facebook.herokuapp.com/');
  socket.emit('authentication', {'token': localStorage.getItem('token') });
  socket.on('authenticated', function (data) {
    console.log(data);});
  socket.emit('message','testing');
  socket.on('message',function(data){
    console.log(data);
  })

  });
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

});
