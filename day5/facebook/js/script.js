"use strict"


function FacebookApp()
{

  /* App Credentials */
  this.userID = "";
  this.token = "";

  /* Reference JQuery Objects */

    /* Register Page */
    this.registrationPage = $(".registrationForm");
    this.registerFirstName = $("input[name='registerFirstName']");
    this.registerLastName = $("input[name='registerLastName']");
    this.registerEmail = $("input[name='registerEmail']");
    this.registerPassword =$("input[name='registerPassword']");
    this.registerButton = $(".registerButton");
    this.registerLoginButton = $(".registerLoginButton");

    /* Login Page */
    this.loginPage = $(".loginForm");
    this.loginEmail = $("input[name='loginEmail']");
    this.loginPassword = $("input[name='loginPassword']");
    this.loginButton = $(".loginButton");
    this.loginRegisterButton = $(".loginRegisterButton");
    this.registrationSuccessful = $(".successfulRegistration");
    this.loginFail = $(".loginFail");

    /* Wall Page */
    this.postsContainer = $(".postsContainer");
    this.newPostButton = $(".newPostButton");

  // Setup Event handlers
  this.initialize();

  /* Immediately After Loading */
  this.loginPage.hide();
  this.registrationSuccessful.hide();
  this.loginFail.hide();
  this.postsContainer.hide();

}

FacebookApp.prototype = {

  initialize: function()
  {
    this.registerButton.on("click", this.registerAccount.bind( this ));
    this.registerLoginButton.on("click", this.switchToLoginPage.bind( this ));
    this.loginButton.on("click", this.loginAccount.bind( this ));
    this.loginRegisterButton.on("click", this.switchToRegistrationPage.bind( this ));
    this.newPostButton.on("click", this.makeNewPost.bind( this ));
    this.postsContainer.on("click", ".replyButton", this.makeNewReply.bind( this ));
    this.postsContainer.on("click", ".likeButton", this.likePost.bind( this ));
  },

  /* Registration Page */
  switchToLoginPage: function(event)
  {
    if ( event )
    {
      event.preventDefault();
    }
    this.registrationPage.hide();
    this.loginPage.show();
  },

  switchToRegistrationPage: function(event)
  {
    event.preventDefault();
    this.loginPage.hide();
    this.registrationPage.show();
  },

  switchToWall: function()
  {
    this.loginPage.hide();
    this.postsContainer.show();
    this.getPosts( 1 );
    setInterval( function()
    {
      var scrollPos = $(window).scrollTop();
      $(".individualPostContainer").remove();
      this.getPosts(1);
      $(document).ajaxStop( function(){ $(window).scrollTop(scrollPos); } );
    }.bind( this ), 30000 );
  },

  registerAccount: function( event )
  {
    event.preventDefault();
    var ajaxObject =
    {
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
      type: "POST",
      data:
      {
        fname: this.registerFirstName.val(),
        lname: this.registerLastName.val(),
        email: this.registerEmail.val(),
        password: this.registerPassword.val()
      },
      success: function(response)
      {
        this.switchToLoginPage();
        this.registrationSuccessful.show();
      }.bind(this),
      error: function(error)
      {
        alert(JSON.parse(error.responseText).error);
      }
    };
    $.ajax( ajaxObject );
  },

  loginAccount: function( event )
  {
    event.preventDefault();
    var ajaxObject =
    {
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
      type: "POST",
      data:
      {
        email: this.loginEmail.val(),
        password: this.loginPassword.val()
      },
      success: function(response)
      {
        this.userID = response["response"]["id"];
        this.token = response["response"]["token"];
        this.switchToWall();
      }.bind(this),
      error: function(error)
      {
        if( JSON.parse(error.responseText).error === "Login failed.")
        {
          this.loginFail.show();
        }
      }.bind(this)
    };
    $.ajax( ajaxObject );
  },

  getPosts: function( pageNum )
  {
    var ajaxObject =
    {
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/" + pageNum,
      type: "GET",
      data:
      {
        token: this.token
      },
      success: function(response)
      {
        response.response.forEach( function( postObj ){
          this.addPost( postObj );
        }, this);
        /* Too many posts
        if (response.response.length !== 0)
        {
          this.getPosts( pageNum + 1 );
        }
        */
      }.bind(this),
      error: function(error)
      {
        alert(JSON.parse(error.responseText).error);
      }
    };
    $.ajax( ajaxObject );
  },

  addPost: function( postObj )
  {
    var postTemplate =
    `<div class="col-md-12 individualPostContainer">
      <div class="post" id="${postObj._id}">
        <div class="postAuthor">${postObj.poster.name}</div>
        <div class="postMetaData">${ new Date(postObj.createdAt).toUTCString()}</div>
        <div class="postMessage"><p>${postObj.content}</p></div>
        <div class="repliesAndLikes">
          ${postObj.comments.length} Replies, ${postObj.likes.length} Likes
          <button type="button" class="btn btn-primary likeButton">Like <span class="glyphicon glyphicon-thumbs-up"></span></button>
        </div>`
    if (postObj.comments.length > 0)
    {
      postObj.comments.forEach( function(comment){
        postTemplate +=
        `<div class="postReply">
          <div class="postReplyAuthor">${comment.poster.name}: ${new Date(comment.createdAt).toUTCString()}</div>
          <div class="postReplyMessage">${comment.content}</div>
         </div>`;
      });
    }
    postTemplate +=
    `   <input type="text" class="form-control postMakeReply" placeholder="Enter Reply">
        <button type="button" class="btn btn-default replyButton">Reply <span class="glyphicon glyphicon-comment"></span></button>
      </div>
    </div>`;
    $(".makePost").before(postTemplate);
  },

  makeNewPost: function( event )
  {
    event.preventDefault();
    var scrollPos = $(window).scrollTop();
    var ajaxObject =
    {
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
      type: "POST",
      data:
      {
        token: this.token,
        content: $(".makePost textarea").val()
      },
      success: function(response)
      {
        $(".individualPostContainer").remove();
        this.getPosts( 1 );
      }.bind(this),
      error: function(error)
      {
        alert(JSON.parse(error.responseText).error);
      }
    };
    $.ajax( ajaxObject );
    $(document).ajaxStop( function(){ $(window).scrollTop(scrollPos); } );
  },

  makeNewReply: function( event )
  {
    event.preventDefault();
    var scrollPos = $(window).scrollTop();
    var ajaxObject =
    {
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/" + event.target.closest(".post").id,
      type: "POST",
      data:
      {
        token: this.token,
        content: $(event.target).siblings(".postMakeReply").val()
      },
      success: function(response)
      {
        $(".individualPostContainer").remove();
        this.getPosts( 1 );
      }.bind(this),
      error: function(error)
      {
        alert(JSON.parse(error.responseText).error);
      }
    };
    $.ajax( ajaxObject );
    $(document).ajaxStop( function(){ $(window).scrollTop(scrollPos); } );
  },

  likePost: function( event )
  {
    event.preventDefault();
    var scrollPos = $(window).scrollTop();
    var ajaxObject =
    {
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/" + event.target.closest(".post").id,
      type: "GET",
      data:
      {
        token: this.token
      },
      success: function(response)
      {
        $(".individualPostContainer").remove();
        this.getPosts( 1 );
      }.bind(this),
      error: function(error)
      {
        alert(JSON.parse(error.responseText).error);
      }
    };
    $.ajax( ajaxObject );
    $(document).ajaxStop( function(){ $(window).scrollTop(scrollPos); } );
  }

}

window.facebook = new FacebookApp();
