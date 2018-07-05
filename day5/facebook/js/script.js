//to do
//Make comments visible once we have submitted comment.
//Make the like button work
//periodically reload the file and check for updates.
//Improve UI

//register
$('#register-send').on('click', function(event){
    event.preventDefault();
    var firstname= $('#register-fname').val() ;
    var lastName =  $('#register-lname').val() ;
    var eMail =  $('#register-email').val();
    var pass =  $('#register-pass').val();

    console.log("sd");

    $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
        method: 'POST',
        success: function(response){
            if (response.success){
                console.log(response);
            }
            
        },
        data: 
        {
            fname: firstname,
            lname: lastName ,
            email: eMail ,
            password: pass
        },

        error: function(err){
            alert(err);
        }
        
    })
});


//login
$('#login-send').on('click', function(){
    event.preventDefault();
    var eMail = $('#login-email').val();
    var pass = $('#login-pass').val();

    $.ajax(
        {
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
        method: 'POST',
        success: function(data) {
          // data will be the response data that is
          // returned by the endpoint. use this to
          // access the token for future authorization.
      
          // data.response.token will give you access
          // to the AUTH_TOKEN
          
          if (data.success === true){
            console.log(data.response.token);
            localStorage.setItem('token', data.response.token);
            console.log("Successful login");
          }
        },
        data: {
          email: eMail,
          password: pass
        },
        error: function(err){
            console.log(err);
        }
      });
});


//post message
$('#new-post-btn').on('click', function(event){
    event.preventDefault();
    var tok = localStorage.getItem('token');
    var message = $('#new-post-msg').val();
    console.log(message);
    console.log(tok);

    console.log("Post method called");
    $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
        method: 'POST',
        data:{
            token: tok, 
            content: message
        },
        success: function(response){
            console.log('Successful post');
            $("#posts").append(createPost(response.response));
            //createPost(comments, content, createdAt, likes, poster, _id)

        },
        error: function(err){
            console.log(err);
            console.log("Post error");
        }
    })
});

//load posts
function parsePosts(data){
    var posts = [];
    //var post;
    for(var i = 0; i < data.length; i++){
        //post = data[i];
        posts[i] = createPost(data[i]);
            //post.comments, post.content, post.createdAt, post.likes, post.poster, post._id);
    }

    //console.log(posts);
    return posts.join(' ');
    
}

function createCommentsHtml(comments){
    var commentsHtml = [];
    if (comments.length){
        for(var i = 0; i < comments.length; i++){
            commentsHtml.push( `
                    <p>${comments[i].poster.name}<i>${comments[i].createdAt}</i></p>
                <p>${comments[i].content}</p>`) 
        }
        return commentsHtml.join('');
    }else{
        return "";
    }
    
    return html;
}

function createPost(post){
    //post.comments, post.content, post.createdAt, post.likes, post.poster, post._id);
    //var comments = post.comments content, createdAt, likes, poster, _id){

    var commentsHtml = "";
    var numComments = 0;
    var numLikes = 0;
    //var replyId = "reply-".append()
    if (post.likes !== null && post.likes.length > 0){
        numLikes = post.likes.length;
    }

    if (post.comments !== null && post.comments.length > 0){
        numComments = post.comments.length;
        commentsHtml = createCommentsHtml(post.comments);
    }
    var html = `
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <div class="card  mb-3" style="max-width: 18rem;">
            <div id=${post.poster.id} class="card-header bg-transparent border-success">
                <p><h4>${post.poster.name}</h4></p>
                <p><i>${post.createdAt}</i></p>
            </div>
            <div class="card-body text-success">          
                <p class="card-text">${post.content}</p>
            </div>

            <div class="card-footer bg-transparent border-success">
                <p>${numComments} Replies,${numLikes} likes</p>
                ${commentsHtml}
                <span style="font-size: 15px" class="glyphicon glyphicon-thumbs-up" ></span>
                <button class="btn btn-default" >Likes</button>
                <button class="btn btn-primary reply-btn" >Reply</button>
                <br />
                <div class="reply collapse" id="${post._id}">
                    <textarea class="form-control" rows="2"></textarea>
                    <br/>
                    <button  class="btn btn-default submit-Comment" >Submit</button>
                </div>               
            </div>
        </div>
    </div>`;
    //console.log(html);
    return html;
}

$(window).on('load', function(event){
    //console.log(localStorage.getItem('token') );
   
    $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1' ,
        method: 'GET',
        data: {
            token: localStorage.getItem('token')
        },
        success: function(response){
            //console.log(response.response);
            
            $("#posts").append(parsePosts(response.response)) ;
        },
        error: function(err){
            console.log(err);
        }
    });
    
});


//reply

$('#posts').on('click', '.reply-btn',function(event){
    $(this).siblings("div.reply").toggle();
    
});

$('#posts').on('click', '.submit-Comment', function(event){
    event.preventDefault();
    console.log('submit comment button clicked');

    console.log($(this).prev().prev().val());
    url = 
    postId = $(this).parent().attr('id');
    
    $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/'.concat($(this).parent().attr('id')) ,
        method: 'POST',
        data: {
            token: localStorage.getItem('token') ,
            content: $(this).prev().prev().val()
        },
        success: function(response){
            console.log(response);
            console.log("successful submit of commment");
        },
        error: function(err){
            console.log("Unsuccessful submit of a string");
            console.log(err);
        }
    });
});
