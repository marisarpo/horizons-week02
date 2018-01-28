"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC4084f5402fd2925abd41840486d76e69";
  this.authToken = "a3d0f2488dfba7668e11a0977ba62e3a";
  this.fromNumber = "+13347593380";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();
  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    $(this.messageSendButton).on("click", function(event) {
      this.handleMessageSend(event);
      return false;
    }.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return ($.trim(textStr).length !== 0);
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var trimPhone = $.trim(phoneStr);
    if (trimPhone.length === 11 && trimPhone.indexOf("-") === -1) {
      return true;
    } else {
      return false;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(evt) {
    evt.preventDefault();

    // only send if both fields are valid
    var toPhone = this.phoneInputField.val();
    var thisMessage = this.messageInputField.val();
    if (this.validatePhoneField(toPhone) && this.validateMessageField(thisMessage)) {
      // send the message
      this.sendMessage(toPhone, thisMessage);
      // clear the message field
      this.clearField(this.messageInputField);
    } else {
      throw "Invalid fields";
    }
  },

  clearField: function(jqField) {
    // YOUR CODE HERE
    jqField.val("");
  },

  displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  },
  sendMessage: function(toNumber, messageBody) {
		// It might be easier to access these variables like this
    var acctId = this.accountId;
    var authTok = this.authToken;
    var messageList = this.messageList;

		// Exercise 6.A `callback`
    // This callback should create a new Message object and generate a JQuery object using its render() method. It should append the gnerated JQuery object to the DOM messageList.
    var cb = function(data) {
			// YOUR CODE HERE
      messageList.append(new Message(toNumber, messageBody).render());
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
      url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + "/Messages",
			// Exercise 6.C `data`
			// Use the variables you have and actually send it to Twilio's services.
			//
			// note. see the Twilio docs (https://www.twilio.com/docs/api/rest/sending-messages) for more details about these fields you're sending.
      data : {
        "To" : "+" + toNumber,
        "From": "+" + this.fromNumber,
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

var Message = function(sender, body) {
  this.sender = sender;
  this.body = body;
  }
};

// [Helper] `render`
// This part actually does the work.
// It returns a jQuery object that encloses span and p tags that encapsulat the sender and body properties, respectively.
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


window.twilio = new TwilioApp();
