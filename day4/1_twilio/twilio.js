"use strict";

window.twilio = {};

// Preface. In this exercise, you're going to be building a Twilio Shoutout Application that communicates with Twilio's API (Application Programming Inerface) over AJAX. You can think of a Web API as an application black-box that you can leverage and interact with using HTTP. If you wanted to get weather data for your city, you could query some weather API and access the data that application generates.
// In this case, we're going to be using Twilio's device SMS messaging service. We're going to build an application that lets you `shoutout` (one-way message) a Twilio-enabled phone number programmatically. You'll be able to send yourself a text message from your browser (and much more)!
// You've been provided with a UI skeleton that you can dig into if you'd like, but the major focus of this exercise are the AJAX calls, validation, and of course OOP.

// Exercise 0. Get Twilio credentials
// Please navigate to https://www.twilio.com, and get a free API Key.
// You're going to be signing up for the service yourself, and it won't be asking you to pay for anything. Enter your name, phone number, and whatever else they ask you for (within reason - if they're asking for an ssn, call one of us over)
// You'll need 3 pieces of information to be able to interact with the Twilio API - your `accountId (or SID)`, an `auth token` and your Twilio phone number.
// Follow the steps listed by Twilio to get familiar with their API console and retrieve your first Twilio phone number!
// When you have all this information, please replace them in the variables down there.

twilio.accountId = "AC28e22cf56acca7099a6319e8074a8ff0";
twilio.authToken = "49a8c4c7491a62fe29ae318bb464720c";
twilio.fromNumber = "16024834803";

twilio.TwilioShoutout = function(accountId, authToken, fromNumber) {
  // Assign properties
  this.apiUrl = "https://api.twilio.com/2010-04-01/Accounts/";
  this.accountId = accountId;
  this.authToken = authToken;
  this.fromNumber = fromNumber;

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();

  // Notify user
  console.log("TwilioMessenger is ready.");
};

