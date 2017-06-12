"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC87e6f69202fe8ff2d2d3d92e90aef2dc";
  this.authToken = "7d00a8281cc0adf41071c376b22c76db";
  this.fromNumber = "+19193715536";

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this)); //what the fuck does this do?
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    var trimmed = $.trim(textStr);
    if (trimmed.length === 0) {
      return false;
    } else {
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    console.log(phoneStr.toString()
      .length);
    console.log(!isNaN(parseInt(phoneStr)));
    return !isNaN(parseInt(phoneStr)) && phoneStr.toString()
      .length === 11
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    // YOUR CODE HERE
    var self = this;
    var messageSent = this.messageInputField.val();
    var phoneNumber = this.phoneInputField.val();

    if (this.validateMessageField(messageSent) && this.validatePhoneField(phoneNumber)) {
      console.log('validated');
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function() {
          self.displayMessage(phoneNumber, messageSent);
          self.messageInputField.val('');

        },
        error: function(err) {
          console.log('Error, something went wrong');
          alert('Somthing went wrong');
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: parseInt(phoneNumber),
          Body: messageSent
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });

    };

    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');
  },
  displayMessage: function(sender, message) {
    var listElem = $('<li></li>')
      .addClass('message');
    var senderElem = $('<span></span>')
      .addClass('sender')
      .text(sender);
    var bodyElem = $('<p></p>')
      .text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  }
};

window.twilio = new TwilioApp();
