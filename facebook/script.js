/** start login script */

var registerComplete = false; //register completed?
var isRegistering = false; //self-explanatory, are we registering?
var loggedIn = false; //is logged in?
var authenticationToken;
var responseData;


/**
moreOptions - a toggle button to display a register menu.
this function does just what it says above, it handles the click and displays the glorious menu =P
*/

$(document).ready(function() {
  if (localStorage.getItem("token") !== null) {
    retrievePosts();
  }
});

$("#moreOptions").on("click", function(event) {
  isRegistering = true; //set us to register mode
  $("#header").html("<h1><b>Horizok</b> Register</h1>") //set header to register
  $("#submitButton").text("Next"); //set submit text to "next"
  $(this).text("×"); //set secondary button text to ×
  $(this).on("click", function(event) {
    location.reload();
  }); //if ... pressed again, go back to start (aka refresh)
  return false; //stop it from submitting the form
});

$("#submitButton").on("click", function(event) {

  if (registerComplete) { //on completion of registering (we're on the last page aka)
    $.ajax({ //send an AJAX request to the server with our >> register <<information
      type: "POST",
      method: "POST",
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
      data: {
        fname: $("#firstName").val(),
        lname: $("#lastName").val(),
        email: $("#email").val(),
        password: $("#password").val()
      },
      success: function(data) { //all is well!!!
        $("#status").text("Registered."); //yay
        localStorage.setItem('token', data.response.token) //set auth token
        location.reload();
      },
      error: function(xhr, ajaxOptions, thrownError) { //handle errors here and put them in the status bar
        if (xhr.status == 401) { //unauthorized
          $("#status").text("Couldn't register");
        } else if (xhr.status == 400) { //bad request
          $("#status").text(xhr.responseJSON.error); //set status to what the server says the error is
        } else if (xhr.status == 500) { //overload error
          $("#status").text("Internal server error");
        } else {
          $("#status").text("Error: " + xhr.status);
        }
      }
    });
  } else if (!isRegistering) { //we're not registering, just a normal login submission.
    $.ajax({ //send an AJAX request to the server with our login information
      type: "POST",
      method: "POST",
      url: "http://horizons-facebook.herokuapp.com/api/1.0/users/login/",
      data: {
        email: $("#email").val(),
        password: $("#password").val()
      },
      success: function(data) {
        // data will be the response data that is
        // returned by the endpoint. use this to
        // access the token for future authorization.

        // data.response.token will give you access
        // to the AUTH_TOKEN
        //document.body.style.setProperty('--scale-size', "1.0"); //zoom everything out to 1.0 size
        console.log(data);
        localStorage.setItem("token", data.response.token); //set auth token
        localStorage.setItem("iden", data.response.id); //set id
        retrievePosts(); //next phase....
      },
      error: function(xhr, ajaxOptions, thrownError) {
        if (xhr.status == 401) { //unauthorized
          $("#status").text(xhr.responseJSON.error);
        } else if (xhr.status == 0) {
          $("#status").text("You are offline.");
          $("#loginForm").fadeTo("slow", 0.1);
          displayErrorModal("You're offline. Please check your internet connection.", 99);
        } else {
          $("#status").text("Error: " + xhr.status);
        }
      }
    });
  } else { //we're currently registering, but we're not done. advance the page.
    $("#emailPassword").css("display", "none"); //remove email password form
    $("#firstLastName").css("display", "block"); //add in first last name
    $(this).text("Finish"); //set text to finish now that we're on the last page
    registerComplete = true;
  }

  return false; //stop from submittings
});

/** end login script, start retrieveposts script */

/***
this function below gets posts n stuff.
error codes
1 - not logged in
2 - unable to retrieve retrieve posts
*/

/*
<p>
  <b>Name</b>
  <br>
  <i>Time</i>
  <h5>Greetings from another world! I am your overlord. This is a test. ABCBIEWUfhiwfaiejtoijgoirejwfoigerhfwefejrhifgdjsi</h5>
  <div class="w3-display-bottomright">
    <button class="w3-button">Reply</button>
    <button class="w3-button"><i class="fa fa-thumbs-up"></i></button>
  </div>
</p>
*/

