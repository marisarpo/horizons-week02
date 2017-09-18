"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC823923bff9a8d5319df1f4fefad5000d';
  this.authToken = 'd4d4d3c522b31919b7181eb030a068d9';
  this.fromNumber = '+12722003731';

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
    this.messageSendButton.click(this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return $.trim(textStr) !== '';
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    return phoneStr.length === 11 && !!Number(phoneStr);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();
    var message = this.messageInputField.val();
    var num = this.phoneInputField.val();
    if (this.validateMessageField(message) && this.validatePhoneField(num)) {
      $.ajax({
        url: `https://api.twilio.com/2010-04-01/Accounts/${this.accountId}/SMS/Messages`,
        success: function(response) {
          this.displayMessage(num, message);
          this.messageInputField.val('');
        }.bind(this),
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: num,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error: function(e) {
          console.log(e);
        }
      });
    } else {
      alert('Invalid number or message');
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
