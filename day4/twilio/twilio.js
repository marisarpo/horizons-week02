"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC74ffb0d65f72155bdf8295f394dd4364";
  this.authToken = "7bd1bf9c7a038401420780e694d1e903";
  this.fromNumber = "(831) 278-8679";

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
    // YOUR CODE HERE
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    var trimmedText = $.trim(textStr)
    if (trimmedText !== '') {
      return true;
    } else {
      return false;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if (!isNaN(Number(phoneStr)) && phoneStr.length === 11) {
      return true;
    } else {
      return false;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    var toNumber = this.phoneInputField.val()
    var message = this.messageInputField.val()
    // console.log(this.phoneInputField[0].value);
    event.preventDefault();
    if (this.validateMessageField(message) && this.validatePhoneField(toNumber)) {
      console.log('valid');
      $.ajax({
        url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',
        success: function(x) {
          this.displayMessage(toNumber,message);
          this.messageInputField.val('')
        }.bind(this),
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: toNumber,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error: function() {
          alert('Failure');
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