var retrievePosts = function() {
  $("#status").text("Logged in"); //They're logged in hoorah
  $("#loginForm").fadeOut("slow"); //fade everything out, slowly
  loggedIn = true; //logged in =)
  $("#mainContentView").css("display", "block"); //main content view, open up!
  if (loggedIn) {
    $("#signInOutIcon").attr("class", "fa fa-sign-out"); //change sign in icon to sign out
    $.ajax({ //send an AJAX request to the server with our >> register <<information
      type: "GET",
      method: "GET",
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/1",
      data: {
        token: localStorage.getItem('token')
      },
      success: function(data) { //all is well!!!
        console.log("a", localStorage.getItem("iden"));
        _.each(data.response, function(item) { //for each message, we add a space for it and stuffs
          var found = false; //have we found one we liked?
          _.each(item.likes, function(likeObj) {
            if (likeObj["id"] == localStorage.getItem("iden")) {
              $("#content").append(`

                <div class="w3-display-container w3-container w3-light-grey w3-animate-opacity">
                  <p>
                    <b>${item.poster.name}</b>
                    <br>
                    <i>${item.createdAt}</i>
                    <h5>${item.content}</h5>
                  </p>
                    <div class="w3-display-bottomright">
                      <button class="w3-button replyButton">Reply</button>
                      <button class="w3-button w3-green likeButton" data-id="${item._id}"> <i class="fa fa-thumbs-up"></i> ${item.likes.length}</button>
                    </div>
               </div>

                `);
                found = true;
            }
          });
          if(!found) { //nope, we didn't like this one!
            $("#content").append(`

                        <div class="w3-display-container w3-container w3-light-grey w3-animate-opacity">
                          <p>
                            <b>${item.poster.name}</b>
                            <br>
                            <i>${item.createdAt}</i>
                            <h5>${item.content}</h5>
                          </p>
                            <div class="w3-display-bottomright">
                              <button class="w3-button replyButton">Reply</button>
                              <button class="w3-button likeButton" data-id="${item._id}"> <i class="fa fa-thumbs-up"></i> ${item.likes.length}</button>
                            </div>
                       </div>

            `);
          }
        });
      },
      error: function(xhr, ajaxOptions, thrownError) { //handle errors here
        displayErrorModal(xhr.responseJSON.error, xhr.status); //something happened and it is not good!!! display error
      }
    });
  } else {
    displayErrorModal("You're not logged in.", 1); //they're not logged in, yet they're here? errrrorrrrr.
  }
}
/* displays an error window, msg - message to display, errCode - error code to display */
var displayErrorModal = function(msg, errCode) {
  $("body").append(`

    <div class="w3-modal-content w3-animate-opacity w3-display-middle shadow modal">
      <header class="w3-container w3-red">
          <span onclick="$(this).parent().parent().remove();"
          class="w3-button w3-display-topright">&times;</span>
          <h2>Uh oh...</h2>
      </header>

      <div class="w3-container w3-white">
          <p>Something's gone wrong. =(</p>
          <p>${msg}</p>
      </div>

      <footer class="w3-container w3-red">
        <p>Error ${errCode}</p>
      </footer>

    </div>

    `);
}

var displayInputModal = function(msg, replyToWhom, time) {
  $("body").append(`

    <div class="w3-modal-content w3-animate-opacity w3-display-middle shadow modal">
      <header class="w3-container w3-teal">
          <span onclick="$(this).parent().parent().remove();"
          class="w3-button w3-display-topright">&times;</span>
          <h2>Reply</h2>
      </header>

      <div class="w3-container w3-white">
          <p><i>${replyToWhom} at ${time}</i></p>
          <p>${msg}</p>
          <input class="w3-input w3-border-0" id="#replyInput" placeholder="Enter reply here"></input>
      </div>

      <footer class="w3-container w3-teal">
        <p>Horizok</p>
      </footer>

    </div>

    `);
}

var displayModal = function(title, msg) {
  $("body").append(`

    <div class="w3-modal-content w3-animate-opacity w3-display-middle shadow modal">
      <header class="w3-container w3-orange">
          <span onclick="$(this).parent().parent().remove();"
          class="w3-button w3-display-topright">&times;</span>
          <h2>${title}</h2>
      </header>

      <div class="w3-container w3-white">
          <p>${msg}</p>
      </div>

      <footer class="w3-container w3-orange">
        <p>Horizok</p>
      </footer>

    </div>

    `);
}

/** jquery stuff */

//when we press exit
$("#exitBtn").on("click", function(event) {
  $("body").fadeOut("fast"); //fade out,
  localStorage.removeItem("token"); //remove the auth token
  localStorage.removeItem("iden"); //remove the id
  location.reload(); //reload page
});

$("#helpBtn").on("click", function(event) {
  displayModal("Help", "Horizok, one of many clients to the horizons-facebook heroku app, was brought to you by these authors:\n");
);
})

//when we click reply
$("body").on("click", ".replyButton", function(event) {
  console.log("k");
  displayInputModal("Message", "Someone", "0500 hours");
});

//when the like button is clicked
$("body").on("click", ".likeButton", function(event) {
  var _this = $(this);
  var id = $(this).data("id"); //get the message id we clicked on
  $.ajax({ //send an AJAX request to the server with our information to like the post
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${id}`,
    data: {
      token: localStorage.getItem("token")
    },
    success: function(data) { //all is well!!!
      _this.addClass("w3-green"); //green 'like' button =)
      location.reload();
    },
    error: function(xhr, ajaxOptions, thrownError) { //handle errors here
      displayErrorModal(xhr.responseJSON.error, xhr.status); //something happened and it is not good!!! display error
      console.dir(xhr); //print the error
    }
  });

});
