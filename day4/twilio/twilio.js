"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC52fa3f557ded02ed6ca17b1651885280";
  this.authToken = "765e08e13452091078aa5a4ad93901a6";
  this.fromNumber = "+19292654281";

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if (textStr !== "" && textStr !== " ") {
      return true;
    }
    else {
      return false;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if (isNaN(phoneStr) === false && phoneStr.length === 11) {
      return true;
    } else {
      return false;
    }

  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();

    var firstL = this.messageInputField.val();
    var secondL = this.phoneInputField.val();

    var validateMessage = this.validateMessageField(firstL);
    var validateNumber = this.validatePhoneField(secondL);

    if (validateMessage && validateNumber) {
        var self = this;
        $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
   success: function(resp) {
      self.displayMessage(firstL, secondL);
   },
   method: 'POST',
   data: {
     From: this.fromNumber,
     To: '+19179324569',
     Body: 'Congratulations your Twillio account is working!'
   },
   headers: {
     "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
   },
   error: function (err) {
     alert("Error");
   }
 });
    };
},
    displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  }
};

window.twilio = new TwilioApp();
