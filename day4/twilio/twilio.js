"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACac8482c42c02849484507f081df9fe39";
  this.authToken = "b674163550ef49e673499a5f45b2c4f1";
  this.fromNumber = "+12037936405";

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
    this.messageSendButton.on('click', (function(event) {
      this.handleMessageSend(event);
      }).bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return textStr !== "" && textStr.replace(/\s/g, '') !== "";
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    return parseInt(phoneStr).toString().length === 11;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var message = this.messageInputField.val();
    var sender = this.phoneInputField.val();
    //console.log('called');
    if (this.validateMessageField(message) && this.validatePhoneField(sender)) {
      var newThis = this;
      //console.log("valid message and phone number");
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + newThis.accountId + '/SMS/Messages', {
        success: function(x) {
          console.log('Message sent');
          newThis.displayMessage(sender, message);
        },
        error: function(reason) {
          //console.log(reason);
          alert("Error!");
        },
        method: 'POST',
        data: {
          From: newThis.fromNumber,
          To: sender,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(newThis.accountId + ":" + newThis.authToken)
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
