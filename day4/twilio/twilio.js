"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACe1842fb50b6c71fa85bf46f47b3e8d5d";
  this.authToken = "50effb4ef356bb719a8963507a2bbcea";
  this.fromNumber = "+19842053638";

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
    this.messageSendButton.on("click", (function(event) {this.handleMessageSend(event)}).bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    /*
    It should not be a empty string (i.e., "").
    It should not be an 'blank' string containing only spaces (i.e., " ").
    */
    if (textStr.length === 0 || textStr.trim() === " ") {
      return false;
    }
    else { return true};
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if(typeof JSON.parse(phoneStr) === "number") {
      if(phoneStr.length === 11) {
        return true;
      }
    }
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST

    // this.displayMessage('9999999999', 'Testing testing!');
    var self = this;

    var message = this.messageInputField.val();
    var phoneNumber = this.phoneInputField.val();

    if (event.type === "click") {event.preventDefault();}
    console.log(this.validateMessageField(message));
    console.log(this.validatePhoneField(phoneNumber));


    if (this.validateMessageField(message) && this.validatePhoneField(phoneNumber)) {
      console.log("If statements worked");
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + self.accountId + '/SMS/Messages', {
        success: function(x) {
          console.log("it's good!");
          self.displayMessage(phoneNumber, message);
        },
        method: 'POST',
        data: {
          From: self.fromNumber,
          To: '+19199514806',
          Body: self.messageInputField.val(),
        },
        headers: {
          "Authorization": "Basic " + btoa(self.accountId + ":" + self.authToken)
        },
        error: function(err) {
          alert("Request didn't work");
        }
      });
    }

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
