"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACa95cabab629fd2563be26847cae0ecaf";
  this.authToken = "9da25ff1581798268b04765e9c8ddb1a";
  this.fromNumber = "+16502625965";

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
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return textStr.trim() !== "";
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    return (phoneStr.length === 11 && Number(phoneStr));
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();

    var phone = this.phoneInputField.val();
    var msg = this.messageInputField.val();
    if (!(this.validatePhoneField(phone) && this.validateMessageField(msg))) {
      throw "Invalid fields entered...";
    }

    $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
      success: function(x) {
        console.log('Message sent', x);
      },
      method: 'POST',
      data: {
        From: "+" + this.fromNumber,
        To: "+" + phone,
        Body: msg
      },
      headers: {
        "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
      },
      error: function(reason) {
        console.log("error", reason);
      }
    });

    this.displayMessage(phone, msg);

    //this.displayMessage('9999999999', 'Testing testing!');
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