twilio.TwilioShoutout.prototype = {
  // Exercise 1. `initialize()` method
  // Implement the initialize method. The initialize method is called when the TwilioApp class is instantiated.
  // It should set up a click handler for `messageSendButton`, and fire `this.handleMessageSend` .
	//
  // hint. remember about context and maybe .bind()? you should, you'll run into some problems if you don't use the right context.
  initialize: function() {
    var self = this;
    this.messageSendButton.on('click', self.handleMessageSend.bind(self));
  },
  // Exercise 2. `clearField(jqField<JQuery Element>)` method
  // Write a function that takes a JQuery input fields and clears the text inside it. It should not return anything.
  //
	// hint. use $.trim(), see https://api.jquery.com/jQuery.trim/
  // hint. what does it mean to `clear` a field? Set it to an empty string.
  // hint. user .val() to get (and set) the value of an input object!
  clearField: function(jqField) {
    console.log(jqField);
    jqField.val('');
  },
  // Exercise 3. `validateMessageField(textStr<String>)` method
  // Write a function that validates the message input field. It should return true if the `validateMessageField` passes these conditions:
  // (1) The field should not be a blank string ("")
  // (2) The field should not be an 'empty' string ("           ")
  //
	// hint. $.trim() is useful
  validateMessageField: function(textStr) {
    if (textStr === "" || !$.trim(textStr)) {
      return false;
    }
    return true;
  },
  // Exercise 4. `validatePhoneField(phoneStr<String>)` method
  // Write a function that validates the message input field. It should return true if the `validatePhoneField` passes these conditions:
  // (1) The field should not have any non-numeric characters ('201-123-4321' is bad)
  // (2) The field should not be a blank string ("")
  // (3) The field should not be an 'empty' string ("           ")
  //
	// hint. use $.trim(), see https://api.jquery.com/jQuery.trim/
	// hint. remember to take care of both upper and lower case letters!
	// hint. .charAt might be useful, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
  validatePhoneField: function(phoneStr) {
    var phone = phoneStr;
    if (phoneStr === "" || !$.trim(phone, " ")) {
      return false;
    }
    if (isNaN(phoneStr)) {
      return false;
    }
    return true;
  },
	// Exercise 5. `handleMessageSend(evt<Event>)` method
	// Write a method that will check the validity of the phone and message fields, and if they're both valid, calls the Twilio API with our data so that it can send a text to your phone. If not, it should throw an error "Invalid fields";
	//
	// note. here's where `validatePhoneField` and `validateMessageField` come in handy!
	// note. also `clear`
	// note. also `sendMessage`
  handleMessageSend: function(evt) {
    //if (validatePhoneField(evt))
    if(this.validatePhoneField(this.phoneInputField.val()) && this.validateMessageField(this.messageInputField.val())) {
      this.sendMessage(this.phoneInputField.val(), this.messageInputField.val());
    }
    this.clearField(this.phoneInputField);
    this.clearField(this.messageInputField);
		evt.preventDefault();


    // only send if both fields are valid
    // YOUR CODE HERE
  },
  // Exercise 6. `sendMessage(toNumber<String>, messageBody<String>)` method
  // Write a function that POSTS to the Twilio Messages REST Api with a destination number `toNumber` and message `messageBody`.
  //
  // hint. see https://api.jquery.com/jquery.post/
  // hint. see https://www.twilio.com/docs/api/rest
  sendMessage: function(toNumber, messageBody) {
		// It might be easier to access these variables like this
    var acctId = this.accountId;
    var authTok = this.authToken;
    var messageList = this.messageList;

		// Exercise 6.A `callback`
    // This callback should create a new Message object and generate a JQuery object using its render() method. It should append the gnerated JQuery object to the DOM messageList.
    var cb = function(data) {
      var message = new Message(toNumber, messageBody);
      console.log(message.render());
      $('.message-list.outlined').append(message.render());
    };

		// `Call` the Twilio API service with our data
    $.ajax({
      method: "POST",
			// Exercise 6.B `url`
			// Write the url of the POST request you're going to be sending!
			// Please examine the API docs for sending messages with Twilio (https://www.twilio.com/docs/api/rest/sending-messages)
			//
			// hint. use string concatenation (addition)!
			// hint. the 'base' url is provided for you in this.apiUrl
			// hint. your account id is also accessible via this.accountId
      url: this.apiUrl + this.accountId + "/Messages",
      // this.accountId = accountId;
      // this.authToken = authToken;
      // this.fromNumber = fromNumber;

			// Exercise 6.C `data`
			// Use the variables you have and actually send it to Twilio's services.
			//
			// note. see the Twilio docs (https://www.twilio.com/docs/api/rest/sending-messages) for more details about these fields you're sending.
      data : {
        "To" : "+" + toNumber,
        "From": "+" + twilio.fromNumber,
        "Body": messageBody
      },
			success: cb,
      headers: {
        'Authorization': 'Basic ' + btoa(acctId + ':' + authTok)
      },
      error: function(xhr, textStatus, error) {
        console.log(xhr);
        console.log(xhr.responseText);
      }
    });
  }

};

// [Helper] `Message(sender<String>, body<String>)`
// This is a helper class that appends your sent message to the DOM.
var Message = function(sender, body) {
  this.sender = sender; // NOTE: THIS IS JUST THE NUMBER YOU ARE SENDING A TEXT TOO
  this.body = body;
};

// [Helper] `render`
// This part actually does the work.
// It returns a jQuery object that encloses span and p tags that encapsulate the sender and body properties, respectively.
Message.prototype = {
  render: function() {
    var listElem = $('<li></li>').addClass('message');
    var sender = $('<span></span>').addClass('sender').text(this.sender);
    var body = $('<p></p>').text(this.body);
    listElem.append(sender);
    listElem.append(body);

    return listElem;
  }
};

// Nice, you got to the end. Right now, the test is instantiating the app and allowing you to run it, but if you wanted to use it yourself (removing the tests) you can use it by
// var app = new twilio.TwilioShoutout(twilio.accountId, twilio.authToken, twilio.fromNumber)
// Just instantiating the app will set up the event handlers and make the UI interactive (as you should know, you built it haha)
