"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACd678b9f6593decded6c631a64b8911b4";
  this.authToken = "0cb444e786f9bcb73212db0ee49629c9";
  this.fromNumber = "(201)500-1779";

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
    var handle = this.handleMessageSend.bind(this);
    $(this.messageSendButton).on('click', function (event) {
      event.preventDefault();
      handle();
    });
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    $.trim(textStr);
    if (textStr === '') {
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if (phoneStr.length !== 11 || typeof(parseInt(phoneStr)) !== "number") {
      return false;
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    var message = this.messageInputField.val();
    var message_field = this.messageInputField.bind(this);
    var phone = this.phoneInputField.val();
    var display = this.displayMessage.bind(this);
    if (this.validateMessageField(message) && this.validatePhoneField(phone)) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
          success: function(x) {
            display(phone, message);
          },
          method: 'POST',
          data: {
            From: this.fromNumber,
            To: phone,
            Body: message
          },
          headers: {
            "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
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
