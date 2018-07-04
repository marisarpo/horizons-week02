
/** start login script */

var registerComplete = false; //register completed?
var isRegistering = false; //self-explanatory, are we registering?
var loggedIn = false; //is logged in?
var authenticationToken;


/**
moreOptions - a toggle button to display a register menu.
this function does just what it says above, it handles the click and displays the glorious menu =P
*/

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

  if(registerComplete) { //on completion of registering (we're on the last page aka)
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
      $("#status").text("Registered. Please refresh to login."); //yay
      localStorage.setItem('token', data.response.token) //set auth token
    }, error: function(xhr, ajaxOptions, thrownError) { //handle errors here and put them in the status bar
      if(xhr.status == 401) { //unauthorized
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
  } else if(!isRegistering) { //we're not registering, just a normal login submission.
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
        $("#status").text("Logged in"); //They're logged in hoorah
        $("#loginForm").fadeOut( "slow" ); //fade everything out, slowly
        loggedIn = true; //logged in =)
        authenticationToken = data.response.token; //set auth token
        retrievePosts();
      }, error: function(xhr, ajaxOptions, thrownError) {
        if(xhr.status == 401) { //unauthorized
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

var retrievePosts = function() {
  $("#mainContentView").css("display", "block");
  if(loggedIn) {
    $("#signInOutIcon").attr("class","fa fa-sign-out"); //change sign in icon to sign out
    $.ajax({ //send an AJAX request to the server with our >> register <<information
      type: "POST",
      method: "POST",
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/1",
      data: {
        fname: $("#firstName").val(),
        lname: $("#lastName").val(),
        email: $("#email").val(),
        password: $("#password").val()
      },
      success: function(data) { //all is well!!!
        $("#status").text("Registered. Please refresh to login."); //yay
        localStorage.setItem('token', data.response.token) //set auth token
      }, error: function(xhr, ajaxOptions, thrownError) { //handle errors here and put them in the status bar
        if(xhr.status == 401) { //unauthorized
          $("#status").text("Couldn't register");
        } else if (xhr.status == 400) { //bad request
          $("#status").text(xhr.responseJSON.error); //set status to what the server says the error is
        } else if (xhr.status == 500) { //overload error
          $("#status").text("Internal server error");
        } else if (xhr.status == 0) {
          $("#status").text("You are offline."); //woops, they lost internet
          $("loginForm").fadeTo("slow", 0.75);
          displayErrorModal("You're offline. Please check your internet connection.", 99); //error 99: offline, display as dialog
        } else {
          $("#status").text("Error: " + xhr.status);
        }
      }
    });
  } else {
    displayErrorModal("You're not logged in.", 1); //they're not logged in, yet they're here? errrrorrrrr.
  }
}
/* displays an error window, msg - message to display, errCode - error code to display */
var displayErrorModal = function(msg, errCode) {
  $("body").append(`

    <div class="w3-modal-content w3-animate-opacity w3-display-middle shadow mouseMoveDiv">
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
